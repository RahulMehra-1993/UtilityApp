import { useContext, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import classes from "./LoginForm.module.css";
import { GlobalContext } from "../../store/GlobalStore";

const LoginForm = () => {
  const [loginState, changeLoginState] = useState(true);
  const [signupState, changeSignup] = useState(false);

  function loginHandler() {
    changeLoginState((previous) => !previous);
    if (signupState) {
      changeSignup(false);
    }
  }

  function signHandler() {
    changeSignup((previous) => !previous);
    if (loginState) {
      changeLoginState(false);
    }
  }

  return (
    <div className={classes.loginForm}>
      {loginState && <Login />}
      {signupState && <SignUp onClickHandler={loginHandler} />}
      <div className={classes.loginOptions}>
        {!loginState && (
          <u className={classes.loginButton} onClick={loginHandler}>
            Login →
          </u>
        )}
        {!signupState && (
          <u className={classes.signUpButton} onClick={signHandler}>
            Join Us →
          </u>
        )}
      </div>
      <div className={classes.backgroundAnimation}></div>
    </div>
  );
};
export default LoginForm;
