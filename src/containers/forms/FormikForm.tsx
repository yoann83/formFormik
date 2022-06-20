import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import { Form, Formik, useFormik } from "formik";
import React from "react";
import TranfertListComponent from "../../components/TranfertList";
import * as yup from "yup";
import "./forms.scss";

export default function FormikFOrm() {
  const title = "formik & materail-ui";
  const [therms, isTherms] = React.useState(false);

  //FORM SCHEMA VALIDATOR
  const validationSchema = yup.object({
    lastName: yup.string().required("LastName is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required")
      .matches(
        new RegExp(
          "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[&+$!* ])([a-zA-Z0-9&+$!* ]{8,})$"
        ),
        "Need special character"
      ),
    confimPassword: yup
      .string()
      .required("Confim is required")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password need to be the same !")
      }),
    date: yup.string().required("Select Date"),
    is_therms: yup.string().required("Select")
  });

  const getThermsValue = (value: boolean) => {
    isTherms(!value);
  };

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confimPassword: "",
      date: "",
      is_therms: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <section>
      <div className="form-formik-material-ui">
        <h1>{title.toLocaleUpperCase()}</h1>
        <Formik
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          initialValues={undefined}
        >
          <Form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="FirstName"
              placeholder="James"
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              style={{ margin: "1em 0" }}
              InputLabelProps={{ style: { color: "#274058" } }}
            />
            <TextField
              fullWidth
              required
              id="lastName"
              name="lastName"
              label="LastName"
              placeholder="Bond"
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              style={{ margin: "1em 0" }}
            />
            <TextField
              fullWidth
              required
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.date ? formik.errors.date : ""}
              error={formik.touched.date && Boolean(formik.errors.date)}
              label="Date of Birth"
              type="datetime-local"
              InputLabelProps={{
                shrink: true
              }}
              style={{ margin: "1em 0" }}
            />
            <TextField
              fullWidth
              required
              id="email"
              name="email"
              label="Email"
              placeholder="James@Bond.com"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              style={{ margin: "1em 0" }}
            />
            <TextField
              fullWidth
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              style={{ margin: "1em 0" }}
            />
            <TextField
              fullWidth
              required
              id="confimPassword"
              name="confimPassword"
              label="Confirm password"
              type="password"
              onChange={formik.handleChange}
              error={
                formik.touched.confimPassword &&
                Boolean(formik.errors.confimPassword)
              }
              helperText={
                formik.touched.confimPassword && formik.errors.confimPassword
              }
              style={{ margin: "1em 0" }}
            />
            <h4>What form with you?</h4>
            <TranfertListComponent
              list={[
                "React Natif",
                "Formik",
                "MaterialUi",
                "SurveyJs",
                "MaterialSurvey"
              ]}
            />
            <FormControlLabel
              name="is_therms"
              value={formik.values.is_therms}
              checked={formik.values.is_therms}
              onChange={formik.handleChange}
              onClick={() => getThermsValue(formik.values.is_therms)}
              onBlur={formik.handleBlur}
              control={<Switch color="primary" />}
              label="Accept therms of use"
              labelPlacement="end"
              style={{
                display: "flex",
                justifyContent: "right",
                padding: "1em"
              }}
            />
            <Button
              color="primary"
              disabled={!therms}
              variant="contained"
              type="submit"
            >
              Register
            </Button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
