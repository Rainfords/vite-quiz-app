import * as React from "react";
import classNames from "classnames";
import parse from "html-react-parser";
// Types
import { AnswerObject } from "@components/Quiz";
// Styles
import styles from "./QuestionCard.module.scss";

type QuestionProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};
const QuestionCard: React.FC<QuestionProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className={styles.QuestionCard}>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p>{parse(question)}</p>
      <div>
        {answers.map((answer) => {
          var btnGroupClasses = classNames(styles.QuestionButton, {
            [styles.correct]: userAnswer?.correctAnswer === answer,
            [styles.incorrect]: userAnswer?.answer === answer,
          });
          return (
            <div key={answer}>
              <button
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
                className={btnGroupClasses}
              >
                <span>{parse(answer)}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
