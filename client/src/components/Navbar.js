import { Link } from "react-router-dom";

import nav from "./Navbar.module.css";

function Navbar() {
  return (
    <nav>
      <Link className={nav.logo} to="/">
        book reviews
      </Link>

      <ul className={nav.links}>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="signin">Sign in</Link>
        </li>
        <li>
          <Link to="signup">Sign up</Link>
        </li>
      </ul>
      <div className={nav.burger}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
