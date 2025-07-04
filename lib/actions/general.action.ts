"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

// export async function createFeedback(params: CreateFeedbackParams) {
//   const { interviewId, userId, transcript, feedbackId } = params;

//   try {
//     const formattedTranscript = transcript
//       .map(
//         (sentence: { role: string; content: string }) =>
//           `- ${sentence.role}: ${sentence.content}\n`
//       )
//       .join("");

//     const { object } = await generateObject({
//       model: google("gemini-2.0-flash-001", {
//         structuredOutputs: false,
//       }),
//       schema: feedbackSchema,
//       prompt: `
//         You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
//         Transcript:
//         ${formattedTranscript}

//         Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
//         - **Communication Skills**: Clarity, articulation, structured responses.
//         - **Technical Knowledge**: Understanding of key concepts for the role.
//         - **Problem-Solving**: Ability to analyze problems and propose solutions.
//         - **Cultural & Role Fit**: Alignment with company values and job role.
//         - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
//         `,
//       system:
//         "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
//     });

//     const feedback = {
//       interviewId,
//       userId,
//       totalScore: object.totalScore,
//       categoryScores: object.categoryScores,
//       strengths: object.strengths,
//       areasForImprovement: object.areasForImprovement,
//       finalAssessment: object.finalAssessment,
//       createdAt: new Date().toISOString(),
//     };

//     let feedbackRef;

//     if (feedbackId) {
//       feedbackRef = db.collection("feedback").doc(feedbackId);
//     } else {
//       feedbackRef = db.collection("feedback").doc();
//     }

//     await feedbackRef.set(feedback);

//     return { success: true, feedbackId: feedbackRef.id };
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     return { success: false };
//   }
// }

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", { structuredOutputs: false }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId,
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    // 🔥 Add score to scores collection
    const scoresRef = db.collection("scores").doc();

    const formattedScores = object.categoryScores.reduce((acc: any, curr: any) => {
      acc[curr.name] = curr.score;
      return acc;
    }, {});

    const scoresData = {
      interviewId,
      userId,
      averageScore: object.totalScore,
      ...formattedScores,
      createdAt: new Date().toISOString(),
    };

    await scoresRef.set(scoresData);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}


export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const interviewDoc = await db.collection("interviews").doc(id).get();
    if (!interviewDoc.exists) return null;
    return interviewDoc.data() as Interview;
  } catch (error) {
    console.error("Error fetching interview by ID:", error);
    return null;
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  try {
    const querySnapshot = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (querySnapshot.empty) return null;

    const feedbackDoc = querySnapshot.docs[0];
    return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
  } catch (error) {
    console.error("Error fetching feedback by interviewId:", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  if (!userId) {
    console.warn("getLatestInterviews called without userId");
    return null;
  }

  try {
    // Firestore requires orderBy on the field with inequality filter
    const snapshot = await db
      .collection("interviews")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .orderBy("userId") // Required when using != filter on userId
      .orderBy("createdAt", "desc") // Secondary ordering
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching latest interviews:", error);
    return null;
  }
}

export async function getInterviewsByUserId(
  userId: string | undefined
): Promise<Interview[] | null> {
  if (!userId) {
    console.warn("getInterviewsByUserId called without userId");
    return null;
  }

  try {
    const snapshot = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching interviews by userId:", error);
    return null;
  }
}







export async function getUserScores(userId: string) {
  if (!userId) return null;

  try {
    const snapshot = await db
      .collection("scores")
      .where("userId", "==", userId)
      .orderBy("createdAt", "asc")
      .get();

    const scores = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return scores;
  } catch (error) {
    console.error("Error fetching user scores:", error);
    return null;
  }
}