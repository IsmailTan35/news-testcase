import { Formik, Form } from "formik";
import "assets/styles/css/loginmodal.css";
import * as Yup from "yup";
import CustomInput from "components/custominput";
import axios from "axios";
import { adminActions, useAppDispatch } from "redux/store";
interface MyFormValues {
  email: string;
  password: string;
}
interface IProps {
  setModalName: any;
}

const formSchema = Yup.object().shape({
  email: Yup.string()
    .required("E-postanızı giriniz.")
    .email("E-posta biçimi doğru değil."),
  password: Yup.string().required("Şifrenizi giriniz."),
});

const RegisterModal = (props: IProps) => {
  const { setModalName } = props;
  const dispatch = useAppDispatch();
  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const res = await axios.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;

      dispatch(adminActions.refresh(res.data));
    } catch (error) {}
  };

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">Giriş Yap</div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          {({ errors, handleChange, submitCount }) => (
            <Form className="loginmodal-form">
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
                type="password"
              />
              {submitCount !== 0 && (
                <div className="modal-form-error">{errors.password}</div>
              )}

              <button type="submit" className="modal-btn-submit ">
                Giriş Yap
              </button>
            </Form>
          )}
        </Formik>
        <div className="modal-auth-footer">
          {" "}
          <div className="modal-auth-footer-text">Hesabınız yok mu?</div>
          <div
            className="modal-auth-footer-btn"
            onClick={() => setModalName("register")}
          >
            Kayıt Ol
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
