import { useContext } from "react";
import classes from "./Tasks.module.css";
import { GlobalContext } from "../../store/GlobalStore";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const context = useContext(GlobalContext);

  return (
    <div className={classes.taskBox}>
      <p className={classes.title}>
        Total Tasks <b>{context.Taskdata.length}</b>
      </p>
      <div
        className={`${classes.taskList} ${
          context.currentTheme ? classes.whiteTheme : undefined
        }`}
      >
        {context.Taskdata.length > 0 &&
          context.Taskdata.map((item) => (
            <TaskItem
              key={item.taskid}
              id={item.taskid}
              detail={item.task}
              date={item.date}
            />
          ))}
      </div>
    </div>
  );
};

export default Tasks;
