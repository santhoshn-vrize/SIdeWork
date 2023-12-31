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
      style={{
        width: "449.58px",
        height: "139.46px",
        top: "0px",
        left: "0px",
        borderRadius: "9.75px",
        boxShadow:
          "0px 3.9008703231811523px 19.504350662231445px 0px #00000040",
        marginLeft: "0px",
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
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "90px",

          marginTop: "-5px",
        }}
      >
        <p>
          <span
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

        <p
          style={{
            position: "relative",
            fontWeight: "00",
            color: "white",
            fontFamily: "Poppins",
            width: "100px",
            height: "18px",
            left: "23px",
            top: "10.5px",
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
            width: "32px",
            height: "27px",
            color: "white",
            fontFamily: "Poppins",
            top: "5.7px",
            fontSize: "19px",
            transform: "translateY(-50%)",
            left: "59px",
            textAlign: "center",
            lineHeight: "27px",
          }}
        >
          {sumLabel}
        </p>

        <div style={{ width: "160.45px", height: "110.45px" }}>
          <Doughnut
            data={chartData}
            options={customOptions}
            style={{
              width: "100% ",
              height: "100%",
              marginLeft: "19px",
              marginRight: "30px",
              marginTop: "-105px",
            }}
          />
        </div>
      </div>
      <div
        style={{
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
  );
};

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => (
  <div>{children}</div>
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
    </CardContainer>
  );
};

export default CustomGraph;
