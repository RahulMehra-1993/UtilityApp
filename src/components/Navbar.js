import classes from "./Navbar.module.css";
import { GlobalContext } from "../store/GlobalStore";
import { useContext } from "react";
import TaskCreater from "./TaskCreater";
import ToolMenu from "./ToolMenu";

import User from "./User";

const Navbar = () => {
  const context = useContext(GlobalContext);
  function closehandler(e) {
    context.showUI();
    context.contentType("contact");
  }
  function themechangerHandler() {
    context.darkTheme();
  }
  const theme = (
    <div
      className={`${classes.generalTheme} ${
        context.currentTheme ? classes.themeButtonMoon : classes.themeButtonSun
      }`}
      onClick={themechangerHandler}
    >
      {context.currentTheme ? (
        <ion-icon name="moon-outline"></ion-icon>
      ) : (
        <ion-icon name="sunny-outline"></ion-icon>
      )}
    </div>
  );

  return (
    <header>
      <div
        className={`${classes.outerBox} ${
          context.currentTheme ? classes.darkTheme : classes.lightTheme
        }`}
      >
        <div
          className={`${classes.userBox} ${
            !context.currentTheme
              ? classes.userBoxDarkBottom
              : classes.userBoxLightBottom
          }`}
        >
          <User />
        </div>
        <div className={classes.taskCreater}>
          <TaskCreater />
        </div>

        <div className={classes.options}>
          <ToolMenu />
          {theme}
          <div onClick={closehandler} className={classes.about}>
            <div>
              <span>
                <ion-icon name="book-outline"></ion-icon>
                <p>Contact</p>
              </span>

              <ion-icon
                className={classes.rightArrow}
                name="chevron-forward-outline"
              ></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
