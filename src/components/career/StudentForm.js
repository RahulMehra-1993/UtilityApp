import { useContext, useRef, useState } from "react";
import classes from "./StudentForm.module.css";
import { GlobalContext } from "../../store/GlobalStore";

let data = {
  "Arts & Design": [
    "Animation",
    "Art-art-history",
    "Creative-design",
    "Film",
    "Game-design",
    "Graphic-design",
    "Multimedia-design",
    "Photography",
    "Visual-communications",
    "Web-design",
  ],
  "Buisness & Management": [
    "Accounting",
    "Advertising",
    "Business-administration",
    "Business-intelligence",
    "Business-law",
    "Contract-management",
    "Internet-marketing",
    "E-business",
    "Economics",
    "Entertainment-management",
    "Entrepreneurship",
    "Finance",
    "Forensic-accounting",
    "Hospitality-management",
    "Human-resources",
    "International-business",
    "Logistics",
    "Management",
    "Management-information-systems",
    "Marketing",
    "Negotiation-conflict-management",
    "Non-profit-management",
    "Organizational-leadership",
    "Project-management",
    "Public-relations",
    "Real-estate",
    "Retail-sales-management",
    "Risk-management",
    "Small-business",
    "Sports-management",
    "Supply-chain-logistics",
    "Sustainability",
  ],
  "Computer & Technology": [
    "Computer-Aided-Design",
    "Computer-engineering",
    "Computer-forensics",
    "Computer-programming",
    "Computer-science",
    "Data-analytics",
    "Database-management",
    "Information-systems-security",
    "Information-technology",
    "Internet-security",
    "Mobile-development",
    "Network-administration",
    "Network-security",
    "Software-engineering",
    "Ux-Ui",
    "Web-Development",
  ],
  "Criminal Justice & Legal": [
    "Corrections",
    "Crime-scene-investigation",
    "Criminal-justice",
    "Criminology",
    "Cyber-crime",
    "Forensic-science",
    "Homeland-security",
    "Law-enforcement",
    "Legal-studies",
    "Paralegal",
    "Public-safety-administration",
    "Security",
  ],
  "Education & Teaching": [
    "Adult-education-learning",
    "Art-education",
    "Child-development",
    "Coaching",
    "Curriculum-instruction",
    "Early-childhood-education",
    "Education",
    "Educational-administration",
    "Elementary-education",
    "English-language-learning",
    "K-12-education",
    "Library-science",
    "Math-education",
    "Science-education",
    "Secondary-education",
    "Social-studies",
    "Special-education",
    "Teacher-licensure",
  ],
  "Liberal Arts & Humanities": [
    "Anthropology",
    "Communications",
    "English",
    "General-studies",
    "Geography",
    "History",
    "Human-family-development",
    "Journalism",
    "Liberal-arts",
    "Media-communications",
    "Military-studies",
    "Ministry",
    "Music",
    "Philosophy",
    "Political-science",
    "Public-administration",
    "Public-policy",
    "Social-science",
    "Social-work",
    "Sociology",
    "Theology",
    "Writing",
  ],
  "Nursing & Healthcare": [
    "Clinical-research",
    "Emergency-management",
    "Fitness-personal-training",
    "Gerontology",
    "Health-education",
    "Health-informatics",
    "Health-science",
    "Health-services",
    "Healthcare-administration",
    "Healthcare-management",
    "Human-services",
    "Life-care-management",
    "Nursing",
    "Nutritional-sciences",
    "Occupational-therapy",
    "Public-health",
    "Rn-to-bsn",
    "Radiology-technology",
    "Respiratory-therapy",
    "Speech-therapy",
    "Sports-medicine",
    "Sports-medicine-physical-therapy",
  ],
  "Psycology & Counseling": [
    "Addictions-recovery",
    "Behavioral-psychology",
    "Child-and-adolescent-psychology",
    "Counseling",
    "Family-counseling",
    "Forensic-psychology",
    "Mental-health-counseling",
    "Organizational-psychology",
    "Psychology",
  ],
  "Science & Engineering": [
    "Aeronautics-aviation",
    "Biochemistry",
    "Biology",
    "Biomedical-engineering",
    "Chemistry",
    "Civil-engineering",
    "Data-science",
    "Electrical-engineering",
    "Electronics-engineering",
    "Engineering",
    "Engineering-management",
    "Environmental-management",
    "Environmental-science",
    "Industrial-engineering",
    "Mechanical-engineering",
    "Physics",
  ],
  "Trades & Career": [
    "Automotive",
    "Construction-management",
    "Electrical-technician",
    "Fire-science",
    "Forestry",
    "Technology",
  ],
};

const StudentForm = (props) => {
  const context = useContext(GlobalContext);
  const [show, changeOptions] = useState(false);
  const [optionValues, changeValue] = useState([]);
  const typeVal = useRef(null);
  const educationVal = useRef(null);
  const subjectVal = useRef(null);
  const certificateVal = useRef(null);
  const furtherVal = useRef(null);
  const institutionVal = useRef(null);
  const startingVal = useRef(null);
  const endingVal = useRef(null);
  const [error, errorState] = useState(false);
  const [errorText, errorTextstate] = useState(false);

  const educationOptions = (
    <div className={classes.furtherOptions}>
      <select id="education" defaultValue="0" ref={educationVal}>
        <option value="0">Select</option>
        <option value="Secondry">Secondry</option>
        <option value="Senior Secondry">Senior Secondry</option>
        <option value="Associate's">Associate's</option>
        <option value="Bachelor's">Bachelor's</option>
        <option value="Master's">Master's</option>
        <option value="Doctorate">Doctorate</option>
      </select>
      <input placeholder="Subject" ref={subjectVal} />
    </div>
  );
  const certificateOptions = (
    <div className={classes.furtherOptions}>
      <select
        id="certificate"
        defaultValue="0"
        onChange={furtherOptions}
        ref={furtherVal}
      >
        <option value="0">Select</option>
        <option value="Arts & Design">Arts & Design</option>
        <option value="Buisness & Management">Buisness & Management</option>
        <option value="Computer & Technology">Computer & Technology</option>
        <option value="Criminal Justice & Legal">
          Criminal Justice & Legal
        </option>
        <option value="Education & Teaching">Education & Teaching</option>
        <option value="Liberal Arts & Humanities">
          Liberal Arts & Humanities
        </option>
        <option value="Nursing & Healthcare">Nursing & Healthcare</option>
        <option value="Psycology & Counseling">Psycology & Counseling</option>
        <option value="Science & Engineering">Science & Engineering</option>
        <option value="Trades & Career">Trades & Career</option>
      </select>
      {optionValues.length > 0 && (
        <select id="furtherOptions" defaultValue="0" ref={certificateVal}>
          {optionValues.map((x) => {
            return (
              <option key={x} value={x}>
                {x}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
  function showOptions() {
    changeOptions((previous) => !previous);
  }

  function furtherOptions(e) {
    let tempArray = [];
    for (const [key, values] of Object.entries(
      data[furtherVal.current.value]
    )) {
      tempArray.push(values);
    }
    changeValue(tempArray);
  }

  function submitHandler(e) {
    e.preventDefault();
    // resetting all errors

    !show && educationVal.current.classList.remove("error");
    show && furtherVal.current.classList.remove("error");
    startingVal.current.classList.remove("error");
    endingVal.current.classList.remove("error");
    institutionVal.current.classList.remove("error");
    errorState(false);
    errorTextstate("");

    // post to database
    const fetchFunc = async function () {
      console.log(context.user[1]);
      if (context.user[1] !== null && context.user[1] !== "") {
        console.log("entering fetch function");
        // check for inputs

        if (show) {
          if (furtherVal.current.value === "0") {
            furtherVal.current.classList.add("error");

            return;
          }
          if (certificateVal.current.value === "0") {
            certificateVal.current.classList.add("error");
            return;
          }
        } else {
          if (educationVal.current.value === "0") {
            educationVal.current.classList.add("error");
            return;
          }
          if (subjectVal.current.value === "") {
            subjectVal.current.classList.add("error");
            return;
          }
        }

        if (startingVal.current.value === "") {
          startingVal.current.classList.add("error");

          return;
        }
        if (endingVal.current.value === "") {
          endingVal.current.classList.add("error");

          return;
        }
        if (institutionVal.current.value === "") {
          institutionVal.current.classList.add("error");
          return;
        }

        let studentFormData = {
          type: typeVal.current.value,
          start: startingVal.current.value,
          end: endingVal.current.value,
          nameOfTheEducation: !show
            ? educationVal.current.value
            : certificateVal.current.value,
          educationSubject:
            typeVal.current.value === "education"
              ? subjectVal.current.value
              : null,
          certificateFurtherOptions:
            typeVal.current.value === "certification"
              ? furtherVal.current.value
              : null,
          insitutionName: institutionVal.current.value,
        };

        let url = "https://utility-app-6923b-default-rtdb.firebaseio.com";
        const option = {
          method: "POST",
          body: JSON.stringify(studentFormData),
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const result = await fetch(
            `${url}/${context.user[1]}/Details/Education.json`,
            option
          );

          const data = await result.json();
          console.log(data);
          let id = data.name;
          //notification popup
          context.NotificationUpdater();
          //changing the state and uplifting id and task
          console.log(id);
          //update the screen

          context.fetchTask(context.login, context.user[1]);
          props.afterSubmission();
          //resetting all the input values and exit form
          e.target.reset();
          changeOptions(false);
          props.closeForm();
        } catch {
          console.log("Error");
          //if internet is off
          context.contentType("fiveZeroThree");
        }
      } else {
        errorState(true);
        errorTextstate("Login to use this premium feature ✨");
      }
    };

    fetchFunc();
  }

  return (
    <form className={classes.studentForm} onSubmit={submitHandler}>
      <label htmlFor="type">Type</label>
      <select id="type" onChange={showOptions} ref={typeVal}>
        <option value="education">Education</option>
        <option value="certification">Certication</option>
      </select>
      {!show ? (
        <label htmlFor="title">Education Name</label>
      ) : (
        <label htmlFor="title">Certificate Name</label>
      )}
      {!show ? educationOptions : certificateOptions}
      <label htmlFor="start">Starting Date</label>
      <input id="start" type="date" ref={startingVal}></input>
      <label htmlFor="end">Ending Date</label>
      <input id="end" type="date" ref={endingVal}></input>
      <label htmlFor="institutionName">Institution</label>
      <input id="institutionName" ref={institutionVal}></input>
      <button className={classes.submitButton}>Add</button>
      {error && <p className={classes.error}>{errorText}</p>}
    </form>
  );
};

export default StudentForm;
