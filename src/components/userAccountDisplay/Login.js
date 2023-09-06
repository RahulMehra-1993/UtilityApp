import { useCallback, useContext, useRef, useState } from "react";
import classes from "./Login.module.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GlobalContext } from "../../store/GlobalStore";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import { auth } from "../../auth/firebase";

const Login = () => {
  const context = useContext(GlobalContext);
  const emailref = useRef();
  const passwordref = useRef();
  const [error, changeError] = useState(null);
  const [emailVerificationText, changeEmailVerificationText] = useState(false);
  const [emailVerification, changeEmailVerification] = useState(false);
  const [isLoading, changeLoading] = useState(false);
  const [eye, changeEye] = useState(false);
  const [eyeDisplay, changeEyeDisplay] = useState(false);

  const loginHandler = useCallback(
    (e) => {
      e.preventDefault();
      //resetting
      changeError(null);
      localStorage.removeItem("user");
      changeEmailVerification(false);
      changeEmailVerificationText("");
      //loggingout or signing out current user if any for first time
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          changeError(error.message);
        });
      let email = emailref.current.value;
      let password = passwordref.current.value;
      // check
      if (email === "") {
        changeError("Email required");
        return;
      }

      if (password.length === 0) {
        changeError("Password missing");
        changeEyeDisplay(false);
        return;
      }
      //loader starts
      changeLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          if (user.emailVerified) {
            //date formate
            let date = new Date(user.metadata.creationTime);
            //custom date conversion
            let createdDate =
              date.getUTCDate() +
              "/" +
              (Number(date.getMonth()) + 1) +
              "/" +
              date.getFullYear();
            let localuser = {
              loggedIn: true,
              userName: user.displayName,
              userId: user.uid,
              userCreatedDate: createdDate,
            };
            //setting data in localStorage
            localStorage.setItem("user", JSON.stringify(localuser));
            //first Time global login handler
            context.loginHandler(true, user.displayName, user.uid, createdDate);
            //switch display
            setTimeout(() => {
              changeLoading(false);
              e.target.reset();
            }, 200);
            context.showUI();
            clearTimeout();
          } else {
            changeLoading(false);
            changeEmailVerification(true);
            changeEmailVerificationText("Email not verified");
            return;
          }
        })
        .catch((error) => {
          // changeError(error.message);
          //if internet is off
          context.contentType("fiveZeroThree");
          changeLoading(false);
          return;
        });
    },
    [context]
  );

  function inputCheck(e) {
    if (e.target.value === "") {
      changeError(null);
      changeEmailVerification(false);
      return;
    }
  }
  function passwordCheck(e) {
    if (e.target.value.length === 0) {
      changeError(null);
      changeEyeDisplay(false);
      return;
    }
    if (e.target.value.length > 2) {
      changeEyeDisplay(true);
      return;
    }
  }

  function eyeHandler() {
    changeEye((previous) => !previous);
  }

  function resetPasswordByEmail() {
    let email = emailref.current.value;
    if (email === "") {
      changeEmailVerification(true);
      changeEmailVerificationText("Email required");
      return;
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        changeEmailVerification(true);
        changeEmailVerificationText("Email sent to reset password");
      })
      .catch((error) => {
        changeEmailVerification(true);
        changeEmailVerificationText(error.message);
        // ..
      });
  }

  const formDetails = (
    <React.Fragment>
      <label htmlFor="name">Email</label>
      <input
        id="name"
        ref={emailref}
        autoCorrect="off"
        onChange={inputCheck}
        className={classes.inputs}
        autocorrect="off"
      />
      {emailVerification && (
        <p className={emailVerification ? classes.verification : undefined}>
          {emailVerificationText}
        </p>
      )}
      <label htmlFor="password">Password</label>
      <div className={classes.passwordBox}>
        <input
          id="password"
          type={!eye ? "password" : "text"}
          ref={passwordref}
          autoCorrect="off"
          onChange={passwordCheck}
          className={classes.inputs}
        />
        {eyeDisplay && (
          <div className={classes.eyeBox}>
            {eye ? (
              <span className={classes.openEye} onClick={eyeHandler}>
                <ion-icon name="eye-outline"></ion-icon>
              </span>
            ) : (
              <span className={classes.closeEye} onClick={eyeHandler}>
                <ion-icon name="eye-off-outline"></ion-icon>
              </span>
            )}
          </div>
        )}
      </div>
      {error && <p className={classes.error}>{error}</p>}
      <p onClick={resetPasswordByEmail} className={classes.forgetPassword}>
        Forget Password ?
      </p>
      <button className={classes.loginButton} onClick={loginHandler}>
        Login
      </button>
    </React.Fragment>
  );

  return (
    <div className={classes.loginBox}>
      <div className={classes.loginHeading}>Welcome Back</div>
      <div className={classes.sideLoginWallpaper}></div>
      <form className={classes.loginForm}>
        {isLoading ? (
          <div className={classes.skelton}>
            <SkeletonTheme
              baseColor="white"
              highlightColor="grey"
              borderRadius="1rem"
              height="5rem"
            >
              <p>
                <Skeleton count={2} />
              </p>
              <p>
                <Skeleton count={1} />
              </p>
            </SkeletonTheme>
          </div>
        ) : (
          formDetails
        )}
      </form>
    </div>
  );
};

export default Login;
