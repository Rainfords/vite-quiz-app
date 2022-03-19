import React, { useState } from "react";
import styles from "./DifficultySelector.module.scss";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

interface IProps {
  setDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector = (props: IProps) => {
  const handleChangeDifficulty = (
    event: React.ChangeEvent<HTMLSelectElement> | undefined
  ) => {
    const selected = (event?.target.value as Difficulty) || Difficulty.EASY;
    props.setDifficulty(selected);
  };
  return (
    <div className={styles.difficulty}>
      <label>Select Difficulty</label>
      <select onChange={handleChangeDifficulty}>
        {Object.values(Difficulty).map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DifficultySelector;
