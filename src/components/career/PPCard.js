import classes from "./PPCard.module.css";
import { useState } from "react";

const PPCard = (props) => {
  const [deleteDisplay, changeDeleteDisplay] = useState(false);
  function showToggle(e) {
    changeDeleteDisplay((previous) => !previous);
  }

  function deleteCard(e) {
    const confirmation = window.confirm(`Are you sure to delete Card ?`);

    if (confirmation) {
      console.log("remove");
      console.log(e.currentTarget.parentElement.id);
      props.deleteFunc(e.currentTarget.parentElement.id);
    }
  }

  return (
    <li onClick={showToggle} id={props.id}>
      <div className={classes.details}>
        <section>
          <h1>{props.organization}</h1>
          <p>{props.profile}</p>
        </section>
        <aside>
          <p>{props.start}</p>
          <p className={props.current ? classes.active : undefined}>
            {props.current && "▼"}
            {props.current ? "current" : props.end}
          </p>
        </aside>
      </div>
      <div
        className={`${classes.delete} ${
          deleteDisplay ? classes.deleteMoveUp : undefined
        } `}
        onClick={deleteCard}
      >
        <p>Remove Card</p>
      </div>
    </li>
  );
};
export default PPCard;
