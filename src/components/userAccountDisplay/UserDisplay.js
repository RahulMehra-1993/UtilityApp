import { useContext, useEffect, useRef, useState } from "react";
import classes from "./UserDisplay.module.css";
import { GlobalContext } from "../../store/GlobalStore";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LoginForm from "./LoginForm";

let image, imageObject, displayImageName;
const UserDisplay = () => {
  const context = useContext(GlobalContext);
  const [onUpdate, changeOnUpdate] = useState(false);
  const imageRef = useRef();
  const [uploadedImage, changeUploadedImage] = useState("");
  const [errorText, changeErrorText] = useState("");
  const [error, changeError] = useState(false);
  const [imageName, changeImageName] = useState("");

  //some declaration
  let user = context.user;
  let keyvalue;

  function imageHandler(event) {
    console.log(imageObject);
    changeError(false);
    changeErrorText("");
    imageObject = event.target.files[0];
    // console.log(imageObject.size / 125000, "MB");  //to check the size of the image
    const sizeOfTheImage = imageObject.size / 125000;
    let reader = new FileReader();
    reader.onload = function () {
      image = reader.result;
    };
    if (sizeOfTheImage > 1.5) {
      window.alert("Image must be less than 1.5m.b");
      imageObject = null;
      changeImageName("");
      return;
    } else {
      reader.readAsDataURL(imageObject);
      displayImageName = event.target.files[0].name;
      changeImageName(displayImageName);
    }
  }

  function uploadImage() {
    changeError(false);
    changeErrorText("");

    if (imageRef.current.value === "") {
      changeError(true);
      changeErrorText("No profile picture selected");

      return;
    }

    console.log(user);
    if (user[1]) {
      if (image) {
        checkProfilePic();
        changeUploadedImage(image);
      }
    }
  }

  //first get profile pic////
  async function checkProfilePic() {
    const url = "https://utility-app-6923b-default-rtdb.firebaseio.com";

    const option1 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await fetch(`${url}/${user[1]}/ProfilePic.json`, option1);
      if (!result.ok) {
        return;
      }
      const response = await result.json();
      keyvalue = Object.keys(response)[0];

      if (keyvalue) {
        sendProfilePic();
      }
      return;
    } catch (error) {
      createProfile();
    }
  }
  /////////patch func///////////
  async function sendProfilePic() {
    changeOnUpdate(true);
    imageRef.current.value = "";
    changeImageName("");
    const url = "https://utility-app-6923b-default-rtdb.firebaseio.com";
    let data = { UserProfilePic: image };

    const option = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await fetch(
        `${url}/${user[1]}/ProfilePic//${keyvalue}.json`,
        option
      );
      const response = await result.json();

      changeOnUpdate(false);
      changeError(false);
      changeErrorText("");
      //trigger the home page fetch
      context.fetchTask(context.login, context.user[1]);
    } catch (error) {
      changeError(true);
    }
  }
  //create func////////////////////////////
  async function createProfile() {
    console.log("creating profile picture for the given user");
    changeOnUpdate(true);
    imageRef.current.value = "";
    changeImageName("");
    const url = "https://utility-app-6923b-default-rtdb.firebaseio.com";
    let data = { UserProfilePic: image };

    const option = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await fetch(`${url}/${user[1]}/ProfilePic.json`, option);
      const response = await result.json();
      changeOnUpdate(false);
      changeError(false);
      changeErrorText("");
      changeImageName("");
      //resetting the value and trigger
      context.fetchTask(context.login, context.user[1]);
      image = null;
      console.log(response);
    } catch (error) {
      console.log("error from patch", error);
      changeError(true);
      changeErrorText(error.message);
    }
  }

  /////////////////////////////////////////

  ///on starting check///
  useEffect(() => {
    if (!context.login) {
      return;
    }
    if (context.user[3]) {
      changeUploadedImage(context.user[3]);
      changeError(false);
      changeErrorText("");
    }
  }, [context.profilePic]);

  function fileButtonReferealFunc() {
    document.getElementById("imgInput").click();
  }
  //login and logout action on profile
  function loginHandler() {
    console.log("login options");
    context.contentType("login");
    context.fetchTask(context.login, context.user[1]);
    // context.showUI();
  }

  function logoutHandler() {
       //trigger logout func from global store
    context.logoutHandler();
    context.contentType("login");
  }

  function deleteAccount() {
    const confirmation = window.confirm("Are you sure to delete account?");
    console.log(confirmation);

    if (confirmation) {
      context.deleteAccount(context.user[1]);
    }
  }
  //options when logged in
  let profilePicChanger = (
    <>
      <input
        type="file"
        id="imgInput"
        name="img"
        accept="image/*"
        ref={imageRef}
        onChange={imageHandler}
        placeholder="upload"
        hidden
      />
      <div className={classes.btnGrp}>
        {/* <button
          onClick={uploadImage}
          className={classes.uploadButton}
          disabled={onUpdate}
        > */}
        {onUpdate ? (
          <div className={classes.skelton}>
            <SkeletonTheme
              baseColor="white"
              highlightColor="grey"
              borderRadius="1rem"
              height="2rem"
            >
              <p>
                <Skeleton count={1} />
              </p>
            </SkeletonTheme>
          </div>
        ) : (
          <>
            <button
              onClick={fileButtonReferealFunc}
              className={classes.selectButton}
            >
              <i class="ri-image-edit-line ri-1x"></i>
            </button>

            <button
              onClick={uploadImage}
              className={classes.uploadButton}
              disabled={onUpdate}
            >
              <i class="ri-upload-2-line ri-1x"></i>
            </button>
          </>
        )}
      </div>
      {imageName && <p className={classes.imageDisplayName}>{imageName}</p>}
    </>
  );

  const cardDisplay = (
    <>
      <div className={classes.login}>
        <div onClick={logoutHandler} className={classes.out}>
          <ion-icon name="log-in-outline"></ion-icon>
        </div>
      </div>
      {context.user[3] && (
        <img
          src={uploadedImage}
          alt="profile"
          className={classes.profilePic}
        ></img>
      )}
      <p>
        <span className={classes.userName}>{user && user[0]}</span>
      </p>
      {context.login && profilePicChanger}

      <p className={classes.error}>{error && errorText}</p>
      <p className={classes.underline}></p>
      <p className={classes.or}>OR</p>
      {context.login && (
        <button className={classes.delete} onClick={deleteAccount}>
          <i class="ri-delete-bin-2-line"></i>
        </button>
      )}
    </>
  );

  return (
    <>
      {context.login ? (
        <section className={classes.userDisplay}> {cardDisplay} </section>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default UserDisplay;
