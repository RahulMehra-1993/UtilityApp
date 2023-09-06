import { useEffect, useState } from "react";
import classes from "./Calculator.module.css";
import { evaluate } from "mathjs";
let finalValArray = [];

const Calculator = (props) => {
  //resetting

  useEffect(() => {
    finalValArray = [];
  }, []);

  const [initialInput, changeInput] = useState("");
  const [finalVal, changeFinalVal] = useState("");
  const [buttonUI0, changeUI0] = useState("");
  const [buttonUI1, changeUI1] = useState("");
  const [buttonUI2, changeUI2] = useState("");
  const [buttonUI3, changeUI3] = useState("");
  const [buttonUI4, changeUI4] = useState("");
  const [buttonUI5, changeUI5] = useState("");
  const [buttonUI6, changeUI6] = useState("");
  const [buttonUI7, changeUI7] = useState("");
  const [buttonUI8, changeUI8] = useState("");
  const [buttonUI9, changeUI9] = useState("");
  const [buttonUI10, changeUI10] = useState("");
  const [buttonUI11, changeUI11] = useState("");
  const [buttonUI12, changeUI12] = useState("");
  const [buttonUI13, changeUI13] = useState("");
  const [buttonUI14, changeUI14] = useState("");
  const [buttonUI15, changeUI15] = useState("");
  const [buttonUI16, changeUI16] = useState("");
  const [buttonUI17, changeUI17] = useState("");
  const [buttonUI18, changeUI18] = useState("");
  const [buttonUI19, changeUI19] = useState("");

  function leftBracket() {
    changeInput((previous) => previous + "(");
    finalValArray.push("(");
    changeUI0(classes.clickAnimation);
  }

  function rightBracket() {
    changeInput((previous) => previous + ")");
    finalValArray.push(")");
    changeUI1(classes.clickAnimation);
  }

  function percentage() {
    changeInput((previous) => previous + "%");
    changeFinalVal(initialInput / 100);
    finalValArray.push("%");
    changeUI2(classes.clickAnimation);
  }

  function close() {
    changeInput("");
    changeFinalVal("");
    finalValArray = [];

    changeUI3(classes.clickAnimation);
  }
  function seven() {
    changeInput((previous) => previous + 7);
    finalValArray.push(7);
    changeUI4(classes.clickAnimation);
  }
  function eight() {
    changeInput((previous) => previous + 8);
    finalValArray.push(8);
    changeUI5(classes.clickAnimation);
  }
  function nine() {
    changeInput((previous) => previous + 9);
    finalValArray.push(9);
    changeUI6(classes.clickAnimation);
  }
  function divide() {
    changeInput((previous) => previous + "÷");
    finalValArray.push("/");
    changeUI7(classes.clickAnimation);
  }
  function four() {
    changeInput((previous) => previous + 4);
    finalValArray.push(4);
    changeUI8(classes.clickAnimation);
  }
  function five() {
    changeInput((previous) => previous + 5);
    finalValArray.push(5);
    changeUI9(classes.clickAnimation);
  }
  function six() {
    changeInput((previous) => previous + 6);
    finalValArray.push(6);
    changeUI10(classes.clickAnimation);
  }
  function multiply() {
    changeInput((previous) => previous + "*");
    finalValArray.push("*");
    changeUI11(classes.clickAnimation);
  }
  function one() {
    changeInput((previous) => previous + 1);
    finalValArray.push(1);
    changeUI12(classes.clickAnimation);
  }
  function two() {
    changeInput((previous) => previous + 2);
    finalValArray.push(2);
    changeUI13(classes.clickAnimation);
  }
  function three() {
    changeInput((previous) => previous + 3);
    finalValArray.push(3);
    changeUI14(classes.clickAnimation);
  }
  function minus() {
    changeInput((previous) => previous + "-");
    finalValArray.push("-");
    changeUI15(classes.clickAnimation);
  }
  function zero() {
    changeInput((previous) => previous + 0);
    finalValArray.push(0);
    changeUI16(classes.clickAnimation);
  }
  function point() {
    changeInput((previous) => previous + ".");
    finalValArray.push(".");
    changeUI17(classes.clickAnimation);
  }
  function result() {
    changeInput();
    //calculating
    let arrToStrng = finalValArray.toString();
    let splittedVal = arrToStrng.split(",").join("");
    changeFinalVal(evaluate(splittedVal));
    //error handling
    changeInput("");
    changeUI18(classes.clickAnimation);
  }
  function plus() {
    changeInput((previous) => previous + "+");
    finalValArray.push("+");
    changeUI19(classes.clickAnimation);
  }

  //this is for ui change
  useEffect(() => {
    setTimeout(() => {
      changeUI0("");
      changeUI1("");
      changeUI2("");
      changeUI3("");
      changeUI4("");
      changeUI5("");
      changeUI6("");
      changeUI7("");
      changeUI8("");
      changeUI9("");
      changeUI10("");
      changeUI11("");
      changeUI12("");
      changeUI13("");
      changeUI14("");
      changeUI15("");
      changeUI16("");
      changeUI17("");
      changeUI18("");
      changeUI19("");
    }, 100);

    // setTimeout(() => {
    // }, 100);
  }, [initialInput, finalVal]);

  return (
    <section className={classes.calcContainer}>
      <div className={classes.input}>
        <input
          className={classes.expression}
          rows={2}
          value={initialInput}
          readOnly
        />
        <input
          className={classes.resultValue}
          rows={2}
          value={finalVal}
          readOnly
        />
      </div>
      <div className={classes.calcBox}>
        <div
          className={`${classes.highlighter} ${buttonUI0}`}
          onClick={leftBracket}
        >
          (
        </div>
        <div
          className={`${classes.highlighter} ${buttonUI1}`}
          onClick={rightBracket}
        >
          )
        </div>
        <div
          className={`${classes.highlighter} ${buttonUI2}`}
          onClick={percentage}
        >
          %
        </div>
        <div className={`${classes.highlighter} ${buttonUI19}`} onClick={plus}>
          +
        </div>
        <div onClick={seven} className={buttonUI4}>
          7
        </div>
        <div onClick={eight} className={buttonUI5}>
          8
        </div>
        <div onClick={nine} className={buttonUI6}>
          9
        </div>
        <div className={`${classes.highlighter} ${buttonUI7}`} onClick={divide}>
          ÷
        </div>
        <div onClick={four} className={buttonUI8}>
          4
        </div>
        <div onClick={five} className={buttonUI9}>
          5
        </div>
        <div onClick={six} className={buttonUI10}>
          6
        </div>
        <div
          className={`${classes.highlighter} ${buttonUI11}`}
          onClick={multiply}
        >
          *
        </div>
        <div onClick={one} className={buttonUI12}>
          1
        </div>
        <div onClick={two} className={buttonUI13}>
          2
        </div>
        <div onClick={three} className={buttonUI14}>
          3
        </div>
        <div className={`${classes.highlighter} ${buttonUI15}`} onClick={minus}>
          -
        </div>
        <div onClick={zero} className={buttonUI16}>
          0
        </div>
        <div className={`${classes.highlighter} ${buttonUI17}`} onClick={point}>
          .
        </div>
        <div className={`${classes.highlighter} ${buttonUI3}`} onClick={close}>
          CE
        </div>
        <div
          className={`${classes.highlighter} ${buttonUI18}`}
          onClick={result}
        >
          =
        </div>
      </div>
    </section>
  );
};

export default Calculator;
