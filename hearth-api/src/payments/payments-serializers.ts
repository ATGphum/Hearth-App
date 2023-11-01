export const addressElementSchema = {
  type: "object",
  properties: {
    city: {
      type: ["string", "null"],
    },
    country: {
      type: ["string", "null"],
    },
    address_ine1: {
      type: ["string", "null"],
    },
    address_line2: { type: ["string", "null"] },
    postal_code: {
      type: ["string", "null"],
    },
    state: {
      type: ["string", "null"],
    },
  },
};
