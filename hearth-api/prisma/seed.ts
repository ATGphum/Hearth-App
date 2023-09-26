import {
  CourseCategoryChoices,
  Experience,
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // -------------------------------------------------------
  // Create the courses
  // -------------------------------------------------------
  const course_3_days = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      level: 1,
      name: "3-Day Connection Challenge",
      description:
        "Our introductory challenge designed to help you feel more connected in just 3 days. ",
      color: "#7CE3F9",
      subscription_required: false,
      category: CourseCategoryChoices.journey,
      next_course: undefined,
      experiences: undefined,
    },
  });

  const course_18_days_level_1 = await prisma.course.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      level: 2,
      name: "18-Day Connection Journey - Level 1",
      description:
        "Eighteen unique experiences designed to help you build the habit of consistently creating space to connect and relax together. ",
      color: "#9FF237",
      subscription_required: true,
      category: CourseCategoryChoices.journey,
      previous_course_id: course_3_days.id,
      experiences: undefined,
    },
  });

  await prisma.course.update({
    where: { id: course_3_days.id },
    data: { next_course: { connect: { id: course_18_days_level_1.id } } },
  });

  // -------------------------------------------------------
  //   Create the Experiences
  // -------------------------------------------------------
  const experiences_3_days: Experience[] = [
    {
      id: 1,
      level: 0,
      name: "Introduction",
      description:
        "Welcome! In this recording, we will give you a quick overview of everything that you need to know for the 3-Day Connection Challenge. For an ideal experience, we recommend that you listen to all of our audios on a speaker, if possible. Thank you for joining us! Enjoy.",
      activity_type:
        "Passive - Find a quiet space where you can listen comfortably. ",
      duration: "2",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695705820/Journeys/3-Day%20Connection%20Challenge/3-Day_Connection_Challenge_-_0_-_Introduction_ehwhsa.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693854/JourneyPictures/Journey0Logo_e2xkup.png",
      color: "#7CE3F9",
      course_id: course_3_days.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 2,
      level: 1,
      name: "Relaxation",
      description: `Did you know that partners who consistently engage in mindfulness and relaxation practices together can often report a significant increase in their relationship wellbeing*? \n\nThat’s what we will focus on today, practicing mindfulness and relaxing together.`,
      activity_type:
        "Passive - Find a quiet space where you can sit back or lay down comfortably.",
      duration: "7",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695705823/Journeys/3-Day%20Connection%20Challenge/3-Day_Connection_Challenge_-_1_-_Relaxation_cvbqr2.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693854/JourneyPictures/Journey0Logo_e2xkup.png",
      color: "#7CE3F9",
      course_id: course_3_days.id,
      previous_experience_id: null,
      study:
        "*Karremans, J. C., Kappen, G., Schellekens, M., & Schoebi, D. (2020). Comparing the effects of a mindfulness versus relaxation intervention on romantic relationship wellbeing. Scientific Reports. DOI: https://www.nature.com/articles/s41598-020-78919-6",
    },
    {
      id: 3,
      level: 2,
      name: "Listening",
      description:
        "Studies have shown that partners who practice active listening can significantly improve perceptions of spouses' attitudes and feelings*, but we don’t need studies to know that listening with attention and compassion to our partners can be an essential element to caring for our relationship. Today, we will focus on creating a gentle space to listen, with compassion. ",
      activity_type:
        "Active - There will be gentle interaction. Find a quiet space where you can comfortably face each other and speak. ",
      duration: "11",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695705820/Journeys/3-Day%20Connection%20Challenge/3-Day_Connection_Challenge_-_2_-_Day_2_zzqz3d.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693854/JourneyPictures/Journey2Logo_vzjg4s.png",
      color: "#7CE3F9",
      course_id: course_3_days.id,
      previous_experience_id: null,
      study: `*Garland, D. 1981. ""Training Married Couples in Listening Skills: Effects on Behavior, Perceptual Accuracy and Marital Adjustment."" Semantic Scholar. DOI: https://www.jstor.org/stable/584144?origin=crossref.`,
    },
    {
      id: 4,
      level: 3,
      name: "Gratitude",
      description: `Researchers have found that partners who regularly express gratitude to each other often report being more responsive to their partners' needs as well as more committed and more likely to remain in their relationships over time. \n\nSharing gratitude with your partner is a wonderful practice that can often inspire feelings of positivity and appreciation for both the sharer and the receiver. Let’s explore it!`,
      activity_type:
        "Active - There will be gentle interaction. Find a quiet space where you can comfortably face each other and speak. ",
      duration: "5",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695705820/Journeys/3-Day%20Connection%20Challenge/3-Day_Connection_Challenge_-_2_-_Day_2_zzqz3d.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693854/JourneyPictures/Journey2Logo_vzjg4s.png",
      color: "#7CE3F9",
      course_id: course_3_days.id,
      previous_experience_id: null,
      study: `*Gordon, A. M., Impett, E., Kogan, A., Oveis, C., & Keltner, D. (2012). To have and to hold: Gratitude promotes relationship maintenance in intimate bonds. Journal of Personality and Social Psychology. http://ist-socrates.berkeley.edu/~keltner/publications/GordonEtAl_2012_JPSP.pdf `,
    },
  ];

  //   Create the experiences objects first
  let experiences_update = await Promise.all(
    experiences_3_days.map((experience) => {
      return prisma.experience.upsert({
        where: { id: experience.id },
        update: {},
        create: experience,
      });
    })
  );

  //  To add the previous_experience_id to the experiences of the 3-Day Connection Challenge
  experiences_update = await Promise.all(
    experiences_update.map((experience) => {
      return prisma.experience.update({
        where: { id: experience.id },
        data: {
          previous_experience_id:
            experience.id === 1 ? null : experience.id - 1,
        },
      });
    })
  );

  //   Set the created experiences to the course
  await prisma.course
    .update({
      where: { id: course_3_days.id },
      data: {
        experiences: {
          connect: experiences_update.map((exp) => ({
            id: exp.id,
          })),
        },
      },
    })
    .catch((e) => console.log(e));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
