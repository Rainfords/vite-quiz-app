import { QueryClient, useQuery, UseQueryResult } from "react-query"
import { shuffleArray } from "@utils/utils"

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[]}

export type TriviaCategory = {
    id: number;
    name: string;
}

export const useFetchQuizQuestions = (
    client: QueryClient, 
    amount: number, 
    difficulty: string,
    category: number
): UseQueryResult<QuestionState[], Error> => {
    return useQuery(
        'quiz-questions', 
        () => fetchQuizQuestions(amount, difficulty, category),
        {
            refetchOnWindowFocus: false,
            enabled: false,
        }
    )
}

export const useFetchQuizCategoties = (client: QueryClient): UseQueryResult<TriviaCategory[], Error> => {
    return useQuery(
        "quiz-categories",
        fetchQuizCategories
    )
}

const fetchQuizQuestions = async(amount: number, difficulty: string, category: number) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`;

    const data = await(await fetch(endpoint)).json()
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}

const fetchQuizCategories = async() => {
    const endpoint = "https://opentdb.com/api_category.php"
    const data = await(await fetch(endpoint)).json()
    return data.trivia_categories.map((category: TriviaCategory) => ({
        ...category
    }))
}

