import { useState } from "react";
import { useHistory } from "react-router-dom";

import Axios from "axios";

import form from "./SignInForm.module.css";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const redirect = useHistory();

  const onSubmitR = (event) => {
    event.preventDefault();
    redirect.push("/signup");
  };

  const onSubmitL = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3001/checkuser", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setStatus(response.data.message);
      }
      if (response.data.correct) {
        redirect.push("/profile", { email: email });
      }
    });
  };

  return (
    <div>
      <div className={form.column_left}>
        <form onSubmit={onSubmitL} className={form.form}>
          <h1>Sign in</h1>
          <div>
            <label>
              <h2>Email</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              <h2>Password</h2>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>{status}</div>
          <input type="submit" className={form.btn_left} value="Log in" />
        </form>
      </div>
      <div className={form.column_right}>
        <form onSubmit={onSubmitR}>
          <h1>Create user</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic
          </p>
          <input type="submit" className={form.btn_right} value="Sign up" />
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
