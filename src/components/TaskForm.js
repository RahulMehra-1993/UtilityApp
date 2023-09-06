import { useRef, useState } from "react";
import classes from "./TaskForm.module.css";
import { useContext } from "react";
import { GlobalContext } from "../store/GlobalStore";

const TaskForm = () => {
  const context = useContext(GlobalContext);
  const taskVal = useRef();
  const dateVal = useRef();
  const [error, errorState] = useState(false);
  const [errorText, errorTextstate] = useState(false);
  const [dateValue, changeDateValue] = useState("");

  function submitHandler(e) {
    errorState(false);
    errorTextstate("");
    e.preventDefault();
    let inputTask = taskVal.current.value.toString().toUpperCase();
    let datePicked = dateVal.current.value;
    changeDateValue(datePicked);
    let id;
    if (taskVal.current.value.length > 30) {
      errorState((previous) => !previous);
      errorTextstate("only up to 30 characters");
      return;
    } else {
      //trying to connect with database
      const fetchFunc = async function () {
        if (context.user[1] !== null && context.user[1] !== "") {
          console.log("entering fetch function");
          let url = "https://utility-app-6923b-default-rtdb.firebaseio.com";

          if (inputTask && datePicked) {
            const data = { tasks: inputTask, Date: dateValue };

            const option = {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            };
            try {
              const result = await fetch(
                `${url}/${context.user[1]}/Tasks.json`,
                option
              );

              const data = await result.json();
              id = data.name;
              //changing the state and uplifting id and task
              // context.createTask(inputTask, id);
              context.fetchTask(context.login, context.user[1]);
              context.showUI();
              //notification popup
              context.NotificationUpdater();
              context.NotificationContentUpdater("Added");
              //
            } catch (error) {
              console.log(error.message);
              //if internet is off
              context.contentType("fiveZeroThree");
            }
          } else {
            errorState(true);
            errorTextstate("Task or Date missing");
          }
        } else {
          errorState(true);
          errorTextstate("Login to use this premium feature ✨");
        }
      };

      fetchFunc();
    }
  }
  function errorHandler(e) {
    if (e.target.value.length < 30) {
      errorState(false);
    }
    if (e.target.value.length > 30) {
      errorState(true);
      errorTextstate("Max limit of 30 letters");
    }
  }
  function fileButtonReferealFunc(e) {
    document.getElementById("dateInput").showPicker();
  }

  function displayDate() {
    let datePicked = dateVal.current.value;
    changeDateValue(datePicked);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label id="task">Enter your task</label>
      <textarea
        rows="3"
        onChange={errorHandler}
        name="create"
        type="text"
        autoCorrect="false"
        ref={taskVal}
        // maxLength={20}
        placeholder="Description limit 30 charcaters"
      ></textarea>

      {error && <p className={classes.error}>{errorText}</p>}
      <div className={classes.btnGrp}>
        <input
          type="date"
          id="dateInput"
          className={classes.dateInput}
          ref={dateVal}
          onChange={displayDate}
        />
        <button
          type="button"
          className={classes.dateButton}
          onClick={fileButtonReferealFunc}
        >
          <i class="ri-calendar-todo-line ri-xl"></i>
          {dateValue}
        </button>
        <button type="submit" className={classes.submittButton}>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
