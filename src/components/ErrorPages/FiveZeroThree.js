import classes from "./FiveZeroThree.module.css";

const FiveZeroThree = () => {
  return (
    <div className={classes.errorContainer}>
      <p className={classes.errorCode}>
        <strong>503</strong> Error Code
      </p>
      <div className={classes.errorImage}></div>

      <p className={classes.referesh}>
        <strong>
          <i class="ri-restart-line"></i>
        </strong>{" "}
        Try again
      </p>
    </div>
  );
};
export default FiveZeroThree;
