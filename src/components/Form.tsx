import React, { useEffect, useState } from "react";
import { FormData } from "./Survey";
type FormProps = {
  onSubmit: (formData: FormData) => void;
  editIndex: number | null;
  initialData: FormData | null;
};

const numberRatings = [1, 2, 3, 4];
const timeSpentOptions = ["swimming", "bathing", "chatting", "noTime"];

function Form({ onSubmit, editIndex, initialData }: FormProps) { 
  const [formData, setFormData] = useState<FormData>({
    colorRating: "",
    timeSpent: [],
    review: "",
    name: "",
    email: "",
  });


  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      colorRating: "",
      timeSpent: [],
      review: "",
      name: "",
      email: "",
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      colorRating: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      timeSpent: checked
        ? [...prev.timeSpent, value]
        : prev.timeSpent.filter((item) => item !== value),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>{editIndex !== null ? "Edit your answer" : "Tell us what you think about your rubber duck!"}</h2>
        
        <div className="form__group radio">
          <h3>How do you rate your rubber duck colour?</h3>
          <ul>
            {numberRatings.map((rating) => (
              <li key={rating}>
                <input
                  id={`color-${rating}`}
                  type="radio"
                  name="colorRating" 
                  value={String(rating)}
                  checked={formData.colorRating === String(rating)}
                  onChange={handleRadioChange}
                />
                <label htmlFor={`color-${rating}`}>{rating}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="form__group">
          <h3>How do you like to spend time with your rubber duck?</h3>
          <ul>
            {timeSpentOptions.map((option) => (
              <li key={option}>
                <label>
                  <input
                    name="timeSpent"
                    type="checkbox"
                    value={option}
                    checked={formData.timeSpent.includes(option)}
                    onChange={handleCheckboxChange}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <label>
          What else have you got to say about your rubber duck?
          <textarea
            name="review"
            cols={30}
            rows={10}
            value={formData.review}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Put your name here (if you feel like it):
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>

        <label>
          Leave us your email pretty please??
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>

        <input className="form__submit" type="submit" value="Submit Survey!" />
      </form>
    </div>
  );
}

export default Form;
