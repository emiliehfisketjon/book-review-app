import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import re from "./ReviewEdit.module.css";

function ReviewEdit() {
  const location = useLocation();
  const book = location.state.book;



  const redirect = useHistory();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [date, setDate] = useState("");

  const onSubmit = (event) => {
      event.preventDefault();

        Axios.post("http://localhost:3001/edit", {
          id: book.id_user,
          title: title,
          author: author,
          review: review,
          stars: stars, 
          date: date,
        }).then((response) => {
          if (response.data.correct) {
            redirect.push("/review", { book: book });
          }
        });
          
  }



  return (
    <div className={re.margin}>
      <form onSubmit={onSubmit}>
        <input type="submit" value="Save" />
        <label>
          <input
            type="text"
            defaultValue={book.title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            defaultValue={book.author}
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <div className={re.inputField}>
          <label>
            <input
              type="text"
              defaultValue={book.review}
              required
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
        </div>

        <label className={re.item}>
          <input
            type="number"
            min="1"
            max="5"
            defaultValue={book.stars}
            required
            onChange={(e) => setStars(e.target.value)}
          />
        </label>
        <label>
          <input
            type="date"
            defaultValue={book.date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
}

export default ReviewEdit;
