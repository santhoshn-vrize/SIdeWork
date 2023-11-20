"use client";
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  DoughnutController,
  registerables as _registerables,
  ChartComponent,
} from "chart.js/auto";
import { Registry, ChartComponentLike } from "chart.js/auto";
import * as Chart from "chart.js/auto";

type DoughnutChartData = Chart.ChartData<"doughnut", number[], unknown>;

interface ExtendedRegistry extends Registry {
  register(...controllers: ChartComponentLike[]): void;
  addControllers(...controllers: ChartComponentLike[]): void;
}

const registry = Chart.registry as ExtendedRegistry;

interface CustomizableCardProps {
  title: string;
  chartData: DoughnutChartData;
  activePrLabel: string;
  sumLabel: number;
  backgroundColors: string[];
  graphbgurl: string;
}

const CustomizableCard: React.FC<CustomizableCardProps> = ({
  title,
  chartData,
  activePrLabel,
  sumLabel,
  backgroundColors,
  graphbgurl,
}) => {
  const dataValues: (number | null)[] = (
    chartData.datasets?.[0]?.data || []
  ).map((value: number | null) => (typeof value === "number" ? value : null));

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
      registry.addControllers(DoughnutController as ChartComponent);
      return;
    }

    if (registry && "register" in registry) {
      const extendedRegistry = registry as ExtendedRegistry;
      (_registerables as ChartComponent[]).forEach((item) =>
        extendedRegistry.register(item)
      );
    }
  }, []);

  return (
    <div
      // className="customizable-card"
      style={{
        width: "100%", // Set the width to 100% for smaller screens
        maxWidth: "33.3%", // Set the max-width to 33.3% for larger screens
        height: "139.46px",
        top: "0px",
        left: "0px",
        borderRadius: "9.75px",
        boxShadow:
          "0px 3.9008703231811523px 19.504350662231445px 0px #00000040",
        margin: "0 10px", // Add some margin between cards
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginTop: "0px",
        backgroundImage: `url(${graphbgurl})`,
        backgroundSize: "cover",
        backgroundAttachment: "scroll, local",
        backgroundPosition: "center",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
        overflow: "hidden",
      }}
    >
      <div
        // className="card-content"
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "90px",

          marginTop: "-5px",
        }}
      >
        <p>
          <span
            className="card-title"
            style={{
              position: "absolute",
              width: "130px",
              top: "15.94px",
              left: "228px",
              transform: "translateX(-50%)",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "18px",
              letterSpacing: "0em",
              textAlign: "left",
              color: "#FFFFFF",
              marginBottom: "10px",
            }}
          >
            {title}
          </span>
        </p>
        <div style={{ height: "110.45px", width: "200%" }}>
          <Doughnut
            data={chartData}
            options={customOptions}
            style={{
              // width: "100% ",
              // height: "100%",
              marginLeft: "20px",
              marginRight: "25px",
              marginTop: "-7%",
            }}
          />
        </div>
        <p
          // className="active-label"
          style={{
            position: "relative",
            fontWeight: "00",
            color: "white",
            fontFamily: "Poppins",
            width: "90%",
            height: "18px",
            right: "20%",
            left: "2%",
            top: "-90px",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {activePrLabel}
        </p>

        <p
          style={{
            position: "relative",
            fontWeight: 200,
            width: "90%",
            height: "27px",
            color: "white",
            fontFamily: "Poppins",
            top: "-96px",
            fontSize: "19px",
            transform: "translateY(-50%)",
            left: "2%",
            textAlign: "center",
            lineHeight: "27px",
          }}
        >
          {sumLabel}
        </p>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "0px",
          paddingTop: "40px",
          paddingBottom: "0px",
          height: "auto",
          fontFamily: "Poppins",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          maxHeight: "110px",
          gap: "0px 10px",
        }}
      >
        {dataValues.map((value, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              color: "aliceblue",
              alignItems: "center",

              marginBottom: "2px",
              fontFamily: "Poppins",
            }}
          >
            <div
              style={{
                width: "24px",

                height: "18px",
                padding: "1.95px 8.8px",
                borderRadius: "12.19px",
                gap: "9.75px",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: "5px",
                fontFamily: "Poppins",
                backgroundColor: backgroundColors[index],
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  lineHeight: "10px",
                  letterSpacing: "0em",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Poppins",
                  backgroundColor: backgroundColors[index],
                  color: "#333",
                  width: "22px",
                  height: "20px",
                }}
              >
                {value?.toString()}
              </div>
            </div>
            <div
              style={{
                marginLeft: "5px",
                fontSize: "10px",
                fontFamily: "Poppins",
                fontWeight: "65px",
                lineHeight: "15px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#FFFFFF",
                marginTop: "-5px",
              }}
            >
              {(chartData.labels?.[index] as React.ReactNode) || ""}
            </div>
          </div>
        ))}
      </div>
    </div>
    //   </div>
    // </div>
  );
};

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between", // You can adjust this based on your layout preferences
      width: "100%", // Adjust the width as needed
    }}
  >
    {children}
  </div>
);

interface AppProps {
  labels?: string[];
  dataValues?: number[];
  activePrLabel: string;
  title: string;
  sumLabel: number;
  graphbgurl: string;
}

const CustomGraph: React.FC<AppProps & { graphbgurl: string }> = ({
  labels,
  dataValues,
  activePrLabel,
  title,
  sumLabel,
  graphbgurl,
}) => {
  const backgroundColors = [
    "rgba(149, 189, 255, 1)",
    "rgba(248, 229, 164, 1)",
    "rgba(247, 200, 224, 1)",
    "rgba(140, 242, 242, 1)",
    "rgba(255, 192, 179, 1)",
    "rgba(223, 255, 216, 1)",
  ];

  useEffect(() => {
    const linkElement = document.createElement("link");
    linkElement.href = "https://fonts.googleapis.com/css?family=Poppins";
    linkElement.rel = "stylesheet";
    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);

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
        graphbgurl={graphbgurl}
      />
      <CustomizableCard
        title={title}
        chartData={data1 as Chart.ChartData<"doughnut", number[], unknown>}
        activePrLabel={activePrLabel}
        sumLabel={sumLabel}
        backgroundColors={backgroundColors}
        graphbgurl={graphbgurl}
      />
      <CustomizableCard
        title={title}
        chartData={data1 as Chart.ChartData<"doughnut", number[], unknown>}
        activePrLabel={activePrLabel}
        sumLabel={sumLabel}
        backgroundColors={backgroundColors}
        graphbgurl={graphbgurl}
      />
    </CardContainer>
  );
};

export default CustomGraph;
