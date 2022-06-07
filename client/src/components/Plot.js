import React, { useEffect } from 'react';
import { PlaceholderButton } from 'react-bootstrap';
import { LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from 'recharts'

const Plot = ({ data }) => {
    useEffect(() => { data.forEach(i => { i.createdAt = new Date(i.createdAt).toLocaleString() }) }, [data])
    function CustomTooltip({ payload, label, active, size }) {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ color: "#cb22d1" }}>
                    <p className="price">{`Цена: ${payload[0].value}`}</p>
                    <p className="date">{label}</p>
                    {/* <p className="size">{`Размер: ${size}`}</p> */}
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
            <Tooltip wrapperStyle={{ height: 128, width: 100, backgroundColor: '#000000' }} content={<CustomTooltip size={4} />} />
            <Line type="linear" dataKey="price" stroke="#cb22d1" strokeWidth={4} activeDot={{ strokeWidth: 4, r: 4 }} />
        </LineChart>
    );
};
export default Plot;