import cron from "node-cron";
import prisma from "../prisma.js";
import { Quote } from "@prisma/client";

// update daily quote. This function assumes a quote starting point!!
cron.schedule("0 0 * * *", async function () {
  // make the next daily quote "today's quote"
  const quote: Quote = await prisma.quote.findFirst({
    where: { todays_quote: true },
  });
  if (quote) {
    // make next quote the new daily!
    let nextQuote = await prisma.quote.findFirst({
      where: {
        id: {
          gt: quote.id, // "gt" stands for "greater than"
        },
      },
      orderBy: {
        id: "asc", // Order by ID in ascending order
      },
    });

    if (!nextQuote) {
      // If next post doesn't exist, get the first post
      nextQuote = await prisma.quote.findFirst({
        orderBy: {
          id: "asc", // Order by ID in ascending order
        },
      });
    }
    await prisma.quote.update({
      where: {
        id: quote.id,
      },
      data: {
        todays_quote: false,
      },
    });
    await prisma.quote.update({
      where: {
        id: nextQuote.id,
      },
      data: {
        todays_quote: true,
      },
    });
  }
});

export default cron;
