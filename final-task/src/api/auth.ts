import { UserT } from "./auth.t";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/FirebaseApp";

const RemoveUserLocalstorage = () => {
  window.localStorage.removeItem("user");
};
const SaveUserToLocalstorage = (userData: UserT) => {
  window.localStorage.setItem("user", JSON.stringify(userData));
};
const CheckAuthState = () => {
  const storageItem = window.localStorage.getItem("user");
  if (storageItem) {
    const storageUserItem = JSON.parse(storageItem);
    return storageUserItem;
  } else {
    return false;
  }
};
const onLogin = (user: UserT) => {
  const userObj = { email: user.email, uid: user.uid };
  SaveUserToLocalstorage(userObj);
  return userObj;
};
const SignUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password).then((res) => {
    if (res.user) {
      return onLogin(res.user);
    }
  });
};
const Login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password).then((res) => {
    if (res.user) {
      return onLogin(res.user);
    }
  });
};
const Logout = () => {
  RemoveUserLocalstorage();
  return signOut(auth);
};
export {
  SignUp,
  Login,
  Logout,
  CheckAuthState,
  SaveUserToLocalstorage,
  RemoveUserLocalstorage,
};
