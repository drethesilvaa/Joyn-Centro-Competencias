import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';
import { CHART_COLORS, ChartValue } from '../data/interfaces';

export const MiniBarChart = ({ data }: { data: ChartValue[] }) => (
    <ResponsiveContainer width="100%" height={120}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Bar dataKey="value" fill={CHART_COLORS[0]} radius={[2, 2, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);


export const FullBarChart = ({ data, title }: { data: ChartValue[], title?: string }) => (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
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
            <Bar 
                dataKey="value" 
                fill={CHART_COLORS[0]}
                radius={[4, 4, 0, 0]}
            />
        </BarChart>
    </ResponsiveContainer>
);