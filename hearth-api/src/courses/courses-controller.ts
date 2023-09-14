import { CourseCategoryChoices } from "@prisma/client";
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
      const courses = fastify.prisma.course.findMany({
        where: { category: CourseCategoryChoices.journey },
      });
      return courses;
    }
  );
}
