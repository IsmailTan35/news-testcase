import React, { useState } from "react";
import "assets/styles/css/table.css";
import ModalWrapper from "components/modals/ModalWrapper";
import UpdateNewModal from "components/modals/UpdateNewsModal";
import DeleteNewsModal from "components/modals/DeleteNewsModal";
import { format } from "date-fns";
interface IProps {
  rows?: string[];
  data?: any;
  deleteItem?: any;
  updateItem?: any;
}

const CustomTable = (props: IProps) => {
  const { rows, data, updateItem, deleteItem } = props;
  const [showUpdateModal, setUpdateModal] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(null);

  const handleClose = () => {
    setUpdateModal(null);
    setDeleteModal(null);
  };
  return (
    <>
      <table>
        <tr>{rows && rows.map((row, index) => <th key={index}>{row}</th>)}</tr>
        {data &&
          data.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.newsPicture}</td>
                <td>{format(new Date(item.timestamps), "dd.MM.yyyy hh:mm")}</td>
                <td>
                  <div className="table-actions">
                    <div onClick={() => setUpdateModal(item)}>Güncelle</div>
                    <div onClick={() => setDeleteModal(item._id)}>Sil</div>
                  </div>
                </td>
              </tr>
            );
          })}
      </table>
      {!data && <div className="table-empty"> veri yok</div>}
      {(showUpdateModal || showDeleteModal) && (
        <ModalWrapper setShow={handleClose}>
          {showUpdateModal ? (
            <UpdateNewModal data={showUpdateModal} setShow={handleClose} />
          ) : (
            <div></div>
          )}
          {showDeleteModal ? (
            <DeleteNewsModal data={showDeleteModal} setShow={handleClose} />
          ) : (
            <div></div>
          )}
        </ModalWrapper>
      )}
    </>
  );
};

export default CustomTable;
