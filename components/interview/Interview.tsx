// "use client";

// import React, { useEffect, useState } from "react";
// import { Progress, Button, Alert, Chip } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { IInterview, IQuestion } from "@/backend/models/interview.model";
// import { formatTime } from "@/helpers/helpers";

// import PromptInputWithBottomActions from "./PromptInputWithBottomActions";
// import {
//   getAnswerFromLocalStorage,
//   getAnswersFromLocalStorage,
//   getFirstIncompleteQuestionIndex,
//   saveAnswerToLocalStorage,
// } from "@/helpers/interview";
// import toast from "react-hot-toast";
// import { updateInteview } from "@/actions/interview.action";
// import { useRouter } from "next/navigation";

// export default function Interview({ interview }: { interview: IInterview }) {
//   const initialQuestionIndex = getFirstIncompleteQuestionIndex(
//     interview?.questions
//   );

//   const [currentQuestionIndex, setCurrentQuestionIndex] =
//     useState(initialQuestionIndex);

//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [answer, setAnswer] = useState("");

//   const [timeLeft, setTimeLeft] = useState(interview?.durationLeft);
//   const [showAlert, setShowAlert] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const currentQuestion = interview?.questions[currentQuestionIndex];

//   useEffect(() => {
//     if (timeLeft === 0) {
//       handleExitInterview();
//     }
//   }, [timeLeft]);

//   useEffect(() => {
//     // Load answers from local storage
//     const storedAnswers = getAnswersFromLocalStorage(interview?._id);

//     if (storedAnswers) {
//       setAnswers(storedAnswers);
//     } else {
//       interview?.questions?.forEach((question: IQuestion) => {
//         if (question?.completed) {
//           saveAnswerToLocalStorage(
//             interview?._id,
//             question?._id,
//             question?.answer
//           );
//         }
//       });
//     }
//   }, [interview?._id]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime: number) => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           return 0;
//         }

//         if (prevTime === 10) {
//           setShowAlert(true);
//         }

//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleAnswerChange = (value: string) => {
//     setAnswer(value);
//   };

//   const saveAnswerToDB = async (questionId: string, answer: string) => {
//     setLoading(true);

//     try {
//       const res = await updateInteview(
//         interview?._id,
//         timeLeft?.toString(),
//         questionId,
//         answer
//       );

//       if (res?.error) {
//         setLoading(false);
//         return toast.error(res?.error?.message);
//       }
//     } catch (error) {
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNextQuestion = async (answer: string) => {
//     const previousAnswer = answers[currentQuestion?._id];

//     if (previousAnswer !== answer && answer !== "") {
//       await saveAnswerToDB(currentQuestion?._id, answer);
//       saveAnswerToLocalStorage(interview?._id, currentQuestion?._id, answer);
//     }

//     setAnswers((prevAnswers) => {
//       const newAnswers = { ...prevAnswers };
//       newAnswers[currentQuestion?._id] = answer;
//       return newAnswers;
//     });

//     if (currentQuestionIndex < interview?.numOfQuestions - 1) {
//       setCurrentQuestionIndex((prevIndex) => {
//         const newIndex = prevIndex + 1;

//         const nextQuestion = interview.questions[newIndex];
//         setAnswer(getAnswerFromLocalStorage(interview?._id, nextQuestion?._id));

//         return newIndex;
//       });
//     } else if (currentQuestionIndex === interview?.numOfQuestions - 1) {
//       // User in on last question then move user to 1st question
//       setCurrentQuestionIndex(0);
//       setAnswer(
//         getAnswerFromLocalStorage(interview?._id, interview.questions[0]?._id)
//       );
//     } else {
//       setAnswer("");
//     }
//   };

//   const handlePassQuestion = async () => {
//     await handleNextQuestion("pass");
//   };

//   const handlePreviousQuestion = async () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => {
//         const newIndex = prevIndex - 1;

//         const previousQuestion = interview.questions[newIndex];
//         setAnswer(
//           getAnswerFromLocalStorage(interview?._id, previousQuestion?._id)
//         );

//         return newIndex;
//       });
//     }
//   };

//   const handleExitInterview = async () => {
//     setLoading(true);

//     try {
//       const res = await updateInteview(
//         interview?._id,
//         timeLeft?.toString(),
//         currentQuestion?._id,
//         answer,
//         true
//       );

//       if (res?.error) {
//         setLoading(false);
//         return toast.error(res?.error?.message);
//       }

//       if (res?.updated) {
//         setLoading(false);
//         router.push("/app/interviews");
//       }
//     } catch (error) {
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-full w-full max-w-full flex-col gap-8">
//       {showAlert && (
//         <Alert
//           color="danger"
//           description={"Interview is about to exit"}
//           title={"Time up!"}
//         />
//       )}

//       <Progress
//         aria-label="Interview Progress"
//         className="w-full"
//         color="default"
//         label={`Question ${currentQuestionIndex + 1} of ${
//           interview?.numOfQuestions
//         }`}
//         size="md"
//         value={((currentQuestionIndex + 1) / interview?.numOfQuestions) * 100}
//       />
//       <div className="flex flex-wrap gap-1.5">
//         {interview?.questions?.map((question: IQuestion, index: number) => (
//           <Chip
//             key={index}
//             color={answers[question?._id] ? "success" : "default"}
//             size="sm"
//             variant="flat"
//             className="font-bold cursor-pointer text-sm radius-full"
//             onClick={() => {
//               setCurrentQuestionIndex(index);
//               setAnswer(
//                 getAnswerFromLocalStorage(interview?._id, question?._id)
//               );
//             }}
//           >
//             {index + 1}
//           </Chip>
//         ))}
//       </div>
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
//         <span className="text-lg font-semibold text-right mb-2 sm:mb-0">
//           Duration Left: {formatTime(timeLeft)}
//         </span>
//         <Button
//           color="danger"
//           startContent={<Icon icon="solar:exit-outline" fontSize={18} />}
//           variant="solid"
//           onPress={handleExitInterview}
//           isDisabled={loading}
//           isLoading={loading}
//         >
//           Save & Exit Interview
//         </Button>
//       </div>

//       <span className="text-center h-40">
//         <span
//           className={`tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-[1.4rem] lg:text-2.5xl flex items-center justify-center h-full`}
//         >
//           {currentQuestion?.question}
//         </span>
//       </span>

//       <PromptInputWithBottomActions
//         key={currentQuestionIndex}
//         value={answer}
//         onChange={handleAnswerChange}
//       />

//       <div className="flex justify-between items-center mt-5">
//         <Button
//           className="bg-foreground px-[18px] py-2 font-medium text-background"
//           radius="full"
//           color="secondary"
//           variant="flat"
//           startContent={
//             <Icon
//               className="flex-none outline-none [&>path]:stroke-[2]"
//               icon="solar:arrow-left-linear"
//               width={20}
//             />
//           }
//           onPress={handlePreviousQuestion}
//           isDisabled={loading || currentQuestionIndex === 0}
//           isLoading={loading}
//         >
//           Previous
//         </Button>

//         <Button
//           className="px-[28px] py-2"
//           radius="full"
//           variant="flat"
//           color="success"
//           startContent={
//             <Icon
//               className="flex-none outline-none [&>path]:stroke-[2]"
//               icon="solar:compass-big-bold"
//               width={18}
//             />
//           }
//           onPress={() => handlePassQuestion()}
//           isDisabled={loading}
//           isLoading={loading}
//         >
//           Pass
//         </Button>

//         <Button
//           className="bg-foreground px-[18px] py-2 font-medium text-background"
//           radius="full"
//           color="secondary"
//           variant="flat"
//           endContent={
//             <Icon
//               className="flex-none outline-none [&>path]:stroke-[2]"
//               icon="solar:arrow-right-linear"
//               width={20}
//             />
//           }
//           onPress={() => handleNextQuestion(answer)}
//           isDisabled={loading}
//           isLoading={loading}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { IInterview, IQuestion } from "@/backend/models/interview.model";
// import { formatTime } from "@/helpers/helpers";
// import PromptInputWithBottomActions from "./PromptInputWithBottomActions";
// import {
//   getAnswerFromLocalStorage,
//   getAnswersFromLocalStorage,
//   getFirstIncompleteQuestionIndex,
//   saveAnswerToLocalStorage,
// } from "@/helpers/interview";
// import toast from "react-hot-toast";
// import { updateInteview } from "@/actions/interview.action";
// import { useRouter } from "next/navigation";

// export default function Interview({ interview }: { interview: IInterview }) {
//   const initialQuestionIndex = getFirstIncompleteQuestionIndex(
//     interview?.questions
//   );

//   const [currentQuestionIndex, setCurrentQuestionIndex] =
//     useState(initialQuestionIndex);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [answer, setAnswer] = useState("");
//   const [timeLeft, setTimeLeft] = useState(interview?.durationLeft);
//   const [showAlert, setShowAlert] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const currentQuestion = interview?.questions[currentQuestionIndex];

//   // Timer
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime: number) => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           handleExitInterview();
//           return 0;
//         }
//         if (prevTime === 10) setShowAlert(true);
//         return prevTime - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Load answers
//   useEffect(() => {
//     const storedAnswers = getAnswersFromLocalStorage(interview?._id);
//     if (storedAnswers) {
//       setAnswers(storedAnswers);
//     } else {
//       interview?.questions?.forEach((question: IQuestion) => {
//         if (question?.completed) {
//           saveAnswerToLocalStorage(
//             interview?._id,
//             question?._id,
//             question?.answer
//           );
//         }
//       });
//     }
//   }, [interview?._id]);

//   const handleAnswerChange = (value: string) => {
//     setAnswer(value);
//   };

//   const saveAnswerToDB = async (questionId: string, answer: string) => {
//     setLoading(true);
//     try {
//       const res = await updateInteview(
//         interview?._id,
//         timeLeft?.toString(),
//         questionId,
//         answer
//       );
//       if (res?.error) {
//         toast.error(res?.error?.message);
//       }
//     } catch {
//       toast.error("Error saving answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNextQuestion = async (answer: string) => {
//     const previousAnswer = answers[currentQuestion?._id];
//     if (previousAnswer !== answer && answer !== "") {
//       await saveAnswerToDB(currentQuestion?._id, answer);
//       saveAnswerToLocalStorage(interview?._id, currentQuestion?._id, answer);
//     }

//     setAnswers((prev) => ({ ...prev, [currentQuestion?._id]: answer }));

//     if (currentQuestionIndex < interview?.numOfQuestions - 1) {
//       const newIndex = currentQuestionIndex + 1;
//       const nextQuestion = interview.questions[newIndex];
//       setCurrentQuestionIndex(newIndex);
//       setAnswer(getAnswerFromLocalStorage(interview?._id, nextQuestion?._id));
//     } else {
//       setCurrentQuestionIndex(0);
//       setAnswer(
//         getAnswerFromLocalStorage(interview?._id, interview.questions[0]?._id)
//       );
//     }
//   };

//   const handlePassQuestion = async () => {
//     await handleNextQuestion("pass");
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       const newIndex = currentQuestionIndex - 1;
//       const prevQ = interview.questions[newIndex];
//       setCurrentQuestionIndex(newIndex);
//       setAnswer(getAnswerFromLocalStorage(interview?._id, prevQ?._id));
//     }
//   };

//   const handleExitInterview = async () => {
//     setLoading(true);
//     try {
//       const res = await updateInteview(
//         interview?._id,
//         timeLeft?.toString(),
//         currentQuestion?._id,
//         answer,
//         true
//       );
//       if (res?.error) {
//         toast.error(res?.error?.message);
//       } else if (res?.updated) {
//         router.push("/app/interviews");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 w-full">
//       {/* Alert */}
//       {showAlert && (
//         <div className="bg-red-100 text-red-800 p-3 rounded-md text-center font-medium">
//           Interview is about to exit — less than 10 seconds left!
//         </div>
//       )}

//       {/* Progress Bar */}
//       <div className="w-full">
//         <div className="flex justify-between mb-1 text-sm font-medium">
//           <span>
//             Question {currentQuestionIndex + 1} of {interview?.numOfQuestions}
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-3">
//           <div
//             className="bg-blue-500 h-3 rounded-full"
//             style={{
//               width: `${
//                 ((currentQuestionIndex + 1) / interview?.numOfQuestions) * 100
//               }%`,
//             }}
//           ></div>
//         </div>
//       </div>

//       {/* Question chips */}
//       <div className="flex flex-wrap gap-2">
//         {interview?.questions?.map((question: IQuestion, i: number) => (
//           <button
//             key={i}
//             className={`px-3 py-1 rounded-full text-sm font-semibold ${
//               answers[question?._id]
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => {
//               setCurrentQuestionIndex(i);
//               setAnswer(
//                 getAnswerFromLocalStorage(interview?._id, question?._id)
//               );
//             }}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       {/* Timer & Exit */}
//       <div className="flex justify-between items-center mt-3">
//         <span className="text-lg font-semibold">
//           Duration Left: {formatTime(timeLeft)}
//         </span>
//         <button
//           onClick={handleExitInterview}
//           disabled={loading}
//           className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Save & Exit Interview"}
//         </button>
//       </div>

//       {/* Question */}
//       <div className="text-center py-8 text-2xl font-semibold text-purple-600">
//         {currentQuestion?.question}
//       </div>

//       {/* Answer Input */}
//       <PromptInputWithBottomActions
//         key={currentQuestionIndex}
//         value={answer}
//         onChange={handleAnswerChange}
//       />

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-5">
//         <button
//           onClick={handlePreviousQuestion}
//           disabled={loading || currentQuestionIndex === 0}
//           className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
//         >
//           ← Previous
//         </button>

//         <button
//           onClick={handlePassQuestion}
//           disabled={loading}
//           className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
//         >
//           Pass
//         </button>

//         <button
//           onClick={() => handleNextQuestion(answer)}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import { IInterview, IQuestion } from "@/backend/models/interview.model";
import { formatTime } from "@/helpers/helpers";
import PromptInputWithBottomActions from "./PromptInputWithBottomActions";
import {
  getAnswerFromLocalStorage,
  getAnswersFromLocalStorage,
  getFirstIncompleteQuestionIndex,
  saveAnswerToLocalStorage,
} from "@/helpers/interview";
import toast from "react-hot-toast";
import { updateInteview } from "@/actions/interview.action";
import { useRouter } from "next/navigation";

export default function Interview({ interview }: { interview: IInterview }) {
  const initialQuestionIndex = getFirstIncompleteQuestionIndex(
    interview?.questions
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(initialQuestionIndex);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(interview?.durationLeft);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const currentQuestion = interview?.questions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleExitInterview();
          return 0;
        }
        if (prevTime === 10) setShowAlert(true);
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load answers
  useEffect(() => {
    const storedAnswers = getAnswersFromLocalStorage(interview?._id);
    if (storedAnswers) {
      setAnswers(storedAnswers);
    } else {
      interview?.questions?.forEach((question: IQuestion) => {
        if (question?.completed) {
          saveAnswerToLocalStorage(
            interview?._id,
            question?._id,
            question?.answer
          );
        }
      });
    }
  }, [interview?._id]);

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
  };

  const saveAnswerToDB = async (questionId: string, answer: string) => {
    setLoading(true);
    try {
      const res = await updateInteview(
        interview?._id,
        timeLeft?.toString(),
        questionId,
        answer
      );
      if (res?.error) toast.error(res?.error?.message);
    } catch {
      toast.error("Error saving answer");
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = async (answer: string) => {
    const previousAnswer = answers[currentQuestion?._id];
    if (previousAnswer !== answer && answer !== "") {
      await saveAnswerToDB(currentQuestion?._id, answer);
      saveAnswerToLocalStorage(interview?._id, currentQuestion?._id, answer);
    }

    setAnswers((prev) => ({ ...prev, [currentQuestion?._id]: answer }));

    if (currentQuestionIndex < interview?.numOfQuestions - 1) {
      const newIndex = currentQuestionIndex + 1;
      const nextQuestion = interview.questions[newIndex];
      setCurrentQuestionIndex(newIndex);
      setAnswer(getAnswerFromLocalStorage(interview?._id, nextQuestion?._id));
    } else {
      setCurrentQuestionIndex(0);
      setAnswer(
        getAnswerFromLocalStorage(interview?._id, interview.questions[0]?._id)
      );
    }
  };

  const handlePassQuestion = async () => {
    await handleNextQuestion("pass");
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      const prevQ = interview.questions[newIndex];
      setCurrentQuestionIndex(newIndex);
      setAnswer(getAnswerFromLocalStorage(interview?._id, prevQ?._id));
    }
  };

  const handleExitInterview = async () => {
    setLoading(true);
    try {
      const res = await updateInteview(
        interview?._id,
        timeLeft?.toString(),
        currentQuestion?._id,
        answer,
        true
      );
      if (res?.error) {
        toast.error(res?.error?.message);
      } else if (res?.updated) {
        router.push("/app/interviews");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {showAlert && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md text-center font-medium">
          Interview is about to exit — less than 10 seconds left!
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>
            Question {currentQuestionIndex + 1} of {interview?.numOfQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / interview?.numOfQuestions) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question chips */}
      <div className="flex flex-wrap gap-2">
        {interview?.questions?.map((question: IQuestion, i: number) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              answers[question?._id]
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setCurrentQuestionIndex(i);
              setAnswer(
                getAnswerFromLocalStorage(interview?._id, question?._id)
              );
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Timer & Exit */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-semibold">
          Duration Left: {formatTime(timeLeft)}
        </span>
        <button
          onClick={handleExitInterview}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save & Exit Interview"}
        </button>
      </div>

      {/* Question */}
      <div className="text-center py-8 text-2xl font-semibold text-purple-600">
        {currentQuestion?.question}
      </div>

      {/* Answer Input (Now supports video speech recognition) */}
      <PromptInputWithBottomActions
        key={currentQuestionIndex}
        value={answer}
        onChange={handleAnswerChange}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-5">
        <button
          onClick={handlePreviousQuestion}
          disabled={loading || currentQuestionIndex === 0}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          ← Previous
        </button>

        <button
          onClick={handlePassQuestion}
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
        >
          Pass
        </button>

        <button
          onClick={() => handleNextQuestion(answer)}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
