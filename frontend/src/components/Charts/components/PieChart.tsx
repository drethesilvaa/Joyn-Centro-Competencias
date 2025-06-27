import { 
    PieChart, 
    Pie, 
    Cell,
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';
import { CHART_COLORS, ChartValue } from '../data/interfaces';

export const MiniPieChart = ({ data }: { data: ChartValue[] }) => (
    <ResponsiveContainer width="100%" height={120}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={40}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                    />
                ))}
            </Pie>
        </PieChart>
    </ResponsiveContainer>
);

export const FullPieChart = ({ data, title }: { data: ChartValue[], title?: string }) => (
    <ResponsiveContainer width="100%" height={400}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                    />
                ))}
            </Pie>
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
            />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
);
