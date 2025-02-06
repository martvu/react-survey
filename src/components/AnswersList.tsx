import React from "react";
import AnswersItem from "./AnswersItem";
import { FormData } from "./Survey";

type AnswersListProps = {
  answersList: FormData[];
  onEdit: (index: number) => void;
};

export default function AnswersList({ answersList, onEdit }: AnswersListProps) {
  console.log("Inside AnswersList: ", answersList);

  return (
    <ul>
      {answersList.length === 0 ? (
        <p>No answers yet.</p> 
      ) : (
        answersList.map((answerItem, i) => (
          <AnswersItem answerItem={answerItem} key={i} onEdit={() => onEdit(i)} />
        ))
      )}
    </ul>
  );
}
