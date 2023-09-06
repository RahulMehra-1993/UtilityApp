import classes from "./TaskCreater.module.css";
import { GlobalContext } from "../store/GlobalStore";
import { useContext } from "react";
const TaskCreater = () => {
  const context = useContext(GlobalContext);
  function taskHandler() {
    context.contentType("create");
    context.showUI();
  }
  return (
    <div
      className={`${classes.taskCreaterBox} ${
        context.currentTheme ? classes.darkTheme : classes.lightTheme
      }`}
      onClick={taskHandler}
    >
      <p>Create Task</p>
      <div className={classes.addIcon}>
        <ion-icon name="add-circle-outline"></ion-icon>
      </div>
    </div>
  );
};

export default TaskCreater;
