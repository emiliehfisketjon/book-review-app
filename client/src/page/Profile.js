import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import Review from "../components/ReviewList";
import ProfileButtons from "../components/ProfileButtons";

function Profile() {
  const location = useLocation();
  const email = location.state.email;

  const [reviews, setReviews] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      Axios.post("http://localhost:3001/reviews", {
        email: email,
      }).then((res) => {
        setReviews(res.data);
        setState(true);
      });
    };
    fetchData();
  }, []);

  const defaultValue = (
   <ProfileButtons props={email}/>
  );

  if (!state) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  } else if (reviews.data.length == 0) {
    return (
      <div>
        {defaultValue}
        <div>No reviews</div>
      </div>
    );
  } else {
    return (
      <div>
        {defaultValue}

        <Review props={reviews} />
      </div>
    );
  }
}

export default Profile;
