import React from "react";

import "assets/styles/css/loginmodal.css";

import axios from "axios";
import { useAppDispatch } from "redux/store";
import { newsActions } from "redux/store/news";

interface IProps {
  setShow?: any;
  data?: any;
}

const DeleteNewsModal = (props: IProps) => {
  const { setShow, data } = props;
  const dispatch = useAppDispatch();
  async function handleSubmit() {
    try {
      const res = await axios.delete("/news", { data: { id: data } });
      setShow();
      dispatch(newsActions.refresh(res.data));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="modal-content">
        <div className="modal-header">Haberi Kaldır</div>

        <div
          className="loginmodal-form"
          style={{
            gap: 25,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Haberi kaldırmak istiyor musunuz?
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="modal-btn-submit "
              style={{
                flex: "1 1",
              }}
              onClick={handleSubmit}
            >
              Haberi Sil
            </button>
            <button
              className="modal-btn-submit "
              style={{
                flex: "1 1",
              }}
              onClick={setShow}
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteNewsModal;
