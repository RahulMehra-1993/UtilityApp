import { useContext } from "react";
import classes from "./Modal.module.css";
import { GlobalContext } from "../store/GlobalStore";
const Modal = (props) => {
  const context = useContext(GlobalContext);
  function closeModal() {
    context.showUI();
  }

  return (
    <>
      <div className={classes.backDrop} />
      <div className={classes.card}>
        <div className={classes.wrapper}>{props.children}</div>
        <button className={classes.buttonClose} onClick={closeModal}>
          <span className={classes.largeDevices}>Close</span>
          <span className={classes.smallDevices}>
            <i class="ri-arrow-left-s-line"></i>
          </span>
        </button>
      </div>
    </>
  );
};

export default Modal;
