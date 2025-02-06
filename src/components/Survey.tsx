import { useState } from "react";
import AnswersList from "./AnswersList";
import React from "react";
import Form from "./Form";

export type FormData = {
  colorRating: string;
  timeSpent: string[];
  review: string;
  name: string;
  email: string;
};

function Survey() {
  const [open, setOpen] = useState(false); 
  const [formDataList, setFormDataList] = useState<FormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleFormSubmit = (formData: FormData) => {
    if (editIndex !== null) {
      setFormDataList((prev) =>
        prev.map((item, index) => (index === editIndex ? formData : item))
      );
      setEditIndex(null); 
    } else {
      setFormDataList((prev) => [...prev, formData]);
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList answersList={formDataList} onEdit={handleEdit} /> 
      </section>
      <section className="survey__form">
        <Form onSubmit={handleFormSubmit} editIndex={editIndex} initialData={editIndex !== null ? formDataList[editIndex] : null}/>
      </section>
    </main>
  );
}

export default Survey;
