import { useContext, useRef, useState } from "react";
import classes from "./ProfessionalForm.module.css";
import { GlobalContext } from "../../store/GlobalStore";
import Notification from "../../ui/Notification";

const ProfessionalForm = (props) => {
  const context = useContext(GlobalContext);
  let organization = useRef();
  let profile = useRef();
  let start = useRef();
  let end = useRef();
  let currentCompanyRef = useRef();

  const [error, changError] = useState(false);
  const [textstate, errorTextstate] = useState(false);

  const [valueOnClick, changevalueOnClick] = useState(false);

  function checked() {
    changevalueOnClick((previous) => !previous);
  }

  function submitHandler(e) {
    e.preventDefault();
    //initial target values using ref
    let orgVal = organization.current;
    let proVal = profile.current;
    let starVal = start.current;
    let endVal = end.current;
    let currentCompanyVal = "";
    // default borders
    orgVal.classList.remove("error");
    proVal.classList.remove("error");
    starVal.classList.remove("error");
    endVal.classList.remove("error");

    //check conditions
    if (orgVal.value === "") {
      orgVal.classList.add("error");
      return;
    }
    if (proVal.value === "") {
      proVal.classList.add("error");
      return;
    }
    if (starVal.value === "") {
      starVal.classList.add("error");
      return;
    }
    if (endVal.value === "") {
      if (!valueOnClick) {
        console.log("value is empty");
        endVal.classList.add("error");
        return;
      }
    }

    console.log(valueOnClick);
    if (valueOnClick) {
      let date = new Date();
      //custom date conversion
      currentCompanyVal =
        date.getFullYear() +
        "-" +
        (Number(date.getMonth()) + 1) +
        "-" +
        date.getUTCDate();
    }
    //calculate experience (years)
    let startingDate = new Date(starVal.value).getFullYear();

    let endTempVaue = valueOnClick ? currentCompanyVal : endVal.value;

    let endingDate = new Date(endTempVaue).getFullYear();

    let experineceYears = endingDate - startingDate;
    console.log(experineceYears);
    let dataToSend = {
      organization: orgVal.value,
      profile: proVal.value,
      start: starVal.value,
      end: valueOnClick ? currentCompanyVal : endVal.value,
      experience: experineceYears,
      current: valueOnClick ? true : false,
    };
    console.log(dataToSend);
    // fetch func

    const fetchFunc = async function () {
      console.log(context.user[1]);
      if (context.user[1] !== null && context.user[1] !== "") {
        console.log("entering fetch function");
        let url = "https://utility-app-6923b-default-rtdb.firebaseio.com";

        const option = {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          // changeNotification(false);
          const result = await fetch(
            `${url}/${context.user[1]}/Details/Professional.json`,
            option
          );

          const data = await result.json();
          console.log(data);
          let id = data.name;
          //notification popup
          context.NotificationUpdater();
          context.NotificationContentUpdater("Added");
          //

          //changing the state and uplifting id and task
          console.log(id);
          //update the screen
          context.fetchTask(context.login, context.user[1]);
        } catch (error) {
          console.log(error.message);
          //if internet is off
          context.contentType("fiveZeroThree");
        }
      } else {
        changError(true);
        errorTextstate("Login to use this feature ✨");
      }
    };

    fetchFunc();
    e.target.reset();
  }

  return (
    <form onSubmit={submitHandler} className={classes.professionalForm}>
      <input ref={organization} placeholder="Company" />
      <input ref={profile} placeholder="Profile" />
      <div className={classes.datesBox}>
        <input ref={start} type="date" placeholder="Start" />
        <input ref={end} type="date" placeholder="End" />
      </div>
      <div className={classes.currentBox}>
        <label htmlFor="current" onClick={checked}>
          Current
        </label>
        <input
          id="current"
          type="checkbox"
          ref={currentCompanyRef}
          placeholder="current"
          checked={valueOnClick}
          readOnly
        />
      </div>
      {/* <input ref={current} type="currentDate" placeholder="Current" /> */}
      <button type="submit">Add+</button>
      {error && <p className={classes.errorDisplay}>{textstate}</p>}
    </form>
  );
};

export default ProfessionalForm;
