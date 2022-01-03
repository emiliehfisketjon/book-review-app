import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import brf from "./BookReviewForm.module.css";

//sending DataForm to server/index.js: source: https://medium.com/geekculture/handling-multipart-form-requests-with-react-js-5d773856cf86

function BookReviewForm({ props }) {
  const email = props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [date, setDate] = useState("");
  const [filename, setFilename] = useState("");
  const [book_cover, setBook_cover] = useState([]);

  const redirect = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("review", review);
    formData.append("stars", stars);
    formData.append("date", date);
    formData.append("filename", filename);
    formData.append("book_cover", book_cover);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    Axios.post("http://localhost:3001/addreview", formData, config).then(
      (response) => {
        if (response.data.correct) {
          redirect.push("profile", { email: response.data.email });
        }
      }
    );
  };

  const fileUpload = (event) => {
    setFilename(event.target.files[0].name);
    setBook_cover(event.target.files[0]);
  };

  return (
    <div className={brf.margin}>
      <div className={brf.form}>
        <form onSubmit={onSubmit}>
          <label>
            <h2>Title</h2>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <h2>Author</h2>
            <input
              type="text"
              value={author}
              required
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <div className={brf.inputField}>
            <label>
              <h2>Review</h2>
              <input
                type="text"
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
              />
            </label>
          </div>

          <label className={brf.item}>
            <h2>Stars</h2>
            <input
              type="number"
              min="1"
              max="5"
              value={stars}
              required
              onChange={(e) => setStars(e.target.value)}
            />
          </label>
          <label>
            <h2>Date</h2>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <input type="file" required accept="image/*" onChange={fileUpload} />
          <input type="submit" value="Add review" />
        </form>
      </div>
    </div>
  );
}

export default BookReviewForm;
