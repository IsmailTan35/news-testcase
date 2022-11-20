import React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
} from "formik";
import "assets/styles/css/loginmodal.css";
import * as Yup from "yup";
import CustomInput from "components/custominput";

interface MyFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formSchema = Yup.object().shape({
  fullName: Yup.string()
    .required()
    .matches(/^[A-Za-z_ğüşıöçĞÜŞİÖÇ\s]+$/),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
  confirmPassword: Yup.string()
    .required()
    .min(6)
    .oneOf([Yup.ref("password"), null]),
});

const RegisterModal = () => {
  const initialValues: MyFormValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: any, actions: any) => {
    console.log(values);

    actions.setSubmitting(false);
  };

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">Kayıt Ol</div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          {({ errors, handleChange }) => (
            <Form className="loginmodal-form">
              <CustomInput
                id="fullName"
                name="fullName"
                placeholder="Ad Soyad"
                onChange={handleChange}
              />
              <ErrorMessage name="fullName" />
              <CustomInput
                id="email"
                name="email"
                placeholder="E-Posta"
                onChange={handleChange}
              />
              <ErrorMessage name="email" />
              <CustomInput
                id="password"
                name="password"
                placeholder="Şifre"
                onChange={handleChange}
              />
              <ErrorMessage name="password" />
              <CustomInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Şifre (Tekrar)"
                onChange={handleChange}
              />
              <ErrorMessage name="confirmPassword" />

              <button type="submit" className="modal-btn-submit ">
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <div className="modal-auth-footer">
          {" "}
          <div className="modal-auth-footer-text">Hesabınız var mı?</div>
          <div className="modal-auth-footer-btn">Giriş Yap</div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
