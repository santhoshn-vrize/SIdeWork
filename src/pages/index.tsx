import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Chart from "../Component/CustomChart";

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
  const dataValues = [132, 130, 124, 115, 120, 126]; // default values
  const activePrLabel = "# RFQs"; // default value
  const title = "Summary of RFQs"; // default value
  return (
    <>
      <Chart
        labels={labels}
        dataValues={dataValues}
        activePrLabel={activePrLabel}
        title={title}
      />
    </>
  );
};

export default Home;
