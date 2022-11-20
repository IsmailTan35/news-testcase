import React, { useState, useEffect } from "react";
import "assets/styles/css/panel.css";
import ModalWrapper from "components/modals/ModalWrapper";
import CreateNewModal from "components/modals/CreateNewModal";
import CustomTable from "components/customtable";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "redux/store";
import { newsActions } from "redux/store/news";

const rows = ["Başlık", "İçerik", "Resim", "Tarih", "actions"];

const Panel = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const news = useAppSelector(state => state.news.items);

  const handleOpenModal = () => {
    setShow(prv => !prv);
  };

  useEffect(() => {
    async function getAllNews() {
      try {
        const res = await axios.get("/allnews");
        if (res.data.length === null) return;
        dispatch(newsActions.refresh(res.data));
      } catch (error) {}
    }
    getAllNews();
  }, []);

  const handleUpdate = (id: string) => {};
  const handleDelete = (id: string) => {};

  return (
    <>
      <div className="panel-wrapper">
        <div className="panel-container">
          <div className="panel-header">
            <div className="panel-news-add" onClick={handleOpenModal}>
              Yeni Haber Ekle
            </div>
          </div>
          <div className="panel-table">
            <CustomTable
              rows={rows}
              data={news}
              updateItem={handleUpdate}
              deleteItem={handleDelete}
            />
          </div>
        </div>
      </div>
      {show && (
        <ModalWrapper setShow={handleOpenModal}>
          <CreateNewModal setShow={handleOpenModal} />
        </ModalWrapper>
      )}
    </>
  );
};

export default Panel;
