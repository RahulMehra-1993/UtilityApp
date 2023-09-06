import classes from "./Logo.module.css";
import logo from "../sources/logo-no-background.png";

const Logo = () => {
  return (
    <div className={classes.logo}>
      <img src={logo} alt="logo"></img>

      <p>
        <strong>Utility Tracker </strong>is a best app for all your daily needs.
        With this app, you can track your expenses, track your career goals,
        manage your tasks, and use a variety of tools, including a calculator,
        unit converter, weather app, and currency converter.
        <br></br>
        <strong>Firebase integration</strong> Utility Tracker uses Firebase for
        login and signout. This ensures that your data is secure and that only
        you can access it. Firebase also provides a variety of other features
        that can be used to improve the functionality of Utility Tracker, such
        as user authentication, real-time data synchronization, and push
        notifications.
        <br></br>
        <strong>How to use</strong> To use Utility Tracker, first create an
        account and sign in. Then, you can start using the features that you
        need. For example, you can start tracking your expenses by adding a new
        expense. You can also create educational as well as professional tracker
        and track your progress. And you can use the task Manager to keep track
        of your tasks. Benefits: Utility Tracker is a useful app that can help
        you manage your finances, track your career goals, and stay organized.
        It is also a secure app that uses Firebase for login and signout.
        <br></br>
        <strong>Pricing</strong> Utility Tracker is free to use.I hope this
        description is helpful. Let me know if you have any other questions by
        contacting me on my contact details inside this application.
      </p>
    </div>
  );
};

export default Logo;
