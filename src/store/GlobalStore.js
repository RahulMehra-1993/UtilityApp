import { useCallback, useEffect, useState } from "react";
import React from "react";
import Calculator from "../components/tools/Calculator";
import UnitsConverter from "../components/tools/UnitsConverter";
import CurrencyConverter from "../components/tools/CurrencyConverter";
import Weather from "../components/tools/Weather";
import TaskForm from "../components/TaskForm";
import LoginForm from "../components/userAccountDisplay/LoginForm";
import { signOut, deleteUser } from "firebase/auth";
import UserDisplay from "../components/userAccountDisplay/UserDisplay";
import { auth } from "../auth/firebase";
import Logo from "../ui/Logo";
import ContactPage from "../components/ContactPage";
import FiveZeroThree from "../components/ErrorPages/FiveZeroThree";

let taskData = [];
let expenseData = [];
let careerData = [];
let educationData = [];
let items;

export const GlobalContext = React.createContext({
  showBoolean: false,
  showUI: () => {},
  contentType: () => {},
  content: null,
  currentTheme: false,
  darkTheme: () => {},
  taskFormData: () => {},
  Taskdata: [],
  updateTask: () => {},
  login: false,
  loginHandler: () => {},
  logoutHandler: () => {},
  user: [],
  fetchTask: () => {},
  deleteAccount: () => {},
  ExpenseData: [],
  updateExpense: () => {},
  CareerData: [],
  updateCareer: () => {},
  EducationData: [],
  updateEducation: () => {},
  Loader: false,
  LoaderContent: null,
  Notification: false,
  NotificationUpdater: () => {},
  NotificationContent: null,
  NotificationContentUpdater: () => {},
  NotificationColor: false,
});

const GlobalProvider = (props) => {
  //all global  states
  const [state, changestate] = useState(false);
  const [themeState, themeStatechangestate] = useState(false);
  const [contentState, changeContentState] = useState("");
  const [formDataState, changeformDataState] = useState("");
  const [expenseDataState, changeExpenseDataState] = useState("");
  const [loginState, changeloginState] = useState("");
  const [userName, changeUsername] = useState("");
  const [uid, changeUid] = useState("");
  const [creationDate, changeCreatingDate] = useState("");
  const [profilePic, changeProfilePic] = useState("");
  const [careerDataState, changeCareerDataState] = useState("");
  const [educationDataState, changeEducationDataState] = useState("");
  const [globalLoader, changeGlobalLoader] = useState(false);
  const [loaderContent, changeLoaderContent] = useState("");
  const [notification, changeNotification] = useState(false);
  const [notificationContent, changeNotificationContent] = useState("");
  const [notificationColor, changeNotificationColor] = useState("");

  //content Types as per options
  const contentTypeHandler = (type) => {
    if (type === "calculator") {
      changeContentState(<Calculator />);
    }
    if (type === "unitconverter") {
      changeContentState(<UnitsConverter />);
    }
    if (type === "currencyconverter") {
      changeContentState(<CurrencyConverter />);
    }
    if (type === "weather") {
      changeContentState(<Weather />);
    }
    if (type === "contact") {
      changeContentState(<ContactPage />);
    }
    if (type === "create") {
      changeContentState(<TaskForm />);
    }

    if (type === "login") {
      changeContentState(<LoginForm />);
    }

    if (type === "user") {
      changeContentState(<UserDisplay />);
    }
    if (type === "fiveZeroThree") {
      changeContentState(<FiveZeroThree />);
    }
  };

  // UI and update functions
  const showUIHandler = () => {
    changestate((previousState) => !previousState);
  };
  function themeChanger() {
    themeStatechangestate((previous) => !previous);
  }
  function updateTaskHandler(id) {
    let newMutatedArray = taskData.filter((item) => {
      return item.taskid !== id;
    });
    taskData = [...newMutatedArray];
    changeformDataState(taskData);
  }
  function updateExpenseHandler(id) {
    let newMutatedArray = expenseData.filter((item) => {
      return item.ExpenseId !== id;
    });
    expenseData = [...newMutatedArray];
    changeExpenseDataState(expenseData);
  }
  function updateCareerHandler(id) {
    let newMutatedArray = careerData.filter((item) => {
      return item.CareerId !== id;
    });
    careerData = [...newMutatedArray];
    changeCareerDataState(careerData);
  }
  function updateEducationHandler(id) {
    let newMutatedArray = educationData.filter((item) => {
      return item.EducationId !== id;
    });
    educationData = [...newMutatedArray];
    changeEducationDataState(educationData);
  }
  function notificationUpdater() {
    changeNotification(true);

    function timer() {
      setTimeout(() => {
        changeNotification(false);
      }, 5000);
    }
    timer();
    clearInterval(timer);
  }

  function notificationContentUpdater(data) {
    //initial notification
    changeNotificationColor(false);
    //change on content
    if (data === "Removed") {
      changeNotificationColor(true);
    }

    if (data === "Added") {
      changeNotificationColor(false);
    }
    changeNotificationContent(data);
  }

  //Account delete handler
  const deleteHandler = useCallback(async (uid) => {
    if (!uid) {
      return;
    }
    console.log("deleting data from global state");
    let url = "https://utility-app-6923b-default-rtdb.firebaseio.com";
    const option = {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    };
    async function deleteDatabase() {
      try {
        const result = await fetch(`${url}/${uid}.json`, option);
        if (!result.ok) {
          throw new Error("something went wrong");
        }
        const data = await result.json();
        console.log(data);
        //before entering need to reset dataBase
        taskData = [];
        taskData = [];
        expenseData = [];
        careerData = [];
        educationData = [];
        changeformDataState(taskData);
        changeExpenseDataState(expenseData);
        changeCareerDataState(careerData);
        changeEducationDataState(educationData);
        changeProfilePic("");
      } catch (error) {
        console.log(error);
      }
    }
    deleteDatabase();

    //deleting profile
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });

    localStorage.removeItem("user");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    changeloginState(false);
    changeUsername(null);
    changeUid(null);
    changeCreatingDate(null);
    changeProfilePic(null);
    fetchData(false, null);
  }, []);

  //All fetch functions on startup
  const fetchData = useCallback(
    (loginStateFromSys, loginUserId) => {
      changeGlobalLoader(false);
      changeGlobalLoader(null);
      async function fetchTaskFunc() {
        // need to empty

        if (!loginStateFromSys) {
          changeformDataState([]);
          changeCareerDataState([]);
          changeEducationDataState([]);
          changeExpenseDataState([]);
          // changeProfilePic(null);

          return;
        }
        //common fetch starters value
        let url = "https://utility-app-6923b-default-rtdb.firebaseio.com";
        let option = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        //fetch tasks
        const fetchTasks = async function () {
          if (loginStateFromSys) {
            try {
              changeGlobalLoader(true);
              changeLoaderContent("fetching tasks...");
              const result = await fetch(
                `${url}/${loginUserId}/Tasks.json`,
                option
              );
              if (!result.ok) {
                throw new Error("something went wrong");
              }
              const data = await result.json();
              //before entering need to reset taskdata
              taskData = [];
              if (data) {
                for (const [key, value] of Object.entries(data)) {
                  taskData.push({
                    taskid: key,
                    task: value.tasks,
                    date: value.Date,
                  });
                  changeformDataState(taskData);
                }
              }
              changeGlobalLoader(null);
              changeGlobalLoader(false);
            } catch (error) {
              // testing error handling
              contentTypeHandler("fiveZeroThree");
              showUIHandler();
              //
              console.log(error.message);
              changeGlobalLoader(false);
              changeLoaderContent("fetch failed");
            }
          }
        };
        //profile pic
        async function profilePicFetch() {
          if (!loginStateFromSys) {
            return;
          }
          try {
            changeGlobalLoader(true);
            changeLoaderContent("fetching profile picture...");
            const result = await fetch(
              `${url}/${loginUserId}/ProfilePic.json`,
              option
            );
            if (!result.ok) {
              throw new Error("No logged in user");
            }
            const response = await result.json();
            if (response === null) {
              throw new Error("Profile picture is not set ");
            }
            if (Object.values(response)[0].UserProfilePic) {
              changeProfilePic(Object.values(response)[0].UserProfilePic);
            }
            changeGlobalLoader(null);
            changeGlobalLoader(false);
            // return;
          } catch (error) {
            console.log(error);
            changeProfilePic("");
            changeGlobalLoader(false);
            changeLoaderContent("fetch failed");
          }
        }

        //fetch expense data
        const expenseDataFetch = async function () {
          if (loginStateFromSys) {
            //before entering need to reset taskdata
            expenseData = [];
            changeExpenseDataState(expenseData);
            try {
              changeGlobalLoader(true);
              changeLoaderContent("fetching expense data");
              const result = await fetch(
                `${url}/${loginUserId}/ExpenseData.json`,
                option
              );
              if (!result.ok) {
                throw new Error("something went wrong");
              }
              const data = await result.json();
              //before entering need to reset taskdata
              expenseData = [];
              if (data) {
                for (const [key, value] of Object.entries(data)) {
                  expenseData.push({
                    ExpenseId: key,
                    Date: value.Date,
                    Amount: value.Amount,
                    Description: value.Description,
                  });
                }
                //change the state for updation in section 2
                changeExpenseDataState(expenseData);
                changeGlobalLoader(null);
                changeGlobalLoader(false);
              }
            } catch (error) {
              console.log(error);
              changeGlobalLoader(false);
              changeLoaderContent("fetch failed");
            }
          }
        };
        //fetch career Data
        const careerDataFetch = async function () {
          if (loginStateFromSys) {
            try {
              changeGlobalLoader(false);
              changeLoaderContent("fetching career data....");
              const result = await fetch(
                `${url}/${loginUserId}/Details/Professional.json`,
                option
              );
              if (!result.ok) {
                throw new Error("something went wrong");
              }
              const data = await result.json();
              //before entering need to reset taskdata
              careerData = [];
              if (data) {
                for (const [key, value] of Object.entries(data)) {
                  careerData.push({
                    CareerId: key,
                    Organization: value.organization,
                    Profile: value.profile,
                    Start: value.start,
                    End: value.end,
                    Experience: value.experience,
                    Current: value.current,
                  });
                }
                //change the state for updation in section 2
                changeCareerDataState(careerData);
                changeGlobalLoader(null);
                changeGlobalLoader(false);
              }
            } catch (error) {
              console.log(error);
              changeGlobalLoader(false);
              changeLoaderContent("fetch failed");
            }
          }
        };
        //fetch qualification data
        const educationDataFetch = async function () {
          if (loginStateFromSys) {
            try {
              changeGlobalLoader(true);
              changeLoaderContent("fetching Education data...");
              const result = await fetch(
                `${url}/${loginUserId}/Details//Education.json`,
                option
              );
              if (!result.ok) {
                throw new Error("something went wrong");
              }
              const data = await result.json();
              //before entering need to reset educationData array
              educationData = [];
              if (data) {
                for (const [key, value] of Object.entries(data)) {
                  educationData.push({
                    EducationId: key,
                    Type: value.type,
                    NameOfTheEducation: value.nameOfTheEducation,
                    Start: value.start,
                    End: value.end,
                    EducationSubject: value.educationSubject,
                    CertificateSubject: value.certificateFurtherOptions,
                    InstitutionName: value.insitutionName,
                  });
                }
                //change the state for updation in section 2
                changeEducationDataState(educationData);
                changeGlobalLoader(null);
                changeGlobalLoader(false);
              }
            } catch (error) {
              console.log(error);
              changeGlobalLoader(false);
              changeLoaderContent("fetch failed");
            }
          }
        };

        //1st
        await fetchTasks();
        //2nd
        await expenseDataFetch();
        // //3rd
        await careerDataFetch();
        // //4th
        await educationDataFetch();
        // //5th
        await profilePicFetch();
        //loader off after completing all fetching
      }
      fetchTaskFunc();
    },
    [
      // formDataState,
      // expenseDataState,
      // careerDataState,
      // educationDataState,
      // profilePic,
    ]
  );

  //login functionality
  function loginHandlerUpdate(loginState, userName, uid, creationDate) {
    changeloginState(loginState);
    changeUsername(userName);
    changeUid(uid);
    changeCreatingDate(creationDate);
    fetchData(loginState, uid);
  }
  //logout functionality
  function logoutHandlerUpdate() {
    localStorage.removeItem("user");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    changeloginState(false);
    changeUsername(null);
    changeUid(null);
    changeCreatingDate(null);
    changeProfilePic(null);
    fetchData(false, null);
  }
  //check for the login
  useEffect(() => {
    setTimeout(() => {
      //getting from local storage
      items = JSON.parse(localStorage.getItem("user"));
      changeProfilePic("");
      if (items) {
        loginHandlerUpdate(
          items.loggedIn,
          items.userName,
          items.userId,
          items.userCreatedDate
        );
        fetchData(items.loggedIn, items.userId);
      }
    }, 1000);
    return () => clearTimeout();
  }, []);

  window.onclose = function () {
    // Do something before the window is closed.
    console.log("triggered on close");
    localStorage.removeItem("user");
    //loggingout or signing out current user
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
    // This could include saving data, or displaying a confirmation message.
  };

  return (
    <GlobalContext.Provider
      value={{
        showBoolean: state,
        showUI: showUIHandler,
        content: contentState || <Logo />,
        contentType: contentTypeHandler,
        darkTheme: themeChanger,
        currentTheme: themeState,
        Taskdata: formDataState,
        updateTask: updateTaskHandler,
        ExpenseData: expenseDataState,
        updateExpense: updateExpenseHandler,
        CareerData: careerDataState,
        updateCareer: updateCareerHandler,
        EducationData: educationDataState,
        updateEducation: updateEducationHandler,
        login: loginState,
        loginHandler: loginHandlerUpdate,
        logoutHandler: logoutHandlerUpdate,
        user: [userName, uid, creationDate, profilePic],
        fetchTask: fetchData,
        deleteAccount: deleteHandler,
        Loader: globalLoader,
        LoaderContent: loaderContent,
        Notification: notification,
        NotificationUpdater: notificationUpdater,
        NotificationContent: notificationContent,
        NotificationContentUpdater: notificationContentUpdater,
        NotificationColor: notificationColor,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
