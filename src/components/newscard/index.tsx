import React from "react";
import "assets/styles/css/newscard.css";
interface IProps {
  data: {
    title?: string;
    content?: string;
    newsPicture?: string;
  };
}

const NewsCard = (props: IProps) => {
  const { data } = props;
  return (
    <div className="newscard-wrapper">
      <div className="newscard-container">
        <div className="newscard-image-wrapper">
          <img
            src={`http://localhost:10000/newspicture/${data.newsPicture}`}
            alt={data.title}
          />
        </div>
        <div className="newscard-title">{data.title}</div>
        <p className="newscard-content">{data.content}</p>
      </div>
    </div>
  );
};

export default NewsCard;
