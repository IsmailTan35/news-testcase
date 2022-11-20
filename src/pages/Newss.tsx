import axios from "axios";
import NewsCard from "components/newscard";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { newsActions } from "redux/store/news";

const News = () => {
  // const [news, setNews] = useState<object[]>([]);
  const dispatch = useAppDispatch();
  const news = useAppSelector(state => state.news.items);
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

  return (
    <>
      <div className="panel-wrapper">
        <div className="panel-container">
          {news.length > 0 && (
            <div className="panel-table" style={{ padding: 20 }}>
              <div className="news">
                {news.length > 0 &&
                  news.map((item, index) => (
                    <NewsCard data={item} key={index} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
