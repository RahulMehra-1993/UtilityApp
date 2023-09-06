import { useContext, useEffect, useState } from "react";
import classes from "./ExpenseList.module.css";
import { GlobalContext } from "../../store/GlobalStore";
import ExpenseListItem from "./ExpenseListItem";
const ExpenseList = (props) => {
  const context = useContext(GlobalContext);
  const [data, changeData] = useState([]);
  const [currentDateValue, changecurrentDateValue] = useState("");
  function valueCheck(e) {
    changecurrentDateValue(e.target.value);
    if (e.target.value === "0") {
      context.ExpenseData && changeData(context.ExpenseData.reverse());
    } else {
      let filteredDateData = context.ExpenseData.filter((x) => {
        if (e.target.value.length < 2) {
          return x.Date.slice(5, 7) === 0 + e.target.value;
        } else {
          return x.Date.slice(5, 7) === e.target.value;
        }
      });
      changeData(filteredDateData.reverse());
    }
  }

  useEffect(() => {
    const currentDate = new Date().getMonth() + 1;
    changecurrentDateValue(currentDate);
    if (context.ExpenseData.length === 0) {
      return;
    }
    const triggerFunc = function () {
      let filteredDateData = context.ExpenseData.filter((x) => {
        if (currentDate.toString().length < 2) {
          return x.Date.slice(5, 7) === 0 + currentDate.toString();
        } else {
          return x.Date.slice(5, 7) === currentDate.toString();
        }
      });
      changeData(filteredDateData.reverse());
    };
    setTimeout(() => {
      triggerFunc();
    }, 1000);
    clearTimeout();
  }, [context.ExpenseData]);
  return (
    <div className={classes.expenseListBox}>
      <h1
        className={
          context.currentTheme ? classes.lightTheme : classes.darkTheme
        }
      >
        Expense details
      </h1>
      <select onChange={valueCheck} value={currentDateValue}>
        <option value={0}>All</option>
        <option value={1}>JANUARY</option>
        <option value={2}>FEBUARY</option>
        <option value={3}>MARCH</option>
        <option value={4}>APRIL</option>
        <option value={5}>MAY</option>
        <option value={6}>JUNE</option>
        <option value={7}>JULY</option>
        <option value={8}>AUGUST</option>
        <option value={9}>SEPTEMBER</option>
        <option value={10}>OCTUBER</option>
        <option value={11}>NOVEMBER</option>
        <option value={12}>DECEMBER</option>
      </select>
      <div className={classes.expenseList}>
        {data.map((x) => (
          <ExpenseListItem
            key={x.ExpenseId}
            expenseid={x.ExpenseId}
            date={x.Date}
            amount={x.Amount}
            description={x.Description}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
