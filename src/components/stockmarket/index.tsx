import axios from "axios";
import React, { useEffect, useState } from "react";

const StockMarket = () => {
  const [values, setValues] = useState<object[]>([]);
  useEffect(() => {
    async function getValues() {
      try {
        const res: any = await axios.get(
          "https://query1.finance.yahoo.com/v7/finance/quote?symbols=USDTRY=X,eurtry=x"
        );
        setValues(res.quoteResponse.result);
      } catch (error) {}
    }
    let intervalID = setInterval(getValues, 5000);
    return () => clearInterval(intervalID);
  }, []);
  console.log(values);

  return (
    <div>
      {values.map((item: any, index: number) => (
        <div key={index}>
          <div>{item.symbol}</div>
          <div>{item.bid}</div>
          <div>{item.regularMarketChangePercent}</div>
        </div>
      ))}
    </div>
  );
};

export default StockMarket;
