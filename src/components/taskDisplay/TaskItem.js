import { useContext } from "react";
import classes from "./TaskItem.module.css";
import { GlobalContext } from "../../store/GlobalStore";
import { useState } from "react";

const TaskItem = (props) => {
  const context = useContext(GlobalContext);
  const [show, changeShow] = useState(false);

  function deleteHandler() {
    context.updateTask(props.id);
    // trying to delete
    const deleteFunc = async function () {
      console.log(context.user[1]);
      if (context.user[1] !== null && context.user[1] !== "") {
        console.log("entering fetch function");
        let url = "https://utility-app-6923b-default-rtdb.firebaseio.com";
        const option = {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const result = await fetch(
            `${url}/${context.user[1]}/Tasks/${props.id}.json`,
            option
          );
          if (!result.ok) {
            throw new Error("something went wrong");
          }
          //notification popup
          context.NotificationUpdater();
          context.NotificationContentUpdater("Removed");
          //
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("not logged in");
        return;
      }
    };

    deleteFunc();
  }

  const popUp = (
    <div className={classes.delete}>
      <p>Delete task?</p>
      <div className={classes.buttonGroup}>
        <button onClick={deleteHandler}>Yes</button>
        <button className={classes.hideButton} onClick={showToggle}>
          No
        </button>
      </div>
    </div>
  );

  function showToggle() {
    changeShow((previous) => !previous);
  }

  return (
    <div className={classes.taskItemBox}>
      <div
        className={`${classes.taskItem} ${
          !context.currentTheme ? classes.darkTheme : classes.whiteTheme
        }`}
        onClick={showToggle}
      >
        <p>{props.detail}</p>
        <p className={classes.date}>
          {props.date.split("-").reverse().join("-")}
        </p>
      </div>
      {show ? popUp : ""}
    </div>
  );
};

export default TaskItem;
