import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "assets/styles/css/market.css";
const StockMarket = () => {
  const [values, setValues] = useState<object[]>([]);
  const [loading, setLoading] = useState(false);

  async function getValues() {
    try {
      const { data } = await axios.get("/finans");
      setValues(data.quoteResponse!.result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useLayoutEffect(() => {
    setLoading(true);
    getValues();
  }, []);

  useEffect(() => {
    let intervalID = setInterval(getValues, 5000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="market-wrapper">
      {loading && <div>Yükleniyor...</div>}
      {values.map((item: any, index: number) => (
        <div
          key={index}
          className={`market-item${
            item.regularMarketChangePercent < 0
              ? " market-item-red"
              : " market-item-green"
          }`}
        >
          <div>{item.shortName}</div>
          <div>{item.bid}</div>
          <div>% {item.regularMarketChangePercent.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default StockMarket;
