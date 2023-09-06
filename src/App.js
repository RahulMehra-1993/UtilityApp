import "./App.css";
import CareerTracker from "./components/CareerTracker";
import ExpenseTracker from "./components/ExpenseTracker";
import Navbar from "./components/Navbar";
import Tasks from "./components/taskDisplay/Tasks";
import { GlobalContext } from "./store/GlobalStore";
import Loader from "./ui/Loader";
import Modal from "./ui/Modal";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Notification from "./ui/Notification";

const App = () => {
  const [navShow, changenavShow] = useState(false);

  const context = useContext(GlobalContext);
  const theme = context.currentTheme ? "darkTheme" : "whiteTheme";

  const showNavbar = useCallback(() => {
    changenavShow((previous) => !previous);
  }, [navShow]);
  useEffect(() => {
    changenavShow(false);
  }, [context.showBoolean, context.Loader]);
  return (
    <React.Fragment>
      {context.showBoolean ? undefined : <Modal>{context.content}</Modal>}
      <main className={`displayScreen ${theme}`}>
        {context.Notification && (
          <Notification>{context.NotificationContent}</Notification>
        )}
        {context.showBoolean && (
          <button
            className="hambergerIcon"
            id="hambergerIcon"
            onClick={showNavbar}
          >
            {!navShow ? (
              <p>▶ OPEN NAVIGATION ▶</p>
            ) : (
              <p>◀ CLOSE NAVIGATION ◀</p>
            )}
          </button>
        )}
        {context.showBoolean && (
          <section
            className={`leftDisplay ${!navShow ? "hide" : undefined}`}
            id="leftDisplay"
          >
            <Navbar />
          </section>
        )}
        {context.showBoolean && (
          <section
            className="rightDisplay"
            onClick={navShow ? showNavbar : undefined}
          >
            <div className="section__1">
              <CareerTracker />
            </div>
            <div className="section__2">
              <Tasks />
            </div>
            <div className="section__3">
              <ExpenseTracker />
            </div>
          </section>
        )}
        {context.Loader && <Loader>{context.LoaderContent}</Loader>}
      </main>
    </React.Fragment>
  );
};

export default App;
