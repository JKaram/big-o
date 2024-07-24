import { useEffect, useState } from "react";

interface BarChartProps {
  width: number;
  height: number;
  algoCallback: (arr: number[]) => Promise<number[]>;
  initalData?: number[];
}

const BAR_WIDTH = 60;

const BarChart = ({
  width,
  height,
  algoCallback,
  initalData = [200, 170, 140, 250, 160, 130],
}: BarChartProps) => {
  const [data] = useState(initalData);

  useEffect(() => {
    algoCallback([...data]);
  }, []);

  return (
    <div className="container">
      <svg
        className="viz"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g className="bars">
          {data.map((d, i) => (
            <rect
              id={`rect${d}`}
              fill="#6baed6"
              height={d}
              key={i}
              width={BAR_WIDTH}
              x={i * (BAR_WIDTH + 5)}
              y={height - d}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default BarChart;
