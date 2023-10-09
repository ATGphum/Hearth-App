import {
  CourseCategoryChoices,
  UserCourse,
  UserExperience,
} from "@prisma/client";
import { FastifyInstance, FastifyRequest } from "fastify";
import { userExperiencePostBodySchema } from "./courses-serializers.js";
import { ProgressCourse } from "./courses-types";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
//add options as an argument after fastify if necessary
export default async function CoursesController(fastify: FastifyInstance) {
  // get journey courses
  fastify.get("/courses/journeys", async (request: FastifyRequest) => {
    const sub: string = request["user"]["sub"];
    const user = await fastify.prisma.user.findUnique({
      where: { username: sub },
    });

    const completedCourses: Partial<UserCourse>[] =
      await fastify.prisma.userCourse.findMany({
        where: {
          user_id: user.id,
        },
        select: {
          course_id: true,
        },
      });

    const completedExperiences: Partial<UserExperience>[] =
      await fastify.prisma.userExperience.findMany({
        where: {
          user_id: user.id,
        },
        select: {
          experience_id: true,
        },
      });

    const completedCourseIds: number[] = completedCourses.map(
      (course) => course.course_id
    );

    const completedExperienceIds: number[] = completedExperiences.map(
      (experience) => experience.experience_id
    );

    const courses: ProgressCourse[] = await fastify.prisma.course.findMany({
      orderBy: { level: "asc" },
      where: { category: CourseCategoryChoices.journey },
      include: {
        experiences: { orderBy: { level: "asc" } },
      },
    });

    // logic to add an is_available flag to both courses and experiences to show if the previous course/experience has been completed or not
    // is_available set to true if previous course has been completed, else set to false
    const coursesMapped = courses.map((course) => ({
      ...course,
      is_available:
        !course.previous_course_id ||
        completedCourseIds.includes(course.previous_course_id),
      completed: completedCourseIds.includes(course.id),
      experiences: course.experiences.map((exp) => ({
        ...exp,
        is_available:
          !exp.previous_experience_id ||
          completedExperienceIds.includes(exp.previous_experience_id),
        completed: completedExperienceIds.includes(exp.id),
      })),
    }));

    return coursesMapped;
  });

  // get category courses
  fastify.get("/courses/categories", async () => {
    const courses: ProgressCourse[] = await fastify.prisma.course.findMany({
      orderBy: { name: "asc" },
      where: { category: CourseCategoryChoices.category },
      include: {
        experiences: { orderBy: { level: "asc" } },
      },
    });

    return courses;
  });

  // Create a userExperience entry for the provided user_id and experience_id
  // If the experience is the last experience in the course, also create a userCourse entry
  fastify.post(
    "/courses/experiences",
    {
      schema: {
        body: userExperiencePostBodySchema,
      },
    },
    async (
      request: FastifyRequest<{
        Querystring: { last_in_course?: string; parent_course_id?: string };
        Body: { user_id: number; experience_id: number };
      }>
    ) => {
      const body = request.body;
      request.getValidationFunction("body")(body);
      const today = new Date();
      const newObj: Partial<UserExperience> = {
        ...body,
        completion_date: today,
      };
      const newUserExperience = await fastify.prisma.userExperience.create({
        data: newObj,
      });
      // if experience is last in the course, create userCourse object
      const { last_in_course, parent_course_id } = request.query;
      if (last_in_course === "true" && parent_course_id) {
        const courseId = parseInt(parent_course_id);
        if (!isNaN(courseId)) {
          const newUCObj: Partial<UserCourse> = {
            user_id: body.user_id,
            course_id: courseId,
            completion_date: today,
          };
          await fastify.prisma.userCourse.create({
            data: newUCObj,
          });
        }
      }

      return newUserExperience;
    }
  );
}
