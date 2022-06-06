import React from "react";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, useFormik } from "formik";

export default function FormikFOrm() {
  const title = "formik";

  const validationSchema = yup.object({
    lastName: yup.string("Enter your Name").required("LastName is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required")
      .matches(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[&+$!* ])([a-zA-Z0-9&+$!* ]{8,})$",
        "Need special character"
      ),
    confimPassword: yup
      .string("Confim your password")
      .required("Confim is required")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password need to be the same !")
      })
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <section>
      <div>
        <h1>{title.toLocaleUpperCase()}</h1>
        <Formik
          initialValues={{}}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
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
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="LastName"
              placeholder="Bond"
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              placeholder="James@Bond.com"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
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
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
