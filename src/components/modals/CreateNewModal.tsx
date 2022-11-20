import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import "assets/styles/css/loginmodal.css";
import * as Yup from "yup";
import CustomInput from "components/custominput";
import axios from "axios";
import CustomInputArea from "components/custominputarea";
import CostumInputImage from "components/custominputfile";
import { newsActions } from "redux/store/news";
import { useAppDispatch } from "redux/store";
import { toast } from "react-toastify";

interface MyFormValues {
  title: string;
  content: string;
  newsPicture: any;
}

interface IProps {
  setShow?: any;
}

const formSchema = Yup.object().shape({
  title: Yup.string()
    .required("Boşlukları dodlurunuz.")
    .min(2, "En az 2 karakteden oluşmalıdır")
    .max(50, "En az 50 karakteden oluşmalıdır")
    .required("Ad ve soyadınızı giriniz."),
  content: Yup.string()
    .required("Boşlukları dodlurunuz.")
    .min(6, "En az 6 karakterden oluşmalıdır.")
    .max(250, "En fazla 250 karakterden oluşmalıdır."),
  newsPicture: Yup.mixed().required("Haber için resim yükleyiniz."),
});

const CreateNewModal = (props: IProps) => {
  const { setShow } = props;
  const dispatch = useAppDispatch();
  const initialValues: MyFormValues = {
    title: "",
    content: "",
    newsPicture: null,
  };

  async function handleSubmit(values: any, actions: any) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.set("newsPicture", values.newsPicture);
    try {
      const res = await axios.post("/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(newsActions.refresh(res.data));

      setTimeout(() => setShow(), 10);
      toast.success("Haber oluşturuldu.");
    } catch (error) {
      toast.error("Hata! Tekrar deneyin");
    }
  }

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">Haber Oluştur</div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          {({ errors, handleChange, submitCount, setFieldValue, values }) => {
            return (
              <Form className="loginmodal-form">
                <CustomInput
                  id="title"
                  name="title"
                  placeholder="Haber Başlığı"
                  onChange={handleChange}
                  error={submitCount === 0 || !errors.title}
                />
                {submitCount !== 0 && (
                  <div className="modal-form-error">{errors.title}</div>
                )}
                <CustomInputArea
                  id="content"
                  name="content"
                  placeholder="Haber İçeriği"
                  onChange={handleChange}
                  error={submitCount === 0 || !errors.content}
                />
                {submitCount !== 0 && (
                  <div className="modal-form-error">{errors.content}</div>
                )}
                <CostumInputImage
                  id="newsPicture"
                  name="newsPicture"
                  placeholder="Haber Resmi"
                  onChange={(e: any) => {
                    setFieldValue("newsPicture", e.currentTarget.files[0]);
                  }}
                  error={submitCount === 0 || !errors.newsPicture}
                  value={null}
                  value2={values.newsPicture}
                />

                <div className="modal-form-error">
                  <ErrorMessage name="newsPicture" />
                </div>

                <button type="submit" className="modal-btn-submit ">
                  Oluştur
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CreateNewModal;
