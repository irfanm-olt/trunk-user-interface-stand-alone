import React, { Component } from 'react';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SignInWithEmail } from "../../modules/auth/actions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email : "",
      password: "",
      errors: {}
    }
  }
 
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isLogin) {
      this.props.history.push("./dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isLogin) {
      this.props.history.push("./dashboard"); // push user to dashboard when they login
    }
    if (nextProps.authErrors.errors) {
      this.setState({
        errors: nextProps.authErrors.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    const {email, password} = this.state;
    this.props.SignInWithEmail({email, password});
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="c-app c-default-layout flex-row align-items-center login-container">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="4">
              <div className="login-container">
                <div className="text-center">
                  <CIcon className="logo" name="logo" height="60" alt="Logo"/>
                </div>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm noValidate onSubmit={this.handleLogin}>
                        <p className="text-muted text-center">Sign In to your account</p>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput 
                              placeholder="Email"
                              onChange={this.onChange} 
                              value={this.state.email} 
                              errors={errors.email}
                              id="email"
                              type="email"
                              className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                              })}
                          />
                        </CInputGroup>
                        {errors.email || errors.emailnotfound ? 
                          <div className="warning-text">
                              {errors.email}
                              {errors.emailnotfound}
                          </div>:
                          ''
                        }
                        <CInputGroup className="mt-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput 
                            type="password" 
                            placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            className={classnames("", {
                              invalid: errors.password || errors.passwordincorrect
                            })}
                          />
                        </CInputGroup>
                        {errors.password || errors.passwordincorrect ? 
                          <div className="warning-text">
                              {errors.password}
                              {errors.passwordincorrect}
                          </div>:
                          ''
                        }
                        <CRow className="mt-3">
                          <CCol>
                            <button className="px-4 btn login-button">Login</button>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )

  }
}

Login.propTypes = {
  SignInWithEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  authErrors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  authErrors: state.authErrors
});
export default connect(
  mapStateToProps,
  { SignInWithEmail }
)(Login);