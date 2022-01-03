import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
import form from "./SignUpForm.module.css";

function SignUpForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const redirect = useHistory();

  const onSubmitL = (event) => {
    event.preventDefault();
    redirect.push("/signin");
  };

  const onSubmitR = (event) => {
    event.preventDefault();

    if (validatePassword(password, password2)) {
      alert("The passwords do not match");
    } else {
      Axios.post("http://localhost:3001/adduser", {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
      }).then((response) => {
        if (response.data.correct) {
          redirect.push("/profile", { email: response.data.email });
        }
      });
    }
  };

  const validatePassword = (pass, pass2) => {
    if (pass !== pass2) {
      return true;
    }
  };

  return (
    <div>
      <div className={form.column_left}>
        <form onSubmit={onSubmitL}>
          <h1>Sign in</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic
          </p>
          <input type="submit" className={form.btn_left} value="Sign in" />
        </form>
      </div>
      <div className={form.column_right}>
        <form onSubmit={onSubmitR} className={form.form}>
          <h1>Create user</h1>
          <div className={form.inputColumn}>
            <div className={form.flexi}>
              <label>
                <h2>Firstname</h2>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>

              <label>
                <h2>Lastname</h2>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
            </div>

            <label>
              <h2>Email</h2>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <h2>Password</h2>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label>
              <h2>Repeat password</h2>
              <input
                type="password"
                value={password2}
                required
                onChange={(e) => setPassword2(e.target.value)}
              />
            </label>
          </div>

          <div className={form.text}>
            <input type="checkbox" name="hello" required />I agree to the{" "}
            <Link to="conditions">Conditions</Link>
          </div>
          <input type="submit" className={form.btn_right} value="Register" />
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
