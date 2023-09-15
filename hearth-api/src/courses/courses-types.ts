import { Course, Experience } from "@prisma/client";

export interface ProgressCourse extends Course {
  is_available: boolean;
  experiences: ProgressExperience[];
}

export interface ProgressExperience extends Experience {
  is_available: boolean;
}
