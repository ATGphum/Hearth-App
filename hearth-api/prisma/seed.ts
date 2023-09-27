import {
  Course,
  CourseCategoryChoices,
  Experience,
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // -------------------------------------------------------
  // Create the courses
  // -------------------------------------------------------
  const courses: Course[] = [];

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

  courses.push(course_3_days);

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

  courses.push(course_18_days_level_1);

  const course_18_days_level_2 = await prisma.course.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      level: 3,
      name: "18-Day Connection Journey - Level 2",
      description: `Eighteen unique experiences designed to help you develop the habit of consistently creating space to connect and relax together. `,
      color: "#9FF237",
      subscription_required: true,
      category: CourseCategoryChoices.journey,
      previous_course_id: course_18_days_level_1.id,
      experiences: undefined,
    },
  });

  courses.push(course_18_days_level_2);

  const course_18_days_level_3 = await prisma.course.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      level: 4,
      name: "18-Day Connection Journey - Level 3",
      description: `Eighteen unique experiences designed to help you explore the habit of consistently creating space to connect and relax together. `,
      color: "#9FF237",
      subscription_required: true,
      category: CourseCategoryChoices.journey,
      previous_course_id: course_18_days_level_2.id,
      experiences: undefined,
    },
  });

  courses.push(course_18_days_level_3);

  const course_18_days_level_4 = await prisma.course.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      level: 5,
      name: "18-Day Connection Journey - Level 4",
      description: `Eighteen unique experiences designed to help you feel confident in the habit of consistently creating space to connect and relax together. `,
      color: "#9FF237",
      subscription_required: true,
      category: CourseCategoryChoices.journey,
      previous_course_id: course_18_days_level_3.id,
      experiences: undefined,
    },
  });

  courses.push(course_18_days_level_4);

  // Apply next courses to the previous courses

  await Promise.all(
    courses.map((course, index) => {
      if (index !== courses.length - 1)
        return prisma.course.update({
          where: { id: course.id },
          data: {
            next_course: {
              connect: {
                id: course.id + 1,
              },
            },
          },
        });
    })
  ).catch((e) => console.log(e));

  // -------------------------------------------------------
  //   Create the Experiences
  // -------------------------------------------------------

  // Experiences for the 3 day course
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
      description: `Did you know that partners who consistently engage in mindfulness and relaxation practices together can often report a significant increase in their relationship wellbeing*? 
      
      That’s what we will focus on today, practicing mindfulness and relaxing together.`,
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
      description: `Researchers have found that partners who regularly express gratitude to each other often report being more responsive to their partners' needs as well as more committed and more likely to remain in their relationships over time.
      
      Sharing gratitude with your partner is a wonderful practice that can often inspire feelings of positivity and appreciation for both the sharer and the receiver. Let’s explore it!`,
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

  //  Create the experiences objects first
  let experiences_update_3_days_course = await Promise.all(
    experiences_3_days.map((experience) => {
      return prisma.experience.upsert({
        where: { id: experience.id },
        update: {},
        create: experience,
      });
    })
  );

  // To add the previous_experience_id to the experiences of the 3-Day Connection Challenge
  experiences_update_3_days_course = await Promise.all(
    experiences_update_3_days_course.map((experience) => {
      return prisma.experience.update({
        where: { id: experience.id },
        data: {
          previous_experience_id:
            experience.id === 1 ? null : experience.id - 1,
        },
      });
    })
  );

  //  Set the created experiences to the course
  await prisma.course
    .update({
      where: { id: course_3_days.id },
      data: {
        experiences: {
          connect: experiences_update_3_days_course.map((exp) => ({
            id: exp.id,
          })),
        },
      },
    })
    .catch((e) => console.log(e));
  // ---------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------

  // Experiences for the 18 day course
  const experiences_18_days_level_1: Experience[] = [
    {
      id: 5,
      level: 0,
      name: "Introduction",
      description:
        "Congratulations on starting the 18-Day Connection Journey. In this recording, we will provide a quick overview of everything you need to know for this journey. Thank you for joining us. Enjoy!",
      activity_type:
        "Passive - Find a quiet space where you can listen comfortably. ",
      duration: "2",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695706282/Journeys/18-Day%20Connection%20Journey%20-%20Level%201/18-Day_Connection_Journey_-_0_-_Introduction_ghiyrd.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/Journey1Logo_qlvdpb.png",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 6,
      level: 1,
      name: "Intention Setting",
      description: `Today, you will explore intention setting for your eighteen day journey. You will be asked to write during this experience. Before you begin, please make sure you both have access to pen and paper.
      
      Intention setting questions: Why is creating time to connect and relax with your partner important for you? What is your intention for this eighteen day connection journey?`,
      activity_type:
        "Active - You will spend a few minutes writing. Get a pen and paper and find a quiet space where you can write comfortably. ",
      duration: "10",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695706283/Journeys/18-Day%20Connection%20Journey%20-%20Level%201/18-Day_Connection_Journey_-_1_-_Intention_Setting_uqpmmh.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/Journey1Logo_qlvdpb.png",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 7,
      level: 2,
      name: "Love",
      description: `In this experience, you will explore love through the practice of loving-kindness. The aim is to cultivate emotions like love, kindness, and compassion, towards oneself and others. 
      
      Research has shown that people who practice loving-kindness can report an increase in self-compassion and compassionate love, as well as a decrease in anxiety.* `,
      activity_type:
        "Passive - There will be no interaction. Find a quiet space where you can sit back or lay down comfortably. ",
      duration: "10",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695706285/Journeys/18-Day%20Connection%20Journey%20-%20Level%201/18-Day_Connection_Journey_-_2_-_Love_n6fvh5.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/Journey1Logo_qlvdpb.png",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study:
        "*Weibel, D. (2007). A loving-kindness intervention: Boosting compassion for self and others. Semantic Scholar. https://www.semanticscholar.org/paper/A-loving-kindness-intervention-%3A-boosting-for-self-Weibel/8c61a2504802afff9b01d1175eed3ea0ff06af63",
      previous_experience_id: null,
    },
    {
      id: 8,
      level: 3,
      name: "Relaxation - 10 minutes",
      description: `Relaxing together is a wonderful way to tend to your partnership. Today, we practice relaxing together for 10 minutes. `,
      activity_type:
        "Passive - There will be no interaction. Find a quiet space where you can sit back or lay down comfortably. ",
      duration: "10",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695706286/Journeys/18-Day%20Connection%20Journey%20-%20Level%201/18-Day_Connection_Journey_-_3_-_Relaxation_-_10min_autx5d.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/Journey1Logo_qlvdpb.png",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 9,
      level: 4,
      name: "Listening",
      description: `The ability to attentively listen to your partner is significantly linked with better stress management and relationship satisfaction.*
      
      To develop the skill of attentive listening, it’s important to practice it with consistency. Today, we’ll practice listening.  `,
      activity_type:
        "Active - There will be gentle interaction. Find a quiet space where you can comfortably face each other and speak.",
      duration: "10",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695706286/Journeys/18-Day%20Connection%20Journey%20-%20Level%201/18-Day_Connection_Journey_-_3_-_Relaxation_-_10min_autx5d.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/Journey1Logo_qlvdpb.png",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study:
        "*Kuhn, R., Bradbury, T., Nussbeck, F. W., & Bodenmann, G. (2018). The power of listening: Lending an ear to the partner during dyadic coping conversations. Journal of Family Psychology. https://psycnet.apa.org/doiLanding?doi=10.1037%2Ffam0000421",
      previous_experience_id: null,
    },
    {
      id: 10,
      level: 5,
      name: "Gratitude - Self",
      description: `In the journey of exploring gratitude, it’s important to practice expressing gratitude toward ourselves. We’ll explore what that means today. `,
      activity_type:
        "Passive - There will be no interaction. Find a quiet space where you can sit back or lay down comfortably. ",
      duration: "7",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695706295/Journeys/18-Day%20Connection%20Journey%20-%20Level%201/18-Day_Connection_Journey_-_4_-_Listening_pp56kn.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/Journey1Logo_qlvdpb.png",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 11,
      level: 6,
      name: "Love - Self",
      description: `In today’s experience, you will explore self-love through the practice of loving-kindness. `,
      activity_type:
        "Passive - There will be no interaction. Find a quiet space where you can sit back or lay down comfortably. ",
      duration: "10",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695706285/Journeys/18-Day%20Connection%20Journey%20-%20Level%201/18-Day_Connection_Journey_-_6_-_Love_-_Self_q4zvq3.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/Journey1Logo_qlvdpb.png",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 12,
      level: 7,
      name: "Stress Navigation",
      description: `We all encounter experiences that cause stress in our lives. They are inevitable. In this experience, you will explore a self-regulating practice called R.A.I.N., which can help you process stress and conflict with awareness, wisdom, and compassion.  

R.A.I.N. is a mindfulness practice coined in the 1980s by senior meditation teacher Michele McDonald and popularized in recent times by well-known psychologist, meditation teacher and author, Tara Brach. 

It’s also an acronym that stands for the simple framework used in the practice to navigate and process strong emotions:

R - Recognize: This is the initial step of becoming aware of what you're experiencing in the moment, whether it's a thought, emotion, or sensation.

A - Allow: Instead of resisting or trying to change what you've recognized, in this step, you allow it to be there, accepting its presence. It's about giving the experience permission to exist, just as it is.

I - Investigate: With a gentle curiosity, delve deeper into the experience. How does it feel in the body? What beliefs or thoughts are accompanying it? This isn't analytical thinking; it's more about feeling and sensing.

N - Nurture: Offer care and comfort to yourself, especially to the part that's hurting or vulnerable. This can be with a mental phrase like ""It's okay,"" a comforting hand on the heart, or any gesture of kindness.

This practice can be helpful when dealing with stress because it offers a simple framework to navigate difficult moments. Whenever you’re feeling difficulty, you can remember to Recognize it, Allow it, Investigate it, and Nurture it. That may help soften the difficulty for some people, at times. 

This audio experience is for informational purposes only and nothing is intended as professional or medical advice in any capacity. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.`,
      activity_type:
        "Passive - There will be no interaction. Find a quiet space where you can sit back or lay down comfortably. ",
      duration: "10",
      audio_link:
        "https://res.cloudinary.com/ddh1fblle/video/upload/v1695706285/Journeys/18-Day%20Connection%20Journey%20-%20Level%201/18-Day_Connection_Journey_-_6_-_Love_-_Self_q4zvq3.mp3",
      image_link:
        "https://res.cloudinary.com/ddh1fblle/image/upload/t_JourneyMasterLogoShrinked/v1695693855/JourneyPictures/Journey1Logo_qlvdpb.png",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 13,
      level: 8,
      name: "Retrieving data. Wait a few seconds and try to cut or copy again.",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 14,
      level: 9,
      name: "Relaxation - Body",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 15,
      level: 10,
      name: "Listening",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 16,
      level: 11,
      name: "Gratitude - Life",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 17,
      level: 12,
      name: "Love - Partner",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 18,
      level: 13,
      name: "Relaxation - Body",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 19,
      level: 14,
      name: "Listening - Perfect Day",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 20,
      level: 15,
      name: "Stress Navigation",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 21,
      level: 16,
      name: "Gratitude - Partner",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 22,
      level: 17,
      name: "Ritual - Love Altar",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
    {
      id: 23,
      level: 18,
      name: "Reflection - Close",
      description: "",
      activity_type: "",
      duration: "",
      audio_link: "",
      image_link: "",
      color: "#9FF237",
      course_id: course_18_days_level_1.id,
      study: undefined,
      previous_experience_id: null,
    },
  ];

  //  Create the experiences objects first
  let experiences_update_18_days_level_1_course = await Promise.all(
    experiences_18_days_level_1.map((experience) => {
      return prisma.experience.upsert({
        where: { id: experience.id },
        update: {},
        create: experience,
      });
    })
  );

  // To add the previous_experience_id to the experiences of the 3-Day Connection Challenge
  experiences_update_18_days_level_1_course = await Promise.all(
    experiences_update_18_days_level_1_course.map((experience) => {
      return prisma.experience.update({
        where: { id: experience.id },
        data: {
          previous_experience_id:
            experience.id === 5 ? null : experience.id - 1,
        },
      });
    })
  );

  //  Set the created experiences to the course
  await prisma.course
    .update({
      where: { id: course_18_days_level_1.id },
      data: {
        experiences: {
          connect: experiences_update_18_days_level_1_course.map((exp) => ({
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
