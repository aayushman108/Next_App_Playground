"use client";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Rectangle,
  BarProps,
  Legend,
} from "recharts";
import styles from "./barChart.module.scss";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function BarChartPage() {
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const barChartRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [barSize, setBarSize] = useState<number>(50);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [activeBar, setActiveBar] = useState<number | null>(null);

  useEffect(() => {
    const callback = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      const barChartWidth = entry.contentRect.width;
      setBarSize(barChartWidth / 25);
    };
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(callback);
    }

    if (barChartRef.current) {
      resizeObserverRef.current.observe(barChartRef.current);
    }

    const barChartDiv = barChartRef.current;

    return () => {
      if (barChartDiv) {
        resizeObserverRef.current?.unobserve(barChartDiv);
      }
    };
  }, []);

  // MARK: RENDER SHAPE
  const renderShape = useCallback(
    (props: BarProps) => {
      // eslint-disable-next-line react/prop-types
      const { x, y, width, height, fill, index } = props;

      return (
        <Rectangle
          x={Number(x)}
          y={Number(y)}
          width={width}
          height={height}
          fill={activeBar === index ? "blue" : fill}
          onMouseEnter={() => {
            setTooltipPosition({ x: Number(x), y: Number(y) });
            setShowTooltip(true);
            setActiveBar(index as number);
          }}
          onMouseLeave={() => {
            setShowTooltip(false);
            setActiveBar(null);
          }}
        />
      );
    },
    [activeBar]
  );

  // MARK: RENDER TOOLTIP
  const renderTooltip = (props: any) => {
    if (!props.active) {
      return;
    }

    const tooltip =
      tooltipRef.current && tooltipRef.current.getBoundingClientRect();

    const box =
      barChartRef.current && barChartRef.current.getBoundingClientRect();

    const tooltipWidth = Math.max((box?.width && box.width / 1.5) || 250, 250);

    // eslint-disable-next-line react/prop-types
    const { name, uv, pv, amt } = props.payload[0].payload;

    let tooltipContainerStyles;

    tooltipContainerStyles = {
      position: "absolute",
      left: tooltipPosition.x + barSize / 2,
      top: tooltipPosition.y,
      transform: `translate(-50%, -100%)`,
      // border: "2px solid yellow",
      width: tooltipWidth,
      display: "flex",
      justifyContent:
        tooltip?.right && box?.right && box?.right < tooltip.right
          ? "start"
          : box?.x && tooltip?.x && box?.x - tooltip?.x > 0
          ? "end"
          : "center",
    };

    return (
      <div
        className={styles.tooltip}
        style={tooltipContainerStyles as CSSProperties}
        ref={tooltipRef}
      >
        <div>
          <div
            className={styles.tooltip_content}
            style={{
              marginBottom: barSize / 3,
              width: tooltipWidth && (tooltipWidth * 4) / 7,
            }}
          >
            <p>Name Name: {name}</p>
            <p>UV: {uv}</p>
            <p>PV: {pv}</p>
            <p>Amt: {amt}</p>
          </div>
        </div>
        <BiSolidDownArrow
          fontSize={barSize / 2}
          className={styles.arrow_icon}
          color="blue"
        />
      </div>
    );
  };

  return (
    <main className={styles.bar_chart_page}>
      <section className={`${styles.bar_chart__section}`}>
        <div className={`${styles.bar_chart__section__one}`} ref={barChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              //   width={500}
              //   height={300}
              data={data}
              margin={{
                top: barSize * 4,
                right: 10,
                left: 30,
                bottom: 30,
              }}
              barSize={barSize}
            >
              {/* X-AXIS */}
              <XAxis
                dataKey="name"
                scale="auto"
                // padding={{ left: barSize, right: barSize }} //each should be atleast half of the barSize
                // height={100}
                strokeWidth={1}
                fontSize="0.75em"
              >
                <Label
                  value="Pages of my website"
                  offset={-20}
                  position="insideBottom"
                  fontSize="1em"
                />
              </XAxis>

              {/* Y-AXIS */}
              <YAxis strokeWidth={1} fontSize="0.75em">
                <Label
                  value="Pages of my website"
                  offset={-10}
                  position="insideLeft"
                  fontSize="1em"
                  angle={-90}
                  origin={0}
                  textRendering={10}
                  dy={3 * barSize}
                />
              </YAxis>

              {/* TOOLTIP */}
              <Tooltip
                content={renderTooltip}
                cursor={false}
                position={tooltipPosition}
                active={showTooltip}
              />

              {/* LEGEND */}
              <Legend verticalAlign="top" iconSize={(barSize * 2) / 3} />

              {/* CARTESIAN GRID */}
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <CartesianGrid strokeWidth={0.4} height={0.1} widths="100%" />

              {/* BAR */}
              <Bar
                dataKey="pv"
                fill="#8884d8"
                background={{ fill: "transparent" }}
                shape={renderShape}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
