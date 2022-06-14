import React, { useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from 'recharts'

const Plot = ({ data }) => {
    useEffect(() => { data.forEach(i => { i.createdAt = new Date(i.createdAt).toLocaleString() }) }, [data])
    function CustomTooltip({ payload, label, active }) {
        if (active && payload[0]) {
            return (
                <div className="custom-tooltip" style={{}}>
                    <p className="price">{`Цена: ${payload[0].value}`}</p>
                    <p className="date">{label}</p>
                    <p className="size">{`Размер: ${payload[0].payload.size}`}</p>
                </div>
            );
        }

        return null;
    }

    return (
        <LineChart
            width={1250}
            height={500}
            data={data}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
            <CartesianGrid stroke="#ffffff" />
            <XAxis dataKey="createdAt" stroke="#ffffff" />
            <YAxis dataKey="price" stroke="#ffffff" />
            <Tooltip wrapperStyle={{
                height: 130,
                width: 100,
                color: "#cb22d1",
                backgroundColor: '#000000',
                boxShadow: "0 0 10px #cb22d1",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#cb22d1"
            }}
                content={<CustomTooltip />}
            />
            <Line type="linear" dataKey="price" stroke="#cb22d1" strokeWidth={4} activeDot={{ strokeWidth: 4, r: 4 }} />
        </LineChart>
    );
};
export default Plot;