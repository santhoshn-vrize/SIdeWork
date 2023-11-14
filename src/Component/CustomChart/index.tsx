"use client"
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  DoughnutController,
  Tooltip,
  Legend,
  registerables,
} from "chart.js/auto";
import * as Chart from "chart.js/auto";
import styles from "./CustomChart.module.css";

const registry = Chart.registry as any;

type DoughnutChartData = Chart.ChartData<"doughnut", number[], unknown>;

interface CustomizableCardProps {
  title: string;
  chartData: DoughnutChartData;
  activePrLabel: string;
  sumLabel: number;
  backgroundColors: string[];
}

const CustomizableCard: React.FC<CustomizableCardProps> = ({
  title,
  chartData,
  activePrLabel,
  sumLabel,
  backgroundColors,
}) => {

  const dataValues: (number | null)[] = (
    chartData.datasets?.[0]?.data || []
  ).map((value) => (typeof value === "number" ? value : null));

  const customOptions: {
    cutout: string;
    tooltips?: { enabled: boolean };
  } & Chart.ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "87%",
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    tooltips: {
      enabled: false,
    },
    hover: {
      mode: "nearest",
    },
  };

  useEffect(() => {
  
    if (registry && typeof registry.addControllers === "function") {
      registry.addControllers(DoughnutController);
      registry.register(Tooltip, Legend, ...registerables);
    } else {
      console.error("Registry not available or missing expected methods.");
    }
  }, []);
  return (
    <div className={`${styles.card}`}>
      <div className={styles.cardContent}>
        <p>
          <span className={`${styles.label} ${styles.titleText}`}>{title}</span>
        </p>
        <p className={`${styles.label} ${styles.activePrLabel}`}>
          {activePrLabel}
        </p>
        <p className={`${styles.label} ${styles.sumLabel}`}>{sumLabel}</p>
        <div className={styles.chartContent}>
          <Doughnut
            data={chartData}
            options={customOptions}
            className={styles.doughnutChart}
          />
        </div>
      </div>
      <div className={styles.labelContainer}>
        {dataValues.map((value, index) => (
          <div className={styles.labelItem} key={index}>
            <div
              className={styles.chip}
              style={{ backgroundColor: backgroundColors[index] }}
            >
              <div className={styles.labelContainer}>
                <div
                  className={styles.chiplabel}
                  style={{
                    backgroundColor: backgroundColors[index],
                    color: "#333",
                    width: "20px",
                    height: "18px",
                    fontWeight: "600",
                  }}
                >
                 
                  {value?.toString()}
                </div>
              </div>
            </div>
            <div className={styles.labelText}>
              {(chartData.labels?.[index] as React.ReactNode) || ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => (
  <div className={styles.cardContainer}>{children}</div>
);

interface AppProps {
  labels?: string[];
  dataValues?: number[];
  activePrLabel: string;
  title: string;
  sumLabel: number;
}

const App: React.FC<AppProps> = ({
  labels,
  dataValues,
  activePrLabel,
  title,
  sumLabel,
}) => {
  const backgroundColors = [
    "rgba(149, 189, 255, 1)",
    "rgba(248, 229, 164, 1)",
    "rgba(247, 200, 224, 1)",
    "rgba(140, 242, 242, 1)",
    "rgba(255, 192, 179, 1)",
    "rgba(223, 255, 216, 1)",
  ];

  const data1: Chart.ChartData = {
    labels: labels || [
      "New RFQs",
      "Ordered",
      "Quoted RFQs",
      "Order Lost",
      "Declined RFQs",
      "Cancelled",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: dataValues?.map((value) => (value !== null ? value : 0)) || [],
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <CardContainer>
      <CustomizableCard
        title={title}
        chartData={data1 as Chart.ChartData<"doughnut", number[], unknown>}
        activePrLabel={activePrLabel}
        sumLabel={sumLabel}
        backgroundColors={backgroundColors}
      />
    </CardContainer>
  );
};

export default App;