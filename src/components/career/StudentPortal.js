import { useCallback, useContext, useEffect, useRef, useState } from "react";
import classes from "./StudentPortal.module.css";
import StudentForm from "./StudentForm";
import { GlobalContext } from "../../store/GlobalStore";

const StudentPortal = (props) => {
  const context = useContext(GlobalContext);

  let sortedArray = useRef([]);
  let [showFormState, ChangeShowFormState] = useState(false);
  let [firsMount, ChangeFirsMount] = useState(false);
  let [activeState, ChangeActiveState] = useState(false);
  let [contentState, ChangeContentState] = useState(
    <div className={classes.content}>
      <p>◀ Click to check details</p>
    </div>
  );
  //toggel form display on click
  function showForm() {
    ChangeShowFormState((previous) => !previous);
  }
  //sorted array data by education type
  let sortByDateFunc = useCallback(
    (inputValue) => {
      if (context.EducationData.length > 0) {
        let EducationArray = context.EducationData.filter((item) => {
          return item.Type === "education";
        });
        let CertificationArray = context.EducationData.filter((item) => {
          return item.Type === "certification";
        });
        let check =
          inputValue === "education" ? EducationArray : CertificationArray;
        //to sort date
        sortedArray.current = check.sort((a, b) => {
          return +a.Start.split("-")[0] - +b.End.split("-")[0];
        });
      }
    },

    [context.EducationData]
  );

  //education contentent after fetch data
  function educationContentFunc() {
    ChangeFirsMount(true);
    ChangeActiveState(true);
    sortByDateFunc("education");
    {
      sortedArray.current.length === 0
        ? ChangeContentState(<div className={classes.content}></div>)
        : ChangeContentState(
            <div className={classes.content}>
              <ul>
                <li onClick={showForm}>Add +</li>
                {sortedArray.current.map((item) => {
                  return (
                    <li key={item.EducationId}>
                      <details>
                        <summary>{item.NameOfTheEducation}</summary>
                        <div className={classes.insideSummary}>
                          <p>Start : {item.Start}</p>
                          <p>End : {item.End}</p>
                          <p>Institution : {item.InstitutionName}</p>
                        </div>
                        <button
                          onClick={deleteHandler}
                          value={item.EducationId}
                          className={classes.deleteButton}
                        >
                          delete
                        </button>
                      </details>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
    }
  }
  //certificae content after fetch data
  function certificationContentFunc() {
    ChangeFirsMount(true);
    ChangeActiveState(false);
    sortByDateFunc();
    {
      sortedArray.current.length === 0
        ? ChangeContentState(
            <div className={classes.content}>
              <ul>
                <li onClick={showForm}>Add +</li>
                <li className={classes.noData} key="0">
                  No data Available
                </li>
              </ul>
            </div>
          )
        : ChangeContentState(
            <div className={classes.content}>
              <ul>
                <li onClick={showForm}>Add +</li>
                {sortedArray.current.map((item) => {
                  return (
                    <li key={item.EducationId}>
                      <details>
                        <summary>
                          {item.NameOfTheEducation}
                          <strong>- certificate</strong>
                        </summary>
                        <div className={classes.insideSummary}>
                          <p>Start : {item.Start}</p>
                          <p>End : {item.End}</p>
                          <p>Institution : {item.InstitutionName}</p>
                        </div>
                        <button
                          onClick={deleteHandler}
                          value={item.EducationId}
                          className={classes.deleteButton}
                        >
                          delete
                        </button>
                      </details>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
    }
  }
  //delete task -then global update -then update current data in ui
  function deleteHandler(e) {
    async function deleteFunc() {
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
            `${url}/${context.user[1]}/Details/Education/${e.target.value}.json`,
            option
          );
          if (!result.ok) {
            throw new Error("something went wrong");
          }
          context.updateEducation(e.target.value);
          context.fetchTask(context.login, context.user[1]);
          starter();
          sortByDateFunc();
          //notification popup
          context.NotificationUpdater();
          context.NotificationContentUpdater("Removed");
          //
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
    }
    const confirmation = window.confirm(`Are you sure to delete ?`);

    if (confirmation) {
      deleteFunc();
    }
  }
  //conditions to display different education portal initially
  function starter() {
    ChangeContentState(
      <div className={classes.defaultContent}>
        <p>◀ Click to check details</p>
      </div>
    );
    ChangeFirsMount(false);
    ChangeActiveState(false);
  }
  //on first reload
  useEffect(() => {
    starter();
    sortByDateFunc();
  }, [context.EducationData]);
  let educationCondition = firsMount && activeState;
  let certificateCondition = firsMount && !activeState;
  return (
    <div className={classes.studenBox}>
      <div className={classes.studentTitles}>
        <section className={classes.studentHeadings}>
          <div
            onClick={educationContentFunc}
            className={educationCondition ? classes.active : undefined}
          >
            <p>Education </p>
            <span className={classes.icon}>
              <i class="ri-graduation-cap-line"></i>
            </span>
          </div>
          <div
            onClick={certificationContentFunc}
            className={certificateCondition ? classes.active : undefined}
          >
            <p>Certifications</p>
            <span className={classes.icon}>
              <i class="ri-article-line"></i>
            </span>
          </div>
        </section>
        <aside className={classes.details}>{contentState}</aside>
      </div>
      {showFormState && (
        <div className={classes.studentForm}>
          <button className={classes.studentFormButton} onClick={showForm}>
            X
          </button>
          <StudentForm closeForm={showForm} afterSubmission={starter} />
        </div>
      )}
    </div>
  );
};
export default StudentPortal;
