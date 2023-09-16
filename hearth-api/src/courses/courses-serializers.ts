export const userExperiencePostBodySchema = {
  type: "object",
  required: ["user_id", "experience_id"],
  properties: {
    user_id: {
      type: "number",
    },
    experience_id: {
      type: "number",
    },
  },
};

export const userExperiencePostQuerySchema = {
  type: "object",
  required: ["user_id", "experience_id"],
  properties: {
    user_id: {
      type: "number",
    },
    experience_id: {
      type: "number",
    },
  },
};
