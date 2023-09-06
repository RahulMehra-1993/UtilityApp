import { useRef, useState } from "react";
import classes from "./CurrencyConverter.module.css";

//data -open source API Currency

const currencies = {
  AED: "United Arab Emirates Dirham",
  AFN: "Afghan Afghani",
  ALL: "Albanian Lek",
  AMD: "Armenian Dram",
  ANG: "Netherlands Antillean Gulden",
  AOA: "Angolan Kwanza",
  ARS: "Argentine Peso",
  AUD: "Australian Dollar",
  AWG: "Aruban Florin",
  AZN: "Azerbaijani Manat",
  BAM: "Bosnia and Herzegovina Convertible Mark",
  BBD: "Barbadian Dollar",
  BDT: "Bangladeshi Taka",
  BGN: "Bulgarian Lev",
  BHD: "Bahraini Dinar",
  BIF: "Burundian Franc",
  BMD: "Bermudian Dollar",
  BND: "Brunei Dollar",
  BOB: "Bolivian Boliviano",
  BRL: "Brazilian Real",
  BSD: "Bahamian Dollar",
  BTN: "Bhutanese Ngultrum",
  BWP: "Botswana Pula",
  BYN: "Belarusian Ruble",
  BYR: "Belarusian Ruble",
  BZD: "Belize Dollar",
  CAD: "Canadian Dollar",
  CDF: "Congolese Franc",
  CHF: "Swiss Franc",
  CLF: "Unidad de Fomento",
  CLP: "Chilean Peso",
  CNH: "Chinese Renminbi Yuan Offshore",
  CNY: "Chinese Renminbi Yuan",
  COP: "Colombian Peso",
  CRC: "Costa Rican Colón",
  CUC: "Cuban Convertible Peso",
  CVE: "Cape Verdean Escudo",
  CZK: "Czech Koruna",
  DJF: "Djiboutian Franc",
  DKK: "Danish Krone",
  DOP: "Dominican Peso",
  DZD: "Algerian Dinar",
  EEK: "Estonian Kroon",
  EGP: "Egyptian Pound",
  ERN: "Eritrean Nakfa",
  ETB: "Ethiopian Birr",
  EUR: "Euro",
  FJD: "Fijian Dollar",
  FKP: "Falkland Pound",
  GBP: "British Pound",
  GEL: "Georgian Lari",
  GGP: "Guernsey Pound",
  GHS: "Ghanaian Cedi",
  GIP: "Gibraltar Pound",
  GMD: "Gambian Dalasi",
  GNF: "Guinean Franc",
  GTQ: "Guatemalan Quetzal",
  GYD: "Guyanese Dollar",
  HKD: "Hong Kong Dollar",
  HNL: "Honduran Lempira",
  HRK: "Croatian Kuna",
  HTG: "Haitian Gourde",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  IMP: "Isle of Man Pound",
  INR: "Indian Rupee",
  IQD: "Iraqi Dinar",
  ISK: "Icelandic Króna",
  JEP: "Jersey Pound",
  JMD: "Jamaican Dollar",
  JOD: "Jordanian Dinar",
  JPY: "Japanese Yen",
  KES: "Kenyan Shilling",
  KGS: "Kyrgyzstani Som",
  KHR: "Cambodian Riel",
  KMF: "Comorian Franc",
  KRW: "South Korean Won",
  KWD: "Kuwaiti Dinar",
  KYD: "Cayman Islands Dollar",
  KZT: "Kazakhstani Tenge",
  LAK: "Lao Kip",
  LBP: "Lebanese Pound",
  LKR: "Sri Lankan Rupee",
  LRD: "Liberian Dollar",
  LSL: "Lesotho Loti",
  LTL: "Lithuanian Litas",
  LVL: "Latvian Lats",
  LYD: "Libyan Dinar",
  MAD: "Moroccan Dirham",
  MDL: "Moldovan Leu",
  MGA: "Malagasy Ariary",
  MKD: "Macedonian Denar",
  MMK: "Myanmar Kyat",
  MNT: "Mongolian Tögrög",
  MOP: "Macanese Pataca",
  MRO: "Mauritanian Ouguiya",
  MTL: "Maltese Lira",
  MUR: "Mauritian Rupee",
  MVR: "Maldivian Rufiyaa",
  MWK: "Malawian Kwacha",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  MZN: "Mozambican Metical",
  NAD: "Namibian Dollar",
  NGN: "Nigerian Naira",
  NIO: "Nicaraguan Córdoba",
  NOK: "Norwegian Krone",
  NPR: "Nepalese Rupee",
  NZD: "New Zealand Dollar",
  OMR: "Omani Rial",
  PAB: "Panamanian Balboa",
  PEN: "Peruvian Sol",
  PGK: "Papua New Guinean Kina",
  PHP: "Philippine Peso",
  PKR: "Pakistani Rupee",
  PLN: "Polish Złoty",
  PYG: "Paraguayan Guaraní",
  QAR: "Qatari Riyal",
  RON: "Romanian Leu",
  RSD: "Serbian Dinar",
  RUB: "Russian Ruble",
  RWF: "Rwandan Franc",
  SAR: "Saudi Riyal",
  SBD: "Solomon Islands Dollar",
  SCR: "Seychellois Rupee",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  SHP: "Saint Helenian Pound",
  SLL: "Sierra Leonean Leone",
  SOS: "Somali Shilling",
  SRD: "Surinamese Dollar",
  SSP: "South Sudanese Pound",
  STD: "São Tomé and Príncipe Dobra",
  SVC: "Salvadoran Colón",
  SZL: "Swazi Lilangeni",
  THB: "Thai Baht",
  TJS: "Tajikistani Somoni",
  TMT: "Turkmenistani Manat",
  TND: "Tunisian Dinar",
  TOP: "Tongan Paʻanga",
  TRY: "Turkish Lira",
  TTD: "Trinidad and Tobago Dollar",
  TWD: "New Taiwan Dollar",
  TZS: "Tanzanian Shilling",
  UAH: "Ukrainian Hryvnia",
  UGX: "Ugandan Shilling",
  USD: "US Dollar",
  UYU: "Uruguayan Peso",
  UZS: "Uzbekistan Som",
  VEF: "Venezuelan Bolívar",
  VES: "Venezuelan Bolívar Soberano",
  VND: "Vietnamese Đồng",
  VUV: "Vanuatu Vatu",
  WST: "Samoan Tala",
  XAF: "Central African Cfa Franc",
  XAG: "Silver (Troy Ounce)",
  XAU: "Gold (Troy Ounce)",
  XCD: "East Caribbean Dollar",
  XDR: "Special Drawing Rights",
  XOF: "West African Cfa Franc",
  XPD: "Palladium",
  XPF: "Cfp Franc",
  XPT: "Platinum",
  YER: "Yemeni Rial",
  ZAR: "South African Rand",
  ZMK: "Zambian Kwacha",
  ZMW: "Zambian Kwacha",
  ZWL: "Zimbabwean Dollar",
  ATOM: "Cosmos",
  BAT: "Basic Attention Token",
  BCH: "Bitcoin Cash",
  BSV: "Bitcoin SV",
  BTC: "Bitcoin",
  DAI: "DAI",
  DASH: "DASH",
  EOS: "EOS",
  ETC: "Ethereum Classic",
  ETH: "Ethereum",
  KNC: "Kyber Network",
  LINK: "Chainlink",
  LTC: "Litecoin",
  OMG: "OMG Network",
  OXT: "Orchid Token",
  REP: "Augur",
  USDC: "USD Coin",
  XLM: "Stellar",
  XRP: "XRP",
  XTZ: "Tezos",
  ZEC: "Zcash",
  ZRX: "0x",
};

const latestRates_Base_USD = {
  AED: 3.6732,
  AFN: 77.199999,
  ALL: 110.75,
  AMD: 481.616228,
  ANG: 1.794399,
  AOA: 578.733,
  ARS: 70.158428,
  ATOM: 0.380446,
  AUD: 1.457004,
  AWG: 1.8,
  AZN: 1.7025,
  BAM: 1.741534,
  BAT: 3.657337,
  BBD: 2,
  BCH: 0.004358,
  BDT: 84.861663,
  BGN: 1.74189,
  BHD: 0.377589,
  BIF: 1911,
  BMD: 1,
  BND: 1.390001,
  BOB: 6.912693,
  BRL: 5.479,
  BSD: 1,
  BSV: 0.005868,
  BTC: 0.000109,
  BTN: 75.57276,
  BWP: 11.746939,
  BYN: 2.386091,
  BYR: 23860.91,
  BZD: 2.015048,
  CAD: 1.3687,
  CDF: 1896,
  CHF: 0.947883,
  CLF: 0.029635,
  CLP: 821.500251,
  CNH: 7.0893,
  CNY: 7.0784,
  COMP: 0.003957,
  COP: 3734.870789,
  CRC: 578.807943,
  CUC: 1,
  CVE: 98.45,
  CZK: 23.846999,
  DAI: 0.99725,
  DASH: 0.014165,
  DJF: 178.025,
  DKK: 6.642885,
  DOP: 58.55,
  DZD: 129.220304,
  EEK: 14.613691,
  EGP: 16.161454,
  EOS: 0.405856,
  ERN: 15.003107,
  ETB: 34.4,
  ETC: 0.167117,
  ETH: 0.004352,
  EUR: 0.89346,
  FJD: 2.177,
  FKP: 0.810471,
  GBP: 0.813649,
  GEL: 3.06,
  GGP: 0.810471,
  GHS: 5.785,
  GIP: 0.810471,
  GMD: 51.65,
  GNF: 9596,
  GTQ: 7.697431,
  GYD: 208.833081,
  HKD: 7.750395,
  HNL: 24.83,
  HRK: 6.737054,
  HTG: 109.07618,
  HUF: 316.73,
  IDR: 14351.45,
  ILS: 3.43025,
  IMP: 0.810471,
  INR: 82.56,
  IQD: 1190,
  ISK: 138.49,
  JEP: 0.810471,
  JMD: 139.338378,
  JOD: 0.7096,
  JPY: 107.18,
  KES: 106.506939,
  KGS: 75.155705,
  KHR: 4065,
  KMF: 438.65032,
  KNC: 0.872479,
  KRW: 1203.725,
  KWD: 0.307928,
  KYD: 0.833088,
  KZT: 402.324298,
  LAK: 9041,
  LBP: 1519.873261,
  LINK: 0.214791,
  LKR: 186.121225,
  LRD: 199.250033,
  LSL: 17.29,
  LTC: 0.023361,
  LTL: 3.224845,
  LVL: 0.656261,
  LYD: 1.4,
  MAD: 9.7125,
  MDL: 17.166001,
  MGA: 3850,
  MKD: 54.917411,
  MKR: 0.002159,
  MMK: 1386.41296,
  MNT: 2821.996225,
  MOP: 7.979646,
  MRO: 357,
  MTL: 0.683738,
  MUR: 40.253681,
  MVR: 15.4,
  MWK: 737.5,
  MXN: 23.05665,
  MYR: 4.2725,
  MZN: 70.00001,
  NAD: 17.29,
  NGN: 387.5,
  NIO: 34.47,
  NOK: 9.722507,
  NPR: 120.905486,
  NZD: 1.556299,
  OMG: 0.688564,
  OMR: 0.385005,
  OXT: 6.103143,
  PAB: 1,
  PEN: 3.5295,
  PGK: 3.445,
  PHP: 49.989079,
  PKR: 286.73,
  PLN: 3.98305,
  PYG: 6755.334042,
  QAR: 3.641,
  REP: 0.056192,
  RON: 4.3164,
  RSD: 104.805,
  RUB: 69.7795,
  RWF: 952.5,
  SAR: 3.7519,
  SBD: 8.339486,
  SCR: 17.601989,
  SEK: 9.33465,
  SGD: 1.3933,
  SHP: 0.810471,
  SLL: 9725.001526,
  SOS: 583,
  SRD: 7.458,
  SSP: 130.26,
  STD: 22000.619692,
  SVC: 8.747607,
  SZL: 17.24,
  THB: 30.891287,
  TJS: 10.304083,
  TMT: 3.5,
  TND: 2.8525,
  TOP: 2.28605,
  TRY: 6.854,
  TTD: 6.75945,
  TWD: 29.5365,
  TZS: 2314,
  UAH: 26.682161,
  UGX: 3730.730852,
  USDC: 1.000491,
  USD: 1.0,
  UYU: 42.08474,
  UZS: 10187,
  VEF: 248487.642241,
  VES: 202050.513256,
  VND: 23482.5,
  VUV: 116.281936,
  WST: 2.698118,
  XAF: 584.73355,
  XAG: 0.056242,
  XAU: 0.000565,
  XCD: 2.70255,
  XDR: 0.725619,
  XLM: 14.973075,
  XOF: 584.73355,
  XPD: 0.000532,
  XPF: 106.374767,
  XPT: 0.001243,
  XRP: 5.483997,
  XTZ: 0.403617,
  YER: 250.300053,
  ZAR: 17.26105,
  ZEC: 0.018195,
  ZMK: 5253.075255,
  ZMW: 18.160251,
  ZRX: 2.802058,
  ZWL: 322,
};

let fromCurrency, toCurrency;

function conversion(fromCurrVal, toCurrVal) {
  return (toCurrVal / fromCurrVal).toFixed(3);
}

function conversion2(fromCurrVal, toCurrVal) {
  return (fromCurrVal / toCurrVal).toFixed(3);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
const currenciesShortForm = [...Object.values(currencies)];

const CurrencyConverter = () => {
  //conversion value function

  const selectedInput1 = useRef();
  const selectedInput2 = useRef();
  const [currencyValue, changeValue] = useState("");
  const [currencyValue2, changeValue2] = useState("");
  const [currencyValue3, changeValue3] = useState("");
  const [currencyValue4, changeValue4] = useState("");
  const [toCurrencyVal, changetoCurrencyVal] = useState("");
  const [isconverting, changeConvert] = useState(false);

  function changeHandler1() {
    changeValue(selectedInput1.current.value);
    const currencyValFind1 =
      latestRates_Base_USD[
        getKeyByValue(currencies, selectedInput1.current.value)
      ];

    changeValue2(
      currencyValFind1 +
        " " +
        getKeyByValue(currencies, selectedInput1.current.value)
    );
    //setting  the from val
    fromCurrency = currencyValFind1;
    changeConvert(true);
    if (toCurrency) {
      const convertedVal2 = conversion2(toCurrency, fromCurrency);
      changetoCurrencyVal(convertedVal2);
    }
    setTimeout(() => {
      changeConvert(false);
    }, 4000);

    clearTimeout();
  }

  function changeHandler2() {
    changeValue3(selectedInput2.current.value);
    const currencyValFind2 =
      latestRates_Base_USD[
        getKeyByValue(currencies, selectedInput2.current.value)
      ];
    changeValue4(
      currencyValFind2 +
        " " +
        getKeyByValue(currencies, selectedInput2.current.value)
    );
    toCurrency = currencyValFind2;

    //second value change
    const convertedVal = conversion(fromCurrency, toCurrency);
    changeConvert(true);
    changetoCurrencyVal(convertedVal);
    conversion2(toCurrency, fromCurrency);
    setTimeout(() => {
      changeConvert(false);
    }, 4000);
    clearTimeout();
  }

  return (
    <section className={classes.currencySection}>
      <div className={classes.currencycontainer}>
        <div className={classes.fromCurrency}>
          <label htmlFor="fromCurrency">From Currency</label>
          <select
            id="fromCurrency"
            ref={selectedInput1}
            onChange={changeHandler1}
            value={currencyValue}
          >
            {currencyValue ? "" : <option>Select</option>}
            {currenciesShortForm.map((x) => (
              <option key={Math.random() * 190}>{x}</option>
            ))}
          </select>
          <input
            value={
              currencyValue ? "1 USD = " + currencyValue2 : "1 USD = Selected"
            }
            readOnly
          />
        </div>

        <div className={classes.toCurrency}>
          <label htmlFor="toCurrency">To Currency</label>
          <select
            id="toCurrency"
            ref={selectedInput2}
            onChange={changeHandler2}
            // defaultValue="select"
            value={currencyValue3}
          >
            {currencyValue3 ? "" : <option>Select</option>}
            {currenciesShortForm.map((x) => (
              <option key={Math.random() * 190}>{x}</option>
            ))}
          </select>
          <input
            value={
              currencyValue3 ? "1 USD = " + currencyValue4 : "1 USD = Selected"
            }
            readOnly
          />
        </div>
      </div>
      <div className={classes.conversion}>
        <div>
          {currencyValue ? (
            <p className={classes.highlighterNumber}>1.00</p>
          ) : (
            ""
          )}
          {currencyValue}
        </div>

        <div
          className={`${classes.exchangeIcon} ${
            isconverting ? classes.animationClass : undefined
          }`}
        >
          <ion-icon name="medical-outline"></ion-icon>
        </div>
        <div>
          <p className={classes.highlighterNumber}>{toCurrencyVal} </p>

          {currencyValue3}
        </div>
      </div>
    </section>
  );
};
export default CurrencyConverter;
