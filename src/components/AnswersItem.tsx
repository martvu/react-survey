import React from "react";
import { FormData } from "./Survey";

const answersSet: Record<string, string> = {
  swimming: "Swimming",
  bathing: "Bathing",
  chatting: "Chatting",
  noTime: "I don't like to spend time with it",
};

type ItemsListProps = {
  list: string[];
};

function ItemsList({ list }) {
  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>{answersSet[item]}</li>
      ))}
    </ul>
  );
}

type AnswersItemProps = {
  answerItem: FormData;
  onEdit: () => void;
};
export default function AnswersItem({ answerItem, onEdit }: AnswersItemProps) {
  const { name, colorRating, timeSpent, review } = answerItem;

  return (
    <li>
      <article className="answer">
        <h3>{name || "Anon"} said:</h3>
        <p>
          <em>How do you rate your rubber duck colour?</em>
          <span className="answer__line">{colorRating}</span>
        </p>
        <p>
          <em>How do you like to spend time with your rubber duck?</em>
        </p>
        <ItemsList list={timeSpent} />
        <p>
          <em>What else have you got to say about your rubber duck?</em>
          <span className="answer__line">{review}</span>
        </p>
        <button onClick={onEdit}>Edit</button>
      </article>
    </li>
  );
}
