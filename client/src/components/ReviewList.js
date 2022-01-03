import rev from "./ReviewList.module.css";
 import { useState } from "react";
 import { useHistory } from "react-router-dom";

function ReviewList({ props }) {
  const reviews = props.data;
  const [clicked, setClicked] = useState("")
  const [state, setState] = useState(false);

  const redirect = useHistory();

  const onClick = (event) => {
    event.preventDefault();
    setState(true);

    if(state) {
      redirect.push("review", { book: clicked });
    }
  };

  const map_reviews = reviews.map((review) => {
    const num = review.stars;
    const stars = num.toString() + ".png";


    if (review.filename == null || review.filename == "") {
      return (
        <article className={rev.review}>
          <p>{review.title}</p>
          <button className={rev.button} 
          onClick={(event) => {
            setClicked(review);
            onClick(event);
          }}>
            <img
              className={rev.img}
              src={`http://localhost:3001/unknown.jpg`}
            />
          </button>
          <img
            className={rev.img_stars}
            src={`http://localhost:3001/${stars}`}
          />
        </article>
      );
    } else {
      return (
        <article className={rev.review}>
          <p>{review.title}</p>
          <button
            className={rev.button}
            onClick={(event) => {
              setClicked(review);
              onClick(event);
            }}
            >
            <img
              className={rev.img}
              src={`http://localhost:3001/${review.filename}`}
              value={review.filename}
            />
          </button>
          <img
            className={rev.img_stars}
            src={`http://localhost:3001/${stars}`}
          />
        </article>
      );
    }
  });

  return <div className={rev.grid}>{map_reviews}</div>;
}

export default ReviewList;
