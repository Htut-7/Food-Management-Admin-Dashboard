import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import "../css/Chart.css";

const data = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 320 },
  { name: 'Apr', uv: 200 },
  { name: 'May', uv: 278 },
  { name: 'Jun', uv: 189 },
];

export default function Chart() {
  return (
    <div className="chart-box">
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#444" strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip 
          contentStyle={{ backgroundColor: "#000", border: "1px solid #fff" }}
          labelStyle={{ color: "#fff" }}
        />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#fff" strokeWidth={2} />
      </LineChart>
    </div>
  );
}