import * as React from "react";

import {
  TriviaCategory,
  useFetchQuizCategoties,
  useFetchQuizQuestions,
} from "@api/api";
// Components
import QuestionCard from "@components/QuestionCard";
// Types
import { QuestionState } from "@api/api";
// Styles
import styles from "./Quiz.module.scss";
import { useQueryClient } from "react-query";
import DifficultySelector, { Difficulty } from "./DifficultySelector";
import CategorySelector from "./CategorySelector";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

type IStateProps = {
  number: number;
  score: number;
  gameOver: boolean;
  userAnswers: AnswerObject[];
  currentCategory: TriviaCategory;
  difficulty: Difficulty;
};

const TOTAL_QUESTIONS = 10;
const initialCategory: TriviaCategory = { id: 0, name: "All Categories" };

export const Quiz = () => {
  const queryClient = useQueryClient();
  const [state, setState] = React.useState<IStateProps>({
    number: 0,
    score: 0,
    gameOver: true,
    userAnswers: [],
    currentCategory: initialCategory,
    difficulty: Difficulty.EASY,
  });
  const {
    data: questions = [],
    refetch,
    isLoading,
    error,
  } = useFetchQuizQuestions(
    queryClient,
    TOTAL_QUESTIONS,
    state.difficulty,
    state.currentCategory.id
  );

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useFetchQuizCategoties(queryClient);

  React.useEffect(() => {
    if (error) {
      throw new Error(error.message);
    }
  }, [error]);

  const startTrivia = async () => {
    refetch();
    setState({
      ...state,
      gameOver: false,
      score: 0,
      number: 0,
      userAnswers: [],
    });
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!state.gameOver) {
      // Users answer
      const answer = e.currentTarget.value;

      // Check answer against correct answer
      const correct = questions[state.number].correct_answer === answer;
      e.currentTarget.classList.add(correct ? "correct" : "incorrect");

      // Save answer in the array for user answers
      const answerObject = {
        question: questions[state.number].question,
        answer,
        correct,
        correctAnswer: questions[state.number].correct_answer,
      };

      setState({
        ...state,
        userAnswers: [...state.userAnswers, answerObject],
        score: correct ? state.score + 1 : state.score,
      });
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = state.number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setState({ ...state, gameOver: true });
    } else {
      setState({ ...state, number: nextQuestion });
    }
  };

  const setDifficulty = (difficulty: Difficulty) => {
    setState({ ...state, difficulty });
  };

  const setCategory = (category: TriviaCategory) => {
    setState({ ...state, currentCategory: category });
  };

  return (
    <>
      {state.gameOver || state.userAnswers.length === TOTAL_QUESTIONS ? (
        <>
          <CategorySelector
            categories={categories}
            initialCategory={initialCategory}
            isLoading={isCategoriesLoading}
            setCategory={setCategory}
          />
          <DifficultySelector setDifficulty={setDifficulty} />
          <button className={styles.start} onClick={startTrivia}>
            START
          </button>
        </>
      ) : null}

      {!state.gameOver ? (
        <p className={styles.score}>Score: {state.score}</p>
      ) : null}

      {isLoading && <p>Loading Questions...</p>}

      {!isLoading && !state.gameOver && (
        <QuestionCard
          questionNumber={state.number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[state.number].question}
          answers={questions[state.number].answers}
          userAnswer={
            state.userAnswers ? state.userAnswers[state.number] : undefined
          }
          callback={checkAnswer}
        />
      )}

      {!state.gameOver &&
      state.userAnswers.length === state.number + 1 &&
      state.number !== TOTAL_QUESTIONS - 1 ? (
        <button className={styles.next} onClick={nextQuestion}>
          NEXT QUESTION
        </button>
      ) : null}
    </>
  );
};
