import { useHistory } from "react-router-dom";
import pb from "./ProfileButtons.module.css";

export default function ProfileButtons({props}) {
  const redirect = useHistory();

  const email = props;
  console.log(email)

  const onClick = (event) => {
    event.preventDefault();

    redirect.push("/addreview", { email: email });
  };

  const signOut = (event) => {
    event.preventDefault();
    redirect.push("/signin");
  };

  return (
    <div className={pb.margin}>
      <button className={pb.add} onClick={onClick} >Add book review</button>
      <button className={pb.signout} onClick={signOut} >Sign out</button>
    </div>
  );
}
