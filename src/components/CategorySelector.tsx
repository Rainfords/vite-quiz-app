import { TriviaCategory } from "@api/api";
import React from "react";
import styles from "./CategorySelector.module.scss";

interface IProps {
  initialCategory: TriviaCategory;
  categories: TriviaCategory[];
  isLoading: boolean;
  setCategory: (category: TriviaCategory) => void;
}

const CategorySelector = (props: IProps) => {
  const { initialCategory, categories, setCategory, isLoading } = props;
  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement> | undefined
  ) => {
    const selected = parseInt(event?.target.value || "0");
    setCategory(
      categories?.find((categories) => categories.id === selected) ||
        initialCategory
    );
  };
  return (
    <>
      <div className={styles.category}>
        <label>Select Category</label>
        <select onChange={handleChangeCategory}>
          <option key={initialCategory.id} value={initialCategory.id}>
            {initialCategory.name}
          </option>
          {categories?.map((category: TriviaCategory) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CategorySelector;
