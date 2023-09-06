import classes from "./ToolMenu.module.css";
import { GlobalContext } from "../store/GlobalStore";
import { useContext } from "react";

const ToolMenu = () => {
  const context = useContext(GlobalContext);
  function showCalculator() {
    context.contentType("calculator");
    context.showUI();
  }
  function showUC() {
    context.contentType("unitconverter");
    context.showUI();
  }
  function showCC() {
    context.contentType("currencyconverter");
    context.showUI();
  }
  function showWeather() {
    context.contentType("weather");
    context.showUI();
  }
  return (
    <div
      className={` ${classes.sectionToolMenu} ${
        context.currentTheme ? classes.darkTheme : classes.lightTheme
      }`}
    >
      <div className={classes.calculator} onClick={showCalculator}>
        <ion-icon name="calculator-outline"></ion-icon>
        <p>Calculator</p>
      </div>
      <div className={classes.currencyConverter} onClick={showCC}>
        <ion-icon name="cash-outline"></ion-icon>
        <p>Currency Converter</p>
      </div>
      <div className={classes.unitConverter} onClick={showUC}>
        <ion-icon name="repeat-outline"></ion-icon>
        <p>Units Converter</p>
      </div>
      <div className={classes.weather} onClick={showWeather}>
        <ion-icon name="rainy-outline"></ion-icon>
        <p>Weather</p>
      </div>
    </div>
  );
};

export default ToolMenu;
