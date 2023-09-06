import classes from "./ExpenseListItem.module.css";
import { GlobalContext } from "../../store/GlobalStore";
import { useContext } from "react";

const ExpenseListItem = (props) => {
  const context = useContext(GlobalContext);
  function deleteExpenseFunc() {
    // trying to delete
    const deleteFunc = async function (e) {
      console.log(context.user[1]);
      if (context.user[1] !== null && context.user[1] !== "") {
        console.log("entering fetch function");
        let url = "https://utility-app-6923b-default-rtdb.firebaseio.com";
        const option = {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const result = await fetch(
            `${url}/${context.user[1]}/ExpenseData/${props.expenseid}.json`,
            option
          );
          if (!result.ok) {
            throw new Error("something went wrong");
          }
          context.updateExpense(props.expenseid);
          //notification popup
          context.NotificationUpdater();
          context.NotificationContentUpdater("Removed");
          //
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
    };
    const confirmation = window.confirm(
      `Are you sure to delete ${props.date
        .split("-")
        .reverse()
        .join("-")} expense ? `
    );

    if (confirmation) {
      deleteFunc();
    }
  }
  return (
    <details key={props.expenseid}>
      <summary>{props.date.split("-").reverse().join("-")}</summary>
      <p className={classes.expenseListSummary}>
        <span>{props.description.toUpperCase()}</span>
        <span
          className={props.amount < 0 ? classes.redTheme : classes.greenTheme}
        >
          {props.amount}
        </span>
      </p>
      <button className={classes.deleteButton} onClick={deleteExpenseFunc}>
        delete
      </button>
    </details>
  );
};

export default ExpenseListItem;
