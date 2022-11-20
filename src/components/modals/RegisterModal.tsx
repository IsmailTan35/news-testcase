import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import "assets/styles/css/loginmodal.css";
import * as Yup from "yup";
import CustomInput from "components/custominput";
import axios from "axios";

interface MyFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface IProps {
  setModalName: any;
}

const formSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "En az 2 karakteden oluşmalıdır")
    .required("Ad ve soyadınızı giriniz.")
    .matches(/^[A-Za-z_ğüşıöçĞÜŞİÖÇ\s]+$/, "Özel karakter içeremez."),
  email: Yup.string()
    .required("E-postanızı giriniz.")
    .email("E-posta biçimi doğru değil."),
  password: Yup.string()
    .required("Şifrenizi giriniz.")
    .min(6, "Şifreniz en az 6 karakterden oluşmalıdır."),
  confirmPassword: Yup.string()
    .required("Şifreler Eşleşmiyor.")
    .min(6, "Şifreler Eşleşmiyor.")
    .oneOf([Yup.ref("password"), null], "Şifreler Eşleşmiyor."),
});

const RegisterModal = (props: IProps) => {
  const { setModalName } = props;
  const initialValues: MyFormValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const res = await axios.post("/auth/register", {
        fullname: values.fullName,
        email: values.email,
        password: values.password,
      });
    } catch (error) {}
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
          {({ errors, handleChange, submitCount }) => (
            <Form className="loginmodal-form">
              <CustomInput
                id="fullName"
                name="fullName"
                placeholder="Ad Soyad"
                onChange={handleChange}
                error={submitCount === 0 || !errors.fullName}
              />
              {submitCount !== 0 && (
                <div className="modal-form-error">{errors.fullName}</div>
              )}
              <CustomInput
                id="email"
                name="email"
                placeholder="E-Posta"
                onChange={handleChange}
                error={submitCount === 0 || !errors.email}
              />
              {submitCount !== 0 && (
                <div className="modal-form-error">{errors.email}</div>
              )}

              <CustomInput
                id="password"
                name="password"
                placeholder="Şifre"
                onChange={handleChange}
                error={submitCount === 0 || !errors.password}
              />
              {submitCount !== 0 && (
                <div className="modal-form-error">{errors.password}</div>
              )}
              <CustomInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Şifre (Tekrar)"
                onChange={handleChange}
                error={submitCount === 0 || !errors.confirmPassword}
              />
              {submitCount !== 0 && (
                <div className="modal-form-error">{errors.confirmPassword}</div>
              )}
              <button type="submit" className="modal-btn-submit ">
                Kaydol
              </button>
            </Form>
          )}
        </Formik>
        <div className="modal-auth-footer">
          {" "}
          <div className="modal-auth-footer-text">Hesabınız var mı?</div>
          <div
            className="modal-auth-footer-btn"
            onClick={() => {
              setModalName("login");
            }}
          >
            Giriş Yap
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
