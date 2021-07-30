import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";

import { Button, Card } from "react-bootstrap";

import UserContext from "./context.js";

import * as Yup from "yup";

const Login = ({ loggedIn, setLoggedIn }) => {
  const ctx = useContext(UserContext);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  function ValidateLogin(newEmail, newPassword) {
    const thisUser = ctx.users.findIndex(({ email }) => email === newEmail);

    if (thisUser !== -1 && ctx.users[thisUser]?.password === newPassword) {
      ctx.setCurrentUser(thisUser);
      setLoggedIn(true);
    } else {
      alert("Login Failed");
      setLoggedIn(false);
    }
  }

  const LoginForm = () => {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          ValidateLogin(values.email, values.password);
          forceUpdate();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Card bg="warning" text="dark" style={{ width: "36rem" }}>
              <Card.Body>
                <Card.Title>Login to Bad Bank</Card.Title>
                <Card.Text>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Enter Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error"
                    style={{ color: "red" }}
                  />
                  <br />
                  <br />
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    className="form-control"
                    type="password"
                    placeholder="Enter Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                    style={{ color: "red" }}
                  />
                </Card.Text>

                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-primary"
                  disabled={isSubmitting || !(isValid && dirty)}
                >
                  Login
                </Button>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    );
  };
  const handleLogOut = () => {
    ctx.setCurrentUser(-1);
    setLoggedIn(false);
  };

  if (ctx.currentUser === -1) {
    return LoginForm();
  } else if (loggedIn) {
    return (
      <Card bg="warning" text="dark" style={{ width: "36rem" }}>
        <Card.Body>
          <Card.Title>Welcome {ctx.users[ctx.currentUser].name}!</Card.Title>
          <br />
          <Button
            type="submit"
            variant="danger"
            className="btn btn-primary"
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    setLoggedIn(false);
    return <Redirect to="/deposit" />;
  }
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default Login;
