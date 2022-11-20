import React from "react";
import { Formik, Form } from "formik";
import "assets/styles/css/loginmodal.css";
import * as Yup from "yup";
import CustomInput from "components/custominput";
import axios from "axios";
import CustomInputArea from "components/custominputarea";
import CostumInputImage from "components/custominputfile";

interface MyFormValues {
  title: string;
  content: string;
  newsPicture: any;
}

interface IProps {
  setModalName?: any;
}

const formSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "En az 2 karakteden oluşmalıdır")
    .max(50, "En az 50 karakteden oluşmalıdır")
    .required("Ad ve soyadınızı giriniz."),
  content: Yup.string()
    .required("Şifrenizi giriniz.")
    .min(6, "En az 6 karakterden oluşmalıdır.")
    .max(250, "En fazla 250 karakterden oluşmalıdır."),

  newspicture: Yup.mixed().required("Haber için resim yükleyiniz."),
});

const CreateNewModal = (props: IProps) => {
  const { setModalName } = props;
  const initialValues: MyFormValues = {
    title: "",
    content: "",
    newsPicture: null,
  };

  const handleSubmit = async (values: any, actions: any) => {
    const formData = new FormData();
    console.log(values);
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.set("newsPicture", values.newsPicture);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post("/news", formData, config);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">Haber Oluştur</div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          // validationSchema={formSchema}
        >
          {({ errors, handleChange, submitCount, setFieldValue }) => (
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
              />
              {/* {submitCount !== 0 && (
                <div className="modal-form-error">{errors.newsPicture}</div>
              )} */}
              <button type="submit" className="modal-btn-submit ">
                Oluştur
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateNewModal;
