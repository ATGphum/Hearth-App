export const userResponseSchema = {
  type: "object",
  required: ["username"],
  properties: {
    id: {
      type: "number",
    },
    username: {
      type: "string",
    },
    email: {
      type: ["string", "null"],
    },
    first_name: {
      type: ["string", "null"],
    },
    last_name: {
      type: ["string", "null"],
    },
    partner_first_name: {
      type: ["string", "null"],
    },
    partner_last_name: {
      type: ["string", "null"],
    },
    email_reminders: {
      type: "boolean",
    },
    instagram_username: {
      type: ["string", "null"],
    },
    connection_time: {
      type: ["string", "null"],
    },
    date_joined: {
      type: "string",
    },
    stripe_subscription_id: {
      type: ["string", "null"],
    },
    stripe_customer_id: {
      type: ["string", "null"],
    },
    stripe_subscription_frequency: {
      type: ["string", "null"],
    },
    trial_completed: {
      type: "boolean",
    },
  },
};

export const userPatchSchema = {
  type: "object",
  properties: {
    email: {
      type: ["string", "null"],
    },
    first_name: {
      type: ["string", "null"],
    },
    last_name: {
      type: ["string", "null"],
    },
    partner_first_name: {
      type: ["string", "null"],
    },
    partner_last_name: {
      type: ["string", "null"],
    },
    email_reminders: {
      type: "boolean",
    },
    instagram_username: {
      type: ["string", "null"],
    },
    connection_time: {
      type: ["string", "null"],
    },
  },
};
