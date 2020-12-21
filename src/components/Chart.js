import React, { useEffect, useState, useRef } from "react";
import "./LineChart.css";
import LineChart from "./LineChart";

export default function Chart() {
  const [data, setData] = useState([
    { y: "1.67" },
    { y: "4.2" },
    { y: "3.8" },
    { y: "8.1" },
    { y: "5.3" },
    { y: "7.2" },
    { y: "9.1" },
    { y: "1.8" },
    { y: "0.2" },
    { y: "6.4" },
    { y: "10.0" },
    { y: "7.6" },
    { y: "8.2" },
    { y: "8.1" },
    { y: "4.1" },
    { y: "9.2" },
    { y: "3.7" },
    { y: "2.4" },
    { y: "9.9" },
    { y: "2.8" }
  ]);
  const savedCallback = useRef();

  function callback() {
    if (data.length >= 20) data.shift();
    //console.log(data)
    setData(datas => [...datas, {y: Math.floor(Math.random()*10)}])
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);


  return (
    <div className="Chart">
      <LineChart data={data} />
    </div>
  );
}
