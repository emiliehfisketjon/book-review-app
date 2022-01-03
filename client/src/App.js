import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./page/SignUp";
import Conditions from "./page/Conditions";
import Home from "./page/Home";
import Profile from "./page/Profile";
import SignIn from "./page/SignIn";
import About from "./page/About";
import Navbar from "./components/Navbar";
import BookReview from "./page/BookReview";
import Review from "./components/Review";
import ReviewEdit from "./components/ReviewEdit";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/review" component={Review} />
        <Route path="/conditions" component={Conditions} />
        <Route path="/addreview" component={BookReview} />
        <Route path="/edit" component={ReviewEdit} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
