import React from "react";
import { Outlet } from "react-router";
import {
  // Navigate,
  useNavigate,
} from "react-router-dom";
import {
  clearToken,
  // isAuthenticated
} from "../../lib/auth";
import { useLogoutMutation } from "../../generated/graphql";

function MainLayout() {
  const [submitLogout, { client, error }] = useLogoutMutation();
  const navigate = useNavigate();

  // const navigateToLoginPage = () => <Navigate to="/login" />;

  const onLogoutHandler = async () => {
    await submitLogout();
    await client.resetStore();
    clearToken();

    navigate("/login");
    // return navigateToLoginPage();
  };

  // if (!isAuthenticated()) {
  //   return navigateToLoginPage();
  // }

  return (
    <>
      <Outlet />
      <button onClick={onLogoutHandler}>Log Out</button>
      {error || ""}
    </>
  );
}

export default MainLayout;
