import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import "assets/styles/css/loginmodal.css";
import * as Yup from "yup";
import CustomInput from "components/custominput";
import axios from "axios";
import CustomInputArea from "components/custominputarea";
import CostumInputImage from "components/custominputfile";
import { useAppDispatch } from "redux/store";
import { newsActions } from "redux/store/news";
import { toast } from "react-toastify";

interface MyFormValues {
  title: string;
  content: string;
  newsPicture: any;
  id: any;
}

interface IProps {
  setShow?: any;
  data?: any;
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
  newsPicture: Yup.mixed(),
});

const UpdateNewModal = (props: IProps) => {
  const { setShow, data } = props;
  const dispatch = useAppDispatch();
  const initialValues: MyFormValues = {
    id: data._id,
    title: data.title,
    content: data.content,
    newsPicture: null,
  };

  async function handleSubmit(values: any, actions: any) {
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.set("newsPicture", values.newsPicture);

    try {
      const res = await axios.put("/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(newsActions.refresh(res.data));
      setShow();
      toast.success("Haber güncellendi.");
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
          enableReinitialize
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
                  value={values.title}
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
                  value={values.content}
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
                  value={values.newsPicture}
                  value2={data.newsPicture}
                />
                <div className="modal-form-error">
                  <ErrorMessage name="newsPicture" />
                </div>
                <button type="submit" className="modal-btn-submit ">
                  Güncelle
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default UpdateNewModal;
