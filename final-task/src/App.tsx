import "./App.css";

import { Fragment, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { InitialPage } from "./components/InitialPage/InitialPage";
import { AuthPage } from "./components/AuthPage/AuthPage";
import { ProteinPage } from "./components/ProteinPage/ProteinPage";

import { CheckAuthState } from "./api/auth";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setUser } from "./store/features/userSlice";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";

const App = () => {
  const dispatch = useAppDispatch();
  const userLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [authPending, setAuthPending] = useState(true);
  useEffect(() => {
    console.log("useEffect APP");
    const userAuth = CheckAuthState();
    if (userAuth) {
      console.log(userAuth, "user");
      dispatch(setUser(userAuth));
      setAuthPending(false);
    } else {
      dispatch(setUser(undefined));
      setAuthPending(false);
    }
  }, []);
  // mb add preloader istead of null
  return (
    <Fragment>
      {authPending ? null : (
        <Routes>
          <Route
            path="/auth"
            element={
              <ProtectedRoute redirect="/search" condition={!userLoggedIn}>
                <AuthPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute redirect="/search" condition={!userLoggedIn}>
                <InitialPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute redirect="/" condition={userLoggedIn}>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/proteins/*"
            element={
              <ProtectedRoute redirect="/" condition={userLoggedIn}>
                <ProteinPage />
              </ProtectedRoute>
            }
          />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/*" element={<Navigate to={"/not-found"} replace />} />
        </Routes>
      )}
    </Fragment>
  );
};

export default App;
