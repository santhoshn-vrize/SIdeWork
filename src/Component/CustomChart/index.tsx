import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js/auto";
import styles from "./CustomChart.module.css";

Chart.register(ArcElement, Tooltip, Legend);

const CustomizableCard = ({ title, chartData, activePrLabel, sumLabel }) => {
  const backgroundColors = chartData.datasets[0].backgroundColor;
  const dataValues = chartData.datasets[0].data;

  const sum = dataValues.reduce((acc, value) => acc + value, 0);

  const customOptions = {
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
              {value.toString()}
            </div>
            <div className={styles.labelText}>{chartData.labels[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardContainer = ({ children }) => (
  <div className={styles.cardContainer}>{children}</div>
);
// ... (previous imports)

const App = ({ labels, dataValues, activePrLabel, title }) => {
  const data1 = {
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

  const calculateSumLabel = (data) => {
    const sum = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
    return `${sum}`;
  };

  return (
    <CardContainer>
      <CustomizableCard
        chartData={data1}
        title={title}
        activePrLabel={activePrLabel}
        sumLabel={calculateSumLabel(data1)}
      />
    </CardContainer>
  );
};

export default App;
