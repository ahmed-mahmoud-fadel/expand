"use client"

import { Chart, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import Card from './Card';

Chart.register(...registerables);

const TrafficGraph = ({
  data,
}: {
  data: number[],
}) => {
  return (
    <Card>
      <div className="flex flex-col">
        <p className="font-semibold text-lg">Traffic</p>
        <Line
          height="100%"
          className="text-white"
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Traffic",
                data: data,
              },
            ],
          }}
        />
      </div>
    </Card>
  );
}

export default TrafficGraph;