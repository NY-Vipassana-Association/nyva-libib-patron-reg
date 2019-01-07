import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "./wheel.png";
import * as Yup from "yup";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const patronSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
});

const createPatron = patron =>
  fetch(`api/patron`, {
    method: "POST",
    body: JSON.stringify(patron),
    headers: {
      "Content-Type": "application/json"
    }
  });

class App extends Component {
  handleSubmit = (values, actions) => {
    console.log(values);

    if (values.password !== values.password_confirmation) {
      actions.setErrors({
        password_confirmation: "Must match password"
      });
      actions.setSubmitting(false);
      return;
    }

    createPatron(values)
      .then(res => {
        console.log(res);
        actions.setStatus({
          message: "Your account has been created."
        });
        actions.resetForm({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: ""
        });
      })
      .catch(res => {
        actions.setStatus({
          error: true,
          message: "Something went wrong. Please try again later."
        });
        actions.setSubmitting(false);
      });
  };

  render() {
    return (
      <div className="App ui">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Register for the NYC Dhamma House Library</p>
          <Formik
            onSubmit={this.handleSubmit}
            validationSchema={patronSchema}
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              password: "",
              password_confirmation: ""
            }}
          >
            {({ isSubmitting, isValid, status }) => (
              <Form className={`ui form massive ${isValid ? "" : "error"}`}>
                {status && (
                  <div className="ui message">
                    <div className="header">
                      {status.error ? "Error" : "Success"}
                    </div>
                    <p>{status.message}</p>
                  </div>
                )}
                <div className="field">
                  <Field
                    size="massive"
                    name="first_name"
                    placeholder="First name"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="ui error message"
                  />
                </div>
                <div className="field">
                  <Field
                    size="massive"
                    name="last_name"
                    placeholder="Last name"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="ui error message"
                  />
                </div>
                <div className="field">
                  <Field
                    size="massive"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="ui error message"
                  />
                </div>
                <div className="field">
                  <Field size="massive" name="phone" placeholder="Phone" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="ui error message"
                  />
                </div>
                <div className="field">
                  <Field
                    size="massive"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="ui error message"
                  />
                </div>
                <div className="field">
                  <Field
                    size="massive"
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm password"
                  />
                  <ErrorMessage
                    name="password_confirmation"
                    component="div"
                    className="ui error message"
                  />
                </div>
                <button
                  className="ui button massive primary"
                  size="massive"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </header>
      </div>
    );
  }
}

export default App;
