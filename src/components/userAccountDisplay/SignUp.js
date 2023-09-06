import { useContext, useRef, useState } from "react";
import classes from "./SignUp.module.css";
import { auth } from "../../auth/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { GlobalContext } from "../../store/GlobalStore";
import Terms from "./Terms";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SignUp = (props) => {
  const context = useContext(GlobalContext);
  const [error, changeErrorState] = useState(false);
  const [buttonDisableState, changeButtonDisableState] = useState(false);
  const [errorText, changeErrorText] = useState("");
  const [success, changeSuccess] = useState(false);
  const [terms, changeterms] = useState(false);
  const [emailVerificationText, changeEmailVerificationText] = useState(false);
  const [emailVerification, changeEmailVerification] = useState(false);
  const [isLoading, changeLoading] = useState(false);
  const [eye, changeEye] = useState(false);
  const [eyeDisplay, changeEyeDisplay] = useState(false);
  // const [nameState, changeNameState] = useState();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  //submit handler/////////////////////////////////////////
  function signUpSubmitHandler(e) {
    e.preventDefault();
    //loader
    changeLoading(true);
    //initializtion
    changeSuccess(false);
    changeErrorState(false);
    changeErrorText("");
    changeEmailVerification(false);
    changeEmailVerificationText("");
    changeButtonDisableState(false);
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let confirmPassword = confirmPasswordRef.current.value;
    function redirectionalAndSuccess() {
      e.target.reset();
      changeSuccess(true);
      //triggering login after successfully submitting
      setTimeout(() => {
        props.onClickHandler();
      }, 2000);
      clearTimeout();
    }
    //applying condition at front end but its not a good methodology
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      //loader
      changeLoading(false);
      changeErrorState(true);
      changeErrorText("Please fill up all the inputs");
      return;
    } else {
      //name check
      let namePattern = /[^0-9]/;
      let nameCheck = namePattern.test(name);
      if (!nameCheck) {
        //loader
        changeLoading(false);
        changeErrorState((previous) => !previous);
        changeErrorText("Invalid Name");
        return;
      }
      //email check
      let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let emailCheck = emailPattern.test(email);
      if (!emailCheck) {
        //loader
        changeLoading(false);
        changeErrorState((previous) => !previous);
        changeErrorText("Invalid Email");
        return;
      }
      //password check
      let passwordPattern =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
      let passwordCheck = passwordPattern.test(password);
      if (!passwordCheck) {
        //loader
        changeLoading(false);
        changeErrorState(true);
        changeErrorText("minimum 6 character including special character ");
        return;
      }
      if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
        //loader
        changeLoading(false);
        changeErrorState(true);
        changeErrorText("Password not matching");
        return;
      }
      //signout existing user
      context.logoutHandler();
      //calling firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          changeButtonDisableState(true);
          console.log("button disabled");
          const userDetails = res.user;
          console.log(userDetails);
          if (userDetails) {
            await updateProfile(userDetails, {
              displayName: name,
            });
          }
          //sending  verification call to user
          sendEmailVerification(auth.currentUser).then((res) => {
            //loader
            changeLoading(false);
            //mail send message
            changeEmailVerification(true);
            changeEmailVerificationText("Verify Email before Login");
            redirectionalAndSuccess();
          });
          changeButtonDisableState(false);
        })
        .catch((error) => {
          //loader
          changeLoading(false);
          changeErrorState(true);
          changeErrorText(error.message);

          return;
        });
    }
  }
  function termsHandler() {
    changeterms(true);
  }

  function passwordCheck(e) {
    if (e.target.value.length === 0) {
      changeEyeDisplay(false);
    }
    if (e.target.value.length > 2) {
      changeEyeDisplay(true);
    }
  }

  function eyeHandler() {
    changeEye((previous) => !previous);
  }
  const formDetails = (
    <>
      <label htmlFor="userName">Name</label>
      <input
        name="userName"
        ref={nameRef}
        autoComplete="off"
        className={classes.inputs}
      />
      <label htmlFor="email">Email</label>
      <input
        name="email"
        ref={emailRef}
        autoComplete="off"
        className={classes.inputs}
      />
      <label htmlFor="password">Password</label>

      {/*  */}
      <div className={classes.passwordBox}>
        <input
          id="password"
          name="password"
          type={!eye ? "password" : "text"}
          ref={passwordRef}
          autoComplete="off"
          onChange={passwordCheck}
          className={classes.inputs}
        />
        {eyeDisplay && (
          <div className={classes.eyeBox}>
            {eye ? (
              <i className={classes.openEye} onClick={eyeHandler}>
                <ion-icon name="eye-outline"></ion-icon>
              </i>
            ) : (
              <i className={classes.closeEye} onClick={eyeHandler}>
                <ion-icon name="eye-off-outline"></ion-icon>
              </i>
            )}
          </div>
        )}
      </div>

      {/*  */}
      <label htmlFor="confirmPassowrd">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        ref={confirmPasswordRef}
        autoComplete="off"
        className={classes.inputs}
      />
      {emailVerification && (
        <p className={emailVerification ? classes.verification : undefined}>
          {emailVerificationText}
        </p>
      )}
      {error && (
        <p className={error ? classes.error : undefined}>{errorText}</p>
      )}
      <div className={classes.agreement}>
        <input type="checkbox" className={classes.checkBox} />
        <span onClick={termsHandler}>Terms and condition check</span>
      </div>
      <button
        type="submit"
        disabled={buttonDisableState}
        className={success ? classes.success : undefined}
      >
        {success ? undefined : "Sign Up"}
      </button>
    </>
  );

  return (
    <div className={classes.signupBox}>
      {!terms && (
        <>
          <div className={classes.signupBoxHeading}>Join us</div>

          <form className={classes.signupForm} onSubmit={signUpSubmitHandler}>
            {isLoading ? (
              <div className={classes.skelton}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="wheat"
                  borderRadius="1rem"
                  height="5rem"
                >
                  <p>
                    <Skeleton count={5} />
                  </p>
                </SkeletonTheme>
              </div>
            ) : (
              formDetails
            )}
          </form>
        </>
      )}

      {terms && (
        <Terms
          onClick={() => {
            changeterms(false);
          }}
        />
      )}

      <div className={!terms && classes.sidesignupWallpaper}></div>
    </div>
  );
};

export default SignUp;
