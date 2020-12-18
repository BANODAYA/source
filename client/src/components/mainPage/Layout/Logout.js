import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {logoutUser}  from "../../../actions/authActions";

class Logout extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();

    }

   
}

Logout.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Logout);