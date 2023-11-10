import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, DoughnutController, Tooltip, Legend } from "chart.js/auto";
import styles from "./CustomChart.module.css";

const plugins = [DoughnutController, Tooltip, Legend];

interface CustomizableCardProps {
  title: string;
  chartData: Chart.ChartData;
  activePrLabel: string;
  sumLabel: string;
}

const CustomizableCard: React.FC<CustomizableCardProps> = ({
  title,
  chartData,
  activePrLabel,
  sumLabel,
}) => {
  const backgroundColors = chartData.datasets?.[0]?.backgroundColor || [];
  const dataValues = chartData.datasets?.[0]?.data || [];

  const sum = dataValues.reduce((acc, value) => acc + (value || 0), 0);

  const customOptions: Chart.ChartOptions = {
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
      mode: null,
    },
  };

  useEffect(() => {
    plugins.forEach((plugin) => Chart.register(plugin));
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
          <div key={index} className={styles.labelItem}>
            <div
              className={styles.chip}
              style={{ backgroundColor: backgroundColors[index] }}
            >
              {value?.toString()}
            </div>
            <div className={styles.labelText}>{chartData.labels?.[index]}</div>
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
}

const App: React.FC<AppProps> = ({
  labels,
  dataValues,
  activePrLabel,
  title,
}) => {
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
        data: dataValues || [282, 132, 124, 233, 120, 156],
        backgroundColor: [
          "rgba(149, 189, 255, 1)",
          "rgba(248, 229, 164, 1)",
          "rgba(247, 200, 224, 1)",
          " rgba(140, 242, 242, 1)",
          "rgba(255, 192, 179, 1)",
          "rgba(223, 255, 216, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const calculateSumLabel = (data: Chart.ChartData) => {
    const sum = data.datasets?.[0]?.data.reduce(
      (acc: number, value: number) => acc + (value || 0),
      0
    );
    return `${sum}`;
  };

  return (
    <CardContainer>
      <CustomizableCard
        title={title}
        chartData={data1}
        activePrLabel={activePrLabel}
        sumLabel={calculateSumLabel(data1)}
      />
    </CardContainer>
  );
};

export default App;
