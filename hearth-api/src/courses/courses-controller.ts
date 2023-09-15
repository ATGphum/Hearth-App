import {
  Course,
  CourseCategoryChoices,
  UserCourse,
  UserExperience,
} from "@prisma/client";
import { FastifyInstance, FastifyRequest } from "fastify";
import { ProgressCourse } from "./courses-types";
// import { courseResponseSchema } from "./courses-serializers.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
//add options as an argument after fastify if necessary
export default async function CoursesController(fastify: FastifyInstance) {
  // get journey courses
  fastify.get(
    "/courses/journeys",
    // {
    //   schema: {
    //     response: {
    //       200: courseResponseSchema,
    //     },
    //   },
    // },
    async (request: FastifyRequest) => {
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
        where: { category: CourseCategoryChoices.journey },
        include: {
          experiences: { orderBy: { level: "asc" } },
        },
      });

      // logic to add an is_available flag to both courses and experiences to show if the previous course/experience has been completed or not
      // is_available set to true if it has been completed, else set to false
      const coursesMapped = courses.map((course) => ({
        ...course,
        is_available:
          !course.previous_course_id ||
          completedCourseIds.includes(course.previous_course_id),
        experiences: course.experiences.map((exp) => ({
          ...exp,
          is_available:
            !exp.previous_experience_id ||
            completedExperienceIds.includes(exp.previous_experience_id),
        })),
      }));

      return coursesMapped;
    }
  );
}
