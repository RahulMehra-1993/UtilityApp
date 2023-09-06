import { useContext } from "react";
import classes from "./User.module.css";
import { GlobalContext } from "../store/GlobalStore";

const User = () => {
  const context = useContext(GlobalContext);
  function showUserDetails() {
    context.contentType("user");
    context.showUI();
  }

  return (
    <div
      className={`${classes.userBox} ${
        context.login ? classes.backgroundGif : undefined
      }`}
    >
      <div className={classes.userImage} onClick={showUserDetails}>
        {context.user[3] ? (
          <img src={context.user[3]} alt="user" loading="lazy" />
        ) : (
          <ion-icon name="person-add-outline"></ion-icon>
        )}
      </div>
      <div className={classes.userDetails}>
        {context.login ? <p>{context.user[0].toUpperCase()}</p> : undefined}
      </div>
    </div>
  );
};

export default User;
