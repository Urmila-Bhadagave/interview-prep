// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const generateQuestions = async (
//   industry: string,
//   topic: string,
//   type: string,
//   role: string,
//   numOfQuestions: number,
//   duration: number,
//   difficulty: string
// ) => {
//   const tokensPerQuestion = 500;
//   const maxTokens = tokensPerQuestion * numOfQuestions;

//   const prompt = `
//     Generate total "${numOfQuestions}" "${difficulty}" "${type}" interview questions for the topic "${topic}" in the "${industry}" industry.
//     The interview is for a candidate applying for the role of "${role}" and total duration of interview is "${duration}" minutes.
    
//     **Ensure the following:**
//     - The questions are well-balanced, including both open-ended and specific questions.
//     - Each question is designed to evaluate a specific skill or knowledge area relevant to the role.
//     - The questions are clear, concise and engaging for the candidate.
//     - The questions are suitable for a "${difficulty}" interview in the "${industry}" industry.
//     - Ensure the questions are directly aligned with "${difficulty}" responsibilities and expertise in "${role}".
    
//     **Instructions:**
//     - Always follow same format for questions.
//     - Provide all question without any prefix.
//     - No question number or bullet points or hypen - is required.
//     `;

//   const response = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are expert in generating questions tailored to specific roles, industries, experience levels and topic. You responses should be professional, concise and well-structured. ",
//       },
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//     max_tokens: maxTokens,
//     temperature: 0.8,
//   });

//   const content = response?.choices[0]?.message?.content;
//   if (!content) {
//     throw new Error("Failed to generate questions");
//   }

//   const questions = content
//     .trim()
//     .split("\n")
//     .filter((q) => q)
//     .map((q) => ({
//       question: q,
//     }));

//   return questions;
// };

// function extractScoresAndSuggestion(content: string) {
//   const overAllScoreMatch = content.match(/Overall score=(\d+)/);
//   const relevanceScoreMatch = content.match(/Relevance score=(\d+)/);
//   const clarityScoreMatch = content.match(/Clarity score=(\d+)/);
//   const completenessScoreMatch = content.match(/Completeness score=(\d+)/);
//   const suggestionsMatch = content.match(/Suggestions=(.*)/);

//   const overAllScore = overAllScoreMatch ? overAllScoreMatch[1] : "0";
//   const relevance = relevanceScoreMatch ? relevanceScoreMatch[1] : "0";
//   const clarity = clarityScoreMatch ? clarityScoreMatch[1] : "0";
//   const completeness = completenessScoreMatch ? completenessScoreMatch[1] : "0";
//   const suggestion = suggestionsMatch ? suggestionsMatch[1] : "";

//   return {
//     overallScore: parseInt(overAllScore),
//     relevance: parseInt(relevance),
//     clarity: parseInt(clarity),
//     completeness: parseInt(completeness),
//     suggestion,
//   };
// }

// export const evaluateAnswer = async (question: string, answer: string) => {
//   const prompt = `
//     Evaluate the following answer to the question based on the evaluation criteria and provide the scores for relevance, clarity, and completeness, followed by suggestions in text format.
    
//     **Evaluation Criteria:**
//         1. Overall Score: Provide an overall score out of 10 based on the quality of the answer.
//         2. Relevance: Provide a score out of 10 based on how relevant the answer is to the question.
//         3. Clarity: Provide a score out of 10 based on how clear and easy to understand the explanation is.
//         4. Completeness: Provide a score out of 10 based on how well the answer covers all aspects of the question.
//         5. Suggestions: Provide any suggestions or improvements to the answer in text.

//     **Question:** ${question}
//     **Answer:** ${answer}

//     **Instructions:**
//         - Always follow same format for providing scores and suggestions.
//         - Provide the score only like "Overall score=5", "Relevance score=7", "Clarity =9", "Completeness score=1", for following:
//             - Overall score
//             - Relevance score
//             - Clarity score
//             - Completeness score
//         -Provide text only for following only like "Suggestions=your_answer_here":  
//             - Suggestions or improved answer in text.
//     `;

//   const response = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are an expert evaluator with a strong understanding of assessing answers to interview questions.",
//       },
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//     max_tokens: 500,
//     temperature: 0.8,
//   });

//   const content = response?.choices[0]?.message?.content;
//   if (!content) {
//     throw new Error("Failed to evaluate answer");
//   }

//   const result = extractScoresAndSuggestion(content);

//   return {
//     overallScore: result.overallScore,
//     relevance: result.relevance,
//     clarity: result.clarity,
//     completeness: result.completeness,
//     suggestion: result.suggestion,
//   };
// };



import OpenAI from "openai";

// ✅ OpenRouter configuration
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // set this in .env
  baseURL: "https://openrouter.ai/api/v1",
});

// ---------- Generate Interview Questions ----------
export const generateQuestions = async (
  industry: string,
  topic: string,
  type: string,
  role: string,
  numOfQuestions: number,
  duration: number,
  difficulty: string
) => {
  const prompt = `
  Generate total "${numOfQuestions}" "${difficulty}" "${type}" interview questions for the topic "${topic}" in the "${industry}" industry.
  The interview is for a candidate applying for the role of "${role}" and total duration of interview is "${duration}" minutes.

  **Ensure the following:**
  - Questions are well-balanced: both open-ended and specific.
  - Each question tests one key skill related to "${role}".
  - Do not include numbering, bullet points, or dashes.
  - Only output the questions (no extra text).
  `;

  const response = await client.chat.completions.create({
    model:"mistralai/mistral-7b-instruct",                //"meta-llama/llama-3-70b-instruct",  ✅ valid OpenRouter model
    messages: [
      {
        role: "system",
        content:
          "You are an expert interview question generator for multiple industries and roles.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Failed to generate questions");

  // Split questions line-by-line
  const questions = content
    .trim()
    .split("\n")
    .filter((q) => q)
    .map((q) => ({
      question: q,
    }));

  return questions;
};

// ---------- Helper to Extract Scores ----------
function extractScoresAndSuggestion(content: string) {
  const overAllScoreMatch = content.match(/Overall score=(\d+)/);
  const relevanceScoreMatch = content.match(/Relevance score=(\d+)/);
  const clarityScoreMatch = content.match(/Clarity score=(\d+)/);
  const completenessScoreMatch = content.match(/Completeness score=(\d+)/);
  const suggestionsMatch = content.match(/Suggestions=(.*)/);

  const overAllScore = overAllScoreMatch ? overAllScoreMatch[1] : "0";
  const relevance = relevanceScoreMatch ? relevanceScoreMatch[1] : "0";
  const clarity = clarityScoreMatch ? clarityScoreMatch[1] : "0";
  const completeness = completenessScoreMatch ? completenessScoreMatch[1] : "0";
  const suggestion = suggestionsMatch ? suggestionsMatch[1] : "";

  return {
    overallScore: parseInt(overAllScore),
    relevance: parseInt(relevance),
    clarity: parseInt(clarity),
    completeness: parseInt(completeness),
    suggestion,
  };
}

// ---------- Evaluate Answers ----------

// export const evaluateAnswer = async (question: string, answer: string) => {
//   const prompt = `
//   Evaluate the following answer to the question based on these criteria:

//   1. Overall Score: out of 10
//   2. Relevance Score: out of 10
//   3. Clarity Score: out of 10
//   4. Completeness Score: out of 10
//   5. Suggestions: personalized feedback text along with correct answer in text format.if answer is equal to  'pass' motivate the candidate and give reference of good resources to study.
//   **Question:** ${question}
//   **Answer:** ${answer}

//   Always reply exactly in this format:
//   Overall score=7
//   Relevance score=8
//   Clarity score=9
//   Completeness score=8
//   Suggestions=The answer is clear but could include more technical depth.
//   `;


// export const evaluateAnswer = async (question: string, answer: string) => {
//   const prompt = `
// CRITICAL INSTRUCTIONS:
// - You MUST respond in EXACTLY this format with exact labels:
// Overall score=X
// Relevance score=Y
// Clarity score=Z
// Completeness score=W
// Suggestions=Your feedback text

// - For "pass" answers, ALL scores must be 0
// - For actual answers, provide accurate scoring and include the correct answer in suggestions when needed

// EVALUATION CRITERIA:
// 1. Overall Score (0-10): Comprehensive quality assessment
// 2. Relevance Score (0-10): Directly addresses the question
// 3. Clarity Score (0-10): Well-structured and understandable
// 4. Completeness Score (0-10): Covers all key aspects

// SPECIAL CASES:
// - If answer is "pass", "I don't know", or equivalent: 
//   * All scores = 0
//   * Suggestions must include encouragement AND learning resources AND the correct answer from reliable sources.
// - If answer is incorrect/partial:
//   * Suggestions must include the correct answer with explanation from reliable sources.
// IMPORTANT: For "pass" answers, you MUST write the complete detailed answer. Never stop mid-sentence. Always finish the full explanation.Give equal priority to each and every answer.

// NOW EVALUATE THE FOLLOWING:
// **QUESTION:** ${question}
// **ANSWER:** ${answer}

// EVALUATION:
// `;


//   const response = await client.chat.completions.create({
//     model: "mistralai/mistral-7b-instruct",//"meta-llama/llama-3-70b-instruct", ✅ valid OpenRouter model
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are an expert evaluator of interview answers for various technical and behavioral questions.",
//       },
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//     temperature: 0.3,
//     max_tokens: 2000,
//   });

//   const content = response.choices[0]?.message?.content;
//   if (!content) throw new Error("Failed to evaluate answer");

//   return extractScoresAndSuggestion(content);
// };
export const evaluateAnswer = async (question:string, answer:string) => {
  const prompt = `
ROLE:
You are a strict yet supportive interview evaluator. You must ALWAYS follow the exact evaluation rules and never skip required sections.

OUTPUT FORMAT (exactly as shown, no extra text, no markdown):
Overall score=X
Relevance score=Y
Clarity score=Z
Completeness score=W
Suggestions=Your feedback text (include correct answer if needed)

---

EVALUATION CRITERIA:
1. Overall Score (0–10): General quality, accuracy, and completeness.
2. Relevance Score (0–10): How well the answer addresses the question directly.
3. Clarity Score (0–10): Clear communication and logical structure.
4. Completeness Score (0–10): How thoroughly it covers the key aspects.

---

⚠️ SPECIAL RULE — "PASS" or EQUIVALENT ANSWERS
If the candidate’s answer equals or means "pass", "skip", "I don’t know", "not sure", or is blank:
- Set ALL scores to 0 (Overall, Relevance, Clarity, Completeness).
- Still write a **Suggestions** section that includes:
  1. A short, encouraging motivational note.
  2. At least 2 trusted learning resources (official docs, tutorials, or books).
  3. The **complete correct answer**, clearly written and easy to understand.
- Do NOT give partial or empty feedback — always output a detailed Suggestion section.

✅ Example for "pass":
Overall score=0
Relevance score=0
Clarity score=0
Completeness score=0
Suggestions=Don’t worry about missing this one! You can review SQL Joins at https://www.w3schools.com/sql/sql_join.asp and in the official PostgreSQL docs. Correct Answer: INNER JOIN returns only matching rows between two tables.


---

⚙️ FOR NON-PASS ANSWERS:
- Evaluate fairly and give balanced priority to each score and feedback section.
- If the answer is partially correct, provide detailed constructive feedback.
- Always include the correct answer if the candidate’s response is incomplete or wrong.
- Never omit the “Suggestions” section.

---

IMPORTANT CONSISTENCY RULES:
- Always output every field (even if 0).
- Always provide a full and detailed “Suggestions” field.
- Never skip the correct answer when relevant.
- Never stop mid-sentence.
- Give equal importance to scoring, feedback, and correct answer.

---
IMPORTANT:
-NEVER output partial sentences.
-NEVER cut Suggestions mid way.
-If needed shorten explanation but DO NOT end abruptly.

NOW EVALUATE:
QUESTION: ${question}
ANSWER: ${answer}

EVALUATION:
`;

  const response = await client.chat.completions.create({
    model: "meta-llama/llama-3-70b-instruct", // Better logical consistency than Mistral
    messages: [
      {
        role: "system",
        content:
          "You are an expert evaluator who follows all rules strictly and produces reliable, structured output.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.2, // lower = more deterministic
    max_tokens: 2500,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Failed to evaluate answer");

  return extractScoresAndSuggestion(content);
};


