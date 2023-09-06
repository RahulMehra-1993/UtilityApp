import { useRef, useState } from "react";
import classes from "./UnitsConverter.module.css";
import { useReducer } from "react";
import { evaluate } from "mathjs";

//data storage
const unitTypeReducer = (initialState, action) => {
  switch (action.val) {
    case "Area":
      return (
        <>
          <option>
            1 square-meter [m^2] = 0.000001 square-kilometer [km^2]
          </option>
          <option>
            1 square-kilometer [km^2] = 1000000 square-meter [m^2]
          </option>
          <option>
            1 square-centimeter [cm^2] = 0.0001 square-meter [m^2]
          </option>
          <option>
            1 square-millimeter [mm^2] = 1.0E-6 square-meter [m^2]
          </option>
          <option>
            1 square-micrometer [µm^2] = 1.0E-12 square-meter [m^2]
          </option>
          <option>1 hectare [ha] = 10000 square-meter [m^2]</option>
          <option>1 acre [ac] = 4046.8564224 square-meter [m^2]</option>
          <option>
            1 square-mile [mi^2] = 2589988.110336 square-meter [m^2]
          </option>
          <option>1 square-yard [yd^2] = 0.83612736 square-meter [m^2]</option>
          <option>1 square-foot [ft^2] = 0.09290304 square-meter [m^2]</option>
          <option>1 square-inch [in^2] = 0.00064516 square-meter [m^2]</option>
          <option>1 square-hectometer [hm^2] = 10000 square-meter [m^2]</option>
          <option>1 square-dekameter [dam^2] = 100 square-meter [m^2]</option>
          <option>1 square-decimeter [dm^2] = 0.01 square-meter [m^2]</option>
          <option>
            1 square-nanometer [nm^2] = 1.0E-18 square-meter [m^2]
          </option>
          <option>1 are [a] = 100 square-meter [m^2]</option>
          <option>1 barn [b] = 1.0E-28 square-meter [m^2]</option>
        </>
      );
    case "Length":
      return (
        <>
          <option>1 kilometer [km] = 1000 meter [m]</option>
          <option>1 decimeter [dm] = 0.1 meter [m]</option>
          <option>1 centimeter [cm] = 0.01 meter [m]</option>
          <option>1 millimeter [mm] = 0.001 meter [m]</option>
          <option>1 micrometer [µm] = 1.0E-6 meter [m]</option>
          <option>1 nanometer [nm] = 1.0E-9 meter [m]</option>
          <option>1 mile [mi(Int)] = 1609.344 meter [m]</option>
          <option>1 yard [yd] = 0.9144 meter [m]</option>
          <option>1 foot [ft] = 0.3048 meter [m]</option>
          <option>1 inch [in] = 0.0254 meter [m]</option>
          <option>1 light-year [ly] = 9.5E+15 meter [m]</option>
          <option>1 exameter [Em] = 1.0E+18 meter [m]</option>
          <option>1 petameter [Pm] = 1.0E+15 meter [m]</option>
          <option>1 terameter [Tm] = 1000000000000 meter [m]</option>
          <option>1 gigameter [Gm] = 1000000000 meter [m]</option>
          <option>1 megameter [Mm] = 1000000 meter [m]</option>
          <option>1 hectometer [hm] = 100 meter [m]</option>
          <option>1 dekameter [dam] = 10 meter [m]</option>
          <option>1 micron [µ] = 1.0E-6 meter [m]</option>
          <option>1 picometer [pm] = 1.0E-12 meter [m]</option>
          <option>1 femtometer [fm] = 1.0E-15 meter [m]</option>
          <option>1 attometer [am] = 1.0E-18 meter [m]</option>
          <option>1 megaparsec [Mpc] = 3.08567758128E+22 meter [m]</option>
          <option>1 kiloparsec [kpc] = 3.08567758128E+19 meter [m]</option>
          <option>1 parsec [pc] = 3.08567758128E+16 meter [m]</option>
          <option>1 astronomical-unit [AU-UA] = 149597870691 meter [m]</option>
        </>
      );
    case "Weight":
      return (
        <>
          <option>1 kilogram [kg] = 1000 gram [g]</option>
          <option>1 gram [g] = 0.001 kilogram [kg]</option>
          <option>1 milligram [mg] = 1.0E-6 kilogram [kg]</option>
          <option>1 ton (metric) [t] = 1000 kilogram [kg]</option>
          <option>1 pound [lbs] = 0.45359237 kilogram [kg]</option>
          <option>1 ounce [oz] = 0.0283495231 kilogram [kg]</option>
          <option>1 carat [car-ct] = 0.0002 kilogram [kg]</option>
          <option>1 ton(short) [ton (US)] = 907.18474 kilogram [kg]</option>
          <option>1 ton(long) [ton (UK)] = 1016.0469088 kilogram [kg]</option>
          <option>1 Atomic-mass-unit [u] = 1.6605402E-27 kilogram [kg]</option>
          <option>1 exagram [Eg] = 1.0E+15 kilogram [kg]</option>
          <option>1 petagram [Pg] = 1000000000000 kilogram [kg]</option>
          <option>1 teragram [Tg] = 1000000000 kilogram [kg]</option>
          <option>1 gigagram [Gg] = 1000000 kilogram [kg]</option>
          <option>1 megagram [Mg] = 1000 kilogram [kg]</option>
          <option>1 hectogram [hg] = 0.1 kilogram [kg]</option>
          <option>1 dekagram [dag] = 0.01 kilogram [kg]</option>
          <option>1 decigram [dg] = 0.0001 kilogram [kg]</option>
          <option>1 centigram [cg] = 1.0E-5 kilogram [kg]</option>
          <option>1 microgram [µg] = 1.0E-9 kilogram [kg]</option>
          <option>1 nanogram [ng] = 1.0E-12 kilogram [kg]</option>
          <option>1 picogram [pg] = 1.0E-15 kilogram [kg]</option>
          <option>1 femtogram [fg] = 1.0E-18 kilogram [kg]</option>
          <option>1 attogram [ag] = 1.0E-21 kilogram [kg]</option>
          <option>1 dalton [da]= 1.6605300000013E-27 kilogram [kg]</option>
        </>
      );
    case "Volume":
      return (
        <>
          <option>
            1 cubic-kilometer [km^3] = 1000000000 cubic-meter [m^3]
          </option>
          <option>1 cubic-centimeter [cm^3] = 1.0E-6 cubic-meter [m^3]</option>
          <option>1 cubic-millimeter [mm^3] = 1.0E-9 cubic-meter [m^3]</option>
          <option>1 liter [L,l] = 0.001 cubic-meter [m^3]</option>
          <option>1 milliliter [mL] = 1.0E-6 cubic-meter [m^3]</option>
          <option>
            1 gallon(US) [gal(US)] = 0.0037854118 cubic-meter [m^3]
          </option>
          <option>1 quart(US) [qt(US)] = 0.0009463529 cubic-meter [m^3]</option>
          <option>1 pint(US) [pt(US)] = 0.0004731765 cubic-meter [m^3]</option>
          <option>
            1 cubic-mile [mi^3] = 4168181825.4406 cubic-meter [m^3]
          </option>
          <option>1 cubic-yard [yd^3] = 0.764554858 cubic-meter [m^3]</option>
          <option>1 cubic-foot [ft^3] = 0.0283168466 cubic-meter [m^3]</option>
          <option>1 cubic-inch [in^3] = 1.63871E-5 cubic-meter [m^3]</option>
          <option>1 cubic-decimeter [dm^3] = 0.001 cubic-meter [m^3]</option>
          <option>1 exaliter [EL] = 1.0E+15 cubic-meter [m^3]</option>
          <option>1 petaliter [PL] = 1000000000000 cubic-meter [m^3]</option>
          <option>1 teraliter [TL] = 1000000000 cubic-meter [m^3]</option>
          <option>1 gigaliter [GL] = 1000000 cubic-meter [m^3]</option>
          <option>1 megaliter [ML] = 1000 cubic-meter [m^3]</option>
          <option>1 kiloliter [kL] = 1 cubic-meter [m^3]</option>
          <option>1 hectoliter [hL] = 0.1 cubic-meter [m^3]</option>
          <option>1 dekaliter [daL] = 0.01 cubic-meter [m^3]</option>
          <option>1 deciliter [dL] = 0.0001 cubic-meter [m^3]</option>
          <option>1 centiliter [cL] = 1.0E-5 cubic-meter [m^3]</option>
          <option>1 microliter [µL] = 1.0E-9 cubic-meter [m^3]</option>
          <option>1 nanoliter [nL] = 1.0E-12 cubic-meter [m^3]</option>
          <option>1 picoliter [pL] = 1.0E-15 cubic-meter [m^3]</option>
          <option>1 femtoliter [fL] = 1.0E-18 cubic-meter [m^3]</option>
          <option>1 attoliter [aL] = 1.0E-21 cubic-meter [m^3]</option>
          <option>1 cc [cc, cm^3] = 1.0E-6 cubic-meter [m^3]</option>
          <option>1 drop = 5.0E-8 cubic-meter [m^3]</option>
          <option>
            1 barrel (oil) [bbl-(oil)] = 0.1589872949 cubic-meter [m^3]
          </option>
        </>
      );

    case "Data Storage":
      return (
        <>
          <option>1 nibble [nibble] = 4 bit [b]</option>
          <option>1 byte [B] = 8 bit [b]</option>
          <option>1 character [character] = 8 bit [b]</option>
          <option>1 word [word] = 16 bit [b]</option>
          <option>1 MAPM-word [MAPM-word] = 32 bit [b]</option>
          <option>1 quadruple-word [quadruple-word] = 64 bit [b]</option>
          <option>1 block [block] = 4096 bit [b]</option>
          <option>1 kilobit [kb] = 1024 bit [b]</option>
          <option>1 kilobyte [kB] = 8192 bit [b]</option>
          <option>1 kilobyte (Kb) = 8000 bit [b]</option>
          <option>1 megabit [Mb] = 1048576 bit [b]</option>
          <option>1 megabyte [MB] = 8388608 bit [b]</option>
          <option>1 gigabit [Gb] = 1073741824 bit [b]</option>
          <option>1 gigabyte [GB] = 8589934592 bit [b]</option>
          <option>1 terabit [Tb] = 1099511627776 bit [b]</option>
          <option>1 terabyte [TB] = 8796093022208 bit [b]</option>
          <option>1 petabit [Pb] = 1.1258999068426E+15 bit [b]</option>
          <option>1 exabit [Eb] = 1.1529215046068E+18 bit [b]</option>
          <option>1 exabyte (10^18 bytes) = 8.0E+18 bit [b]</option>
        </>
      );
    default:
      return <option>Type not selected</option>;
  }
};

let fromValString,
  toValString,
  temporaryString,
  calStringleft,
  calStringRight,
  evaluation;

const UnitsConverter = () => {
  const unitType = useRef();
  const selectedVal = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const [toRefVal, changetoRefVal] = useState("");
  const [fromRefVal, changefromRefVal] = useState("");
  const [unitState, dispatch] = useReducer(unitTypeReducer, "");
  const [fromUnit, changfromUnit] = useState("");
  const [toUnit, changtoUnit] = useState("");

  function displayHandler() {
    dispatch({ val: unitType.current.value });
    //initializing all input values after dispatch
    fromRef.current.value = "";
    toRef.current.value = "";
    changefromRefVal("");
    changetoRefVal("");
  }
  function SelectedHandler() {
    //initializing all input values
    fromRef.current.value = "";
    toRef.current.value = "";
    changefromRefVal("");
    changetoRefVal("");
    //change
    changfromUnit(selectedVal.current.value);
    //getting the string for evaluation
    temporaryString = [...selectedVal.current.value.split(" ")];
    console.log(temporaryString);
    fromValString = temporaryString[2];
    toValString = temporaryString[6];
    //changing the state
    changfromUnit(fromValString);
    changtoUnit(toValString);
  }

  function fromHandler() {
    if (
      //checking for null values
      temporaryString.length === 0 ||
      fromRef.current.value === null ||
      fromRef.current.value === undefined ||
      fromRef.current.value === ""
    ) {
      changefromRefVal("");
      changetoRefVal("");
      return;
    } else {
      if (temporaryString[4].toLowerCase().includes("e")) {
        calStringleft = `${fromRef.current.value} * ${temporaryString[4]}`;
        changefromRefVal(calStringleft);
        changetoRefVal(fromRef.current.value);
      } else {
        calStringleft = `${temporaryString[4]}*${fromRef.current.value}`;
        evaluation = evaluate(calStringleft);
        changefromRefVal(evaluation);
        changetoRefVal(fromRef.current.value);
      }
    }
  }
  function toHandler() {
    if (
      temporaryString.length === 0 ||
      toRef.current.value === null ||
      toRef.current.value === undefined ||
      toRef.current.value === ""
    ) {
      changetoRefVal("");
      changefromRefVal("");
      return;
    } else {
      if (temporaryString[4].toLowerCase().includes("e")) {
        calStringRight = ` ${temporaryString[0]}/${toRef.current.value}*${temporaryString[4]} `;
        changetoRefVal(calStringRight);
        changefromRefVal(toRef.current.value);
      } else {
        calStringRight = `(${toRef.current.value}*${temporaryString[0]})/${temporaryString[4]}`;
        evaluation = evaluate(calStringRight);
        changetoRefVal(evaluation);
        changefromRefVal(toRef.current.value);
      }
    }
  }

  return (
    <section className={classes.unitsConverterBox}>
      <div className={classes.typeOfUnits}>
        <select onChange={displayHandler} ref={unitType}>
          <option>--Select Type--</option>
          <option>Length</option>
          <option>Area</option>
          <option>Weight</option>
          <option>Volume</option>
          <option>Data Storage</option>
        </select>
      </div>
      <div className={classes.insideConverterBox}>
        <select onChange={SelectedHandler} ref={selectedVal}>
          <option>--Select Conversion--</option>
          {unitState}
        </select>
      </div>
      <div className={classes.displayConverterBox}>
        <input
          type="text"
          value={toRefVal}
          ref={fromRef}
          onChange={fromHandler}
          maxLength="5"
          // readOnly
        />
        <input type="text" value={fromUnit ? fromUnit : ""} readOnly />
        <div className={classes.icon}>
          <ion-icon name="swap-horizontal-outline"></ion-icon>
        </div>
        <input
          type="text"
          // value={}
          value={fromRefVal}
          ref={toRef}
          onChange={toHandler}
          maxLength="5"
          // readOnly
        />
        <input type="text" value={toUnit ? toUnit : ""} readOnly />
      </div>
    </section>
  );
};
export default UnitsConverter;
