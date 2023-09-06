import { useContext, useEffect, useState } from "react";
import ProfessionalForm from "./ProfessionalForm";
import classes from "./ProfessionalPortal.module.css";
import PPCard from "./PPCard";
import { GlobalContext } from "../../store/GlobalStore";

const ProfessionalPortal = () => {
  const context = useContext(GlobalContext);
  const deleteItem = async function (idReceived) {
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
          `${url}/${context.user[1]}/Details/Professional/${idReceived}.json`,
          option
        );

        if (!result.ok) {
          throw new Error("something went wrong");
        }
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
    context.updateCareer(idReceived);
  };

  return (
    <div className={classes.professionalBox}>
      <div className={classes.cardBox}>
        <ul className={classes.listItems} id="listItems">
          <li id="0" className={classes.formItem}>
            <ProfessionalForm />
          </li>
          {context.CareerData.length > 0 &&
            context.CareerData.map((item) => {
              return (
                <PPCard
                  id={item.CareerId}
                  key={item.CareerId}
                  organization={item.Organization}
                  profile={item.Profile}
                  start={item.Start}
                  end={item.End}
                  experience={item.Experience}
                  current={item.Current}
                  deleteFunc={deleteItem}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default ProfessionalPortal;
