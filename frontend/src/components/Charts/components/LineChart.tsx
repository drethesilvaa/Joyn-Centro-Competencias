import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { CHART_COLORS, ChartValue } from '../data/interfaces';

export const MiniLineChart = ({ data }: { data: ChartValue[] }) => (
    <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Line
                type="monotone"
                dataKey="value"
                stroke={CHART_COLORS[1]}
                strokeWidth={2}
                dot={false}
            />
        </LineChart>
    </ResponsiveContainer>
);

export const FullLineChart = ({ data }: { data: ChartValue[], title?: string }) => (
    <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
                contentStyle={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
            />
            <Legend />
            <Line
                type="monotone"
                dataKey="value"
                stroke={CHART_COLORS[1]}
                strokeWidth={3}
                dot={{ fill: CHART_COLORS[1], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: CHART_COLORS[1], strokeWidth: 2 }}
            />
        </LineChart>
    </ResponsiveContainer>
);