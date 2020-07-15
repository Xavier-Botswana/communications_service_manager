import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { logoutUser } from "../../store/actions";

import firebase from "../../firebase";

const Logout = (props) => {
  async function logout() {
    try {
      await firebase.logout();
      props.history.replace("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    //props.logoutUser(props.history);
    logout();
  });

  return <></>;
};

export default withRouter(Logout);
