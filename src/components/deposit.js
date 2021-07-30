import React from "react";
import { Button, Card } from "react-bootstrap";
import UserContext from "./context.js";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import NumberFormat from "react-number-format";

const Deposit = () => {
  const ctx = React.useContext(UserContext);

  const setTextColor = () => {
    return(ctx.users[ctx.currentUser].balance <= 0 ? "red" : "green");
  };

  function onFormSubmit(values) {
    ctx.users[ctx.currentUser].balance =
      ctx.users[ctx.currentUser].balance + parseFloat(values.amt);
  }

  return (
    <Formik
      initialValues={{
        amt: "$0.00",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        onFormSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <h2
            style={{
              color: setTextColor(),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Balance:
            <NumberFormat
              value={ctx.users[ctx.currentUser].balance}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={"2"}
              fixedDecimalScale={true}
              prefix={"  $"}
              style={{ color: setTextColor() }}
            />
          </h2>

          <Card
            style={{ width: "18rem", marginLeft: "auto", marginRight: "auto" }}
          >
            <Card.Body>
              <Card.Title>Deposit</Card.Title>

              <Card.Text>Deposit Amount :</Card.Text>
              <Field
                id="amt"
                type="number"
                name="amt"
                step="any"
                placeholder="$0.00"
              />

              <Button
                variant="primary"
                type="submit"
                style={{ margin: "20px" }}
                disabled={isSubmitting || !(isValid && dirty)}
              >
                Deposit
              </Button>
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  amt: Yup.number().test(
    "is positive",
    "You must enter a positive number",
    (value) => value > 0
  ),
});

export default Deposit;
