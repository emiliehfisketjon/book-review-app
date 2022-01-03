import { useLocation, useHistory } from "react-router-dom";

import r from "./Review.module.css";

function Review() {
const location = useLocation();
const book  = location.state.book;
const num = book.stars;
const stars = num.toString() + ".png";

const redirect = useHistory();

const onClick = (event) => {
event.preventDefault();
redirect.push("/edit", { book: book})
};

const goBack = (event) => {
  event.preventDefault();
  redirect.push("/profile", { email: book.email })
}

  return (
    <div className={r.margin}>
      <button onClick={goBack}>Back</button>
      <button onClick={onClick} >Edit</button>
      <div>
        <p>{book.title}</p>
      </div>
      <div>
        <p>{book.author}</p>
      </div>
      <div>
        <p>{book.review}</p>
      </div>
      <div>
        <p>{book.date}</p>
      </div>
      <div>
        <img src={`http://localhost:3001/${stars}`} />
      </div>
      <div>
  
      </div>
    </div>
  );
}

export default Review;
