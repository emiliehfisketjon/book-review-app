import BookReviewForm from "../components/BookReviewForm";
import { useLocation } from "react-router-dom";

function BookReview() {
  const location = useLocation();

  const email = location.state.email;
  console.log(email);

  return (
    <div>
      Book Review page
      <BookReviewForm props={email} />
    </div>
  );
}

export default BookReview;
