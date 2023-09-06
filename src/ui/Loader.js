import classes from "./Loader.module.css";

const Loader = (props) => {
  return (
    <div className={classes.loader}>
      {/* <div className={classes.loderIcon}>
        <i class="ri-loader-4-line"></i>
      </div> */}
      <div className={classes.customLoader}></div>
      {props.children}
    </div>
  );
};

export default Loader;
