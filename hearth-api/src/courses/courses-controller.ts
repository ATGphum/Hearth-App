import { Course, CourseCategoryChoices, UserCourse } from "@prisma/client";
import { FastifyInstance, FastifyRequest } from "fastify";
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

      const completedCourseIds: number[] = completedCourses.map(
        (course) => course.id
      );

      const courses: Course[] = await fastify.prisma.course.findMany({
        where: { category: CourseCategoryChoices.journey },
        include: {
          experiences: { orderBy: { level: "asc" } },
        },
      });

      const coursesMapped = courses.map((course) => ({
        ...course,
        is_available:
          !course.previous_course_id || completedCourseIds.includes(course.id),
      }));

      return coursesMapped;
    }
  );
}
