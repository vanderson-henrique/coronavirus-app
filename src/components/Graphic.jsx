import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function Graphic({ data }) {
  return (
    <LineChart width={1000} height={400} data={data} className='container-graphic'>
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  )
};

export default Graphic;
