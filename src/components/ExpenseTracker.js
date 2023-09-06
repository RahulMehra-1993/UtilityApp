import { useEffect, useRef, useState } from "react";
import classes from "./ExpenseTracker.module.css";
import { GlobalContext } from "../store/GlobalStore";
import { useContext } from "react";
import ExpenseList from "./expenses/ExpenseList";
import { evaluate } from "mathjs";

const ExpenseTracker = () => {
  const context = useContext(GlobalContext);
  const [onClick, changeOnclick] = useState(false);
  const [onClickAnimation, changeOnclickAnimation] = useState(false);
  const [error, errorState] = useState(false);
  const [errorText, errorTextstate] = useState(false);
  const [hide, changeHide] = useState(false);

  //inputs
  const typeRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  function showexpenseForm() {
    changeOnclick((previous) => !previous);
    changeOnclickAnimation((previous) => !previous);
    errorState(false);
  }
  function submitHandler(e) {
    e.preventDefault();
    let typeValue = typeRef.current.value;
    let amountValue = amountRef.current.value;
    let dateValue = dateRef.current.value;
    let descriptionValue = descriptionRef.current.value;

    const dataToSubmit = {
      Date: dateValue,
      Amount:
        typeValue.toLowerCase() === "credit" ? +amountValue : -amountValue,
      Description: descriptionValue,
    };
    //sending data to expensedata
    const fetchFunc = async function () {
      amountRef.current.classList.remove("error");
      dateRef.current.classList.remove("error");
      descriptionRef.current.classList.remove("error");

      if (context.user[1] !== null && context.user[1] !== "") {
        console.log(isNaN(amountValue));
        if (amountValue === "" || isNaN(amountValue)) {
          amountRef.current.classList.add("error");
          return;
        }
        if (dateValue === "") {
          dateRef.current.classList.add("error");
          return;
        }
        if (descriptionValue === "") {
          descriptionRef.current.classList.add("error");
          return;
        }

        if (
          typeValue !== "" &&
          amountValue !== "" &&
          dateValue !== "" &&
          descriptionValue !== ""
        ) {
          let url = "https://utility-app-6923b-default-rtdb.firebaseio.com";
          const data = dataToSubmit;
          const option = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
          try {
            const result = await fetch(
              `${url}/${context.user[1]}/ExpenseData.json`,
              option
            );
            const data = await result.json();
            //notification popup
            context.NotificationUpdater();
            //changing the state and uplifting id and task
            //
            context.fetchTask(context.login, context.user[1]);
            e.target.reset();
            changeOnclickAnimation((previous) => !previous);
            changeOnclick((previous) => !previous);
          } catch (error) {
            console.log(error.message);
          }
         
        }
      } else {
        errorState(true);
        errorTextstate("Login to use this premium feature ✨");
      }
    };
    fetchFunc();
  }
  //temp value setup for expense tracker details
  let income = [],
    expense = [],
    total,
    incomeTotal,
    expenseTotal;

  if (context.ExpenseData.length === 0) {
    incomeTotal = 0;
    expenseTotal = 0;
  } else {
    context.ExpenseData.forEach((x) => {
      if (x.Amount > 0) {
        income.unshift(x.Amount);
      } else if (x.Amount < 0) {
        expense.unshift(x.Amount);
      }
    });
  }
  let incomeResult = income.toString().split(",").join("+");
  let expenseResult = expense.toString().split(",").join("");
  incomeTotal = evaluate(incomeResult);
  expenseTotal = evaluate(expenseResult);
  if (expenseTotal === undefined) {
    total = incomeTotal;
  }
  if (incomeTotal === undefined) {
    total = expenseTotal;
  }
  if (incomeTotal === undefined && expenseTotal === undefined) {
    total = NaN;
  }
  if (incomeTotal !== undefined && expenseTotal !== undefined) {
    total = Number(incomeTotal) + Number(expenseTotal);
  }

  const formBox = (
    <form className={classes.expenseForm} onSubmit={submitHandler}>
      <label
        htmlFor="expenseType"
        className={onClickAnimation ? classes.input1 : undefined}
      >
        Expense Type
      </label>
      <select
        id="expenseType"
        ref={typeRef}
        className={onClickAnimation ? classes.input1 : undefined}
        defaultValue={0}
      >
        <option value={0} disabled>
          Expense type
        </option>
        <option>Credit</option>
        <option>Debit</option>
      </select>
      <label
        htmlFor="amountType"
        className={onClickAnimation ? classes.input2 : undefined}
      >
        Amount
      </label>
      <input
        id="amountType"
        ref={amountRef}
        className={onClickAnimation ? classes.input2 : undefined}
        autoComplete="off"
      />
      <label
        htmlFor="dateType"
        className={onClickAnimation ? classes.input3 : undefined}
      >
        Date
      </label>
      <input
        id="dateType"
        type="date"
        ref={dateRef}
        className={onClickAnimation ? classes.input3 : undefined}
        autoComplete="off"
      />
      <label
        htmlFor="description"
        className={onClickAnimation ? classes.input4 : undefined}
      >
        Description
      </label>
      <input
        id="description"
        ref={descriptionRef}
        className={onClickAnimation ? classes.input4 : undefined}
        autoComplete="off"
      ></input>
      <button>Add</button>
      {error && <p className={classes.error}>{errorText}</p>}
    </form>
  );

  function hideExpenseDetails() {
    changeHide((previous) => !previous);
  }

  const inAndOutDetails = (
    <div
      className={`${classes.inAndOutDetails} ${
        hide ? classes.hidden : undefined
      }`}
    >
      <div className={classes.details}>
        <h1>Total Balance</h1>
        {isNaN(total) ? "" : <p>{total}</p>}
      </div>

      <div className={classes.income}>
        <div className={classes.incomeTextAndIcon}>
          <p>Income</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={classes.upIcon}
          >
            <path d="M12 8L18 14H6L12 8Z" fill="rgba(100,205,138,1)"></path>
          </svg>
        </div>
        {income.length > 0 && (
          <p className={classes.greenTheme}>{incomeTotal}</p>
        )}
      </div>
      <div className={classes.expense}>
        <div className={classes.expenseTextAndIcon}>
          <p>Expense</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={classes.downIcon}
          >
            <path d="M12 16L6 10H18L12 16Z" fill="rgba(234,113,46,1)"></path>
          </svg>
        </div>
        {expense.length > 0 && (
          <p className={classes.redTheme}>{expenseTotal}</p>
        )}
      </div>

      <button
        className={classes.expenseDetailsButton}
        onClick={hideExpenseDetails}
      >
        ▼
      </button>
    </div>
  );

  function hideAccountDetails() {
    changeHide((previous) => !previous);
  }

  const expenseDetails = (
    <div
      className={`${classes.expenseDetails} ${
        !hide ? classes.hidden : undefined
      }`}
    >
      <button
        className={classes.accountDetailsButton}
        onClick={hideAccountDetails}
      >
        ▲
      </button>

      <ExpenseList data={context.ExpenseData} />
    </div>
  );

  return (
    <div
      className={`${classes.expenseBox} ${
        context.currentTheme ? classes.lightTheme : classes.darkTheme
      }`}
    >
      {/* {notification && <Notification />} */}
      <div className={classes.expenseDisplay}>
        {!onClick && inAndOutDetails}
        {!onClick && expenseDetails}
      </div>
      <div className={onClick ? classes.onClick : classes.expenseFormBox}>
        {onClick && formBox}
        <button className={classes.expenseFormButton} onClick={showexpenseForm}>
          <p className={onClickAnimation && classes.rotateAnimation}>+</p>
        </button>
      </div>
    </div>
  );
};

export default ExpenseTracker;
