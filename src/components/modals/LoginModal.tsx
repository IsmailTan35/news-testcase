import React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

interface MyFormValues {
  firstName: string;
}

const LoginModal = () => {
  const initialValues: MyFormValues = { firstName: "" };

  const handleSubmit = (values: any, actions: any) => {
    actions.setSubmitting(false);
  };

  return (
    <>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <Field id="firstName" name="firstName" placeholder="First Name" />
            <Field id="firstName" name="firstName" placeholder="First Name" />
            <Field id="firstName" name="firstName" placeholder="First Name" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default LoginModal;
