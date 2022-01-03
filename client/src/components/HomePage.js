import hp from "./HomePage.module.css";

function HomePage() {
    return (
      <div>
        <div className={hp.fst_component}>
          <h1>Write you're own book reviews.</h1>
        </div>
        <div className={hp.snd_component}>
          <h1></h1>
        </div>
        <div className={hp.trd_component}>
          <h1></h1>
        </div>
      </div>
    );
}

export default HomePage
