import { useContext } from "react";
import classes from "./Notification.module.css";
import { GlobalContext } from "../store/GlobalStore";

const Notification = (props) => {
  const context = useContext(GlobalContext);
  return (
    <section
      className={`${classes.notification} ${
        context.NotificationColor ? classes.removed : classes.added
      }`}
    >
      <div className={classes.notificationIcon}>
        <i class="ri-checkbox-circle-fill"></i>
      </div>
      <p>{props.children}</p>
    </section>
  );
};

export default Notification;
