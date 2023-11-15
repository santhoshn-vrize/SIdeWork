import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import GraphChart from "../Component/CustomChart";
import { Doughnut, Chart } from "react-chartjs-2";
// import Graph from "../Component/Chart"
const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const labels = [
    "New RFQs",
    "Ordered",
    "Quoted RFQs",
    "Order Lost",
    "Declined RFQs",
    "Cancelled",
  ]; // default label
  const dataValues = [282, 132, 124, 233, 120, 156]; // default values
  const activePrLabel = "# RFQs"; // default value
  const title = "Summary of RFQs"; // default value
  const sumLabel = 747; // default value
  return (
    <>
      <GraphChart
        labels={labels}
        dataValues={dataValues}
        activePrLabel={activePrLabel}
        title={title}
        sumLabel={sumLabel}
      />
      {/* <Graph
        labels={labels}
        dataValues={dataValues}
        activePrLabel={activePrLabel}
        title={title}
        sumLabel={sumLabel}
      /> */}
      
    </>
  );
};

export default Home;
