import classes from "./CareerTracker.module.css";
import ProfessionalPortal from "./career/ProfessionalPortal";
import StudentPortal from "./career/StudentPortal";
import { useState } from "react";
const CareerTracker = () => {
  const [toggelButton, changeToggelButton] = useState(true);
  function toggelAction() {
    changeToggelButton((previous) => !previous);
  }
  return (
    <div className={classes.careerTrackerBox}>
      <article
        className={`${classes.studenPortal} ${
          toggelButton ? classes.hiddenStudent : undefined
        }`}
      >
        <button onClick={toggelAction}>
          <p>▶ Qualification</p>
        </button>
        <StudentPortal />
      </article>
      <article
        className={`${classes.professionalPortal} ${
          toggelButton ? undefined : classes.hiddenProfession
        }`}
      >
        <button onClick={toggelAction}>
          <p>▶ Professional</p>
        </button>
        <ProfessionalPortal />
      </article>
    </div>
  );
};
export default CareerTracker;
