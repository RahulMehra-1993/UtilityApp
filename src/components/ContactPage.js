import classes from "./ContactPage.module.css";
import image from "../sources/dev.jpg";
import emailjs from "@emailjs/browser";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useRef } from "react";
import { auth } from "../auth/firebase";
import { GlobalContext } from "../store/GlobalStore";

const ContactPage = (props) => {
  const messageRef = useRef();
  const context = useContext(GlobalContext);
  function sendQuery(e) {
    e.preventDefault();
    if (context.user[1] === null || context.user[1] === "") {
      window.alert(" Login for query");
      return;
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const emailAddress = user.email;
        const username = user.displayName;
        const serviceId = process.env.REACT_APP_GMAILSERVICE_PUBLICKEY;
        const tempelateId = process.env.REACT_APP_GMAILSERVICE_TEMPLATEkEY;
        console.log(uid, emailAddress, messageRef.current.value);
        if (messageRef.current.value === "") {
          return;
        }
        let sendObj = {
          subject: `UT CustomerID - ${uid}`,
          message: messageRef.current.value,
          sendername: emailAddress,
          to: "1993rahulmehra1993@gmail.com",
          form: username,
        };

        //send to admin email
        emailjs.init("e-UYzcl7jNcwYIa4p");
        emailjs.send(serviceId, tempelateId, sendObj);
        e.target.reset();
        window.alert("👍 Successfully sent ");
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
  return (
    <section className={classes.sectionDescription}>
      <div className={classes.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fillOpacity="1"
            d="M0,192L40,181.3C80,171,160,149,240,160C320,171,400,213,480,224C560,235,640,213,720,181.3C800,149,880,107,960,112C1040,117,1120,171,1200,208C1280,245,1360,267,1400,277.3L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className={classes.waveTwo}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fillOpacity="1"
            d="M0,128L60,117.3C120,107,240,85,360,112C480,139,600,213,720,218.7C840,224,960,160,1080,117.3C1200,75,1320,53,1380,42.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className={classes.waveThree}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fillOpacity="1"
            d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,165.3C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className={classes.profileCard}>
        <img
          className={classes.developerImage}
          src={image}
          alt="developer"
        ></img>
        <div className={classes.details}>
          <p>Rahul Mehra</p>
          <p className={classes.developerProfile}>Web Developer</p>
          <p>
            <i class="ri-map-pin-2-fill"></i> Himachal Pradesh
          </p>
          <div className={classes.queryBox}>
            <form onSubmit={sendQuery}>
              <input
                className={classes.query}
                placeholder="Hire me or send query?"
                ref={messageRef}
              ></input>

              <button>
                <i class="ri-arrow-right-circle-line"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactPage;
