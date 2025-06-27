// Types
export interface ChartValue {
    name: string;
    value: number;
}

export interface Chart {
    title?: string;
    chartType: 'bar' | 'line' | 'pie';
    values: ChartValue[];
}

export interface ChartModalProps {
    chart: Chart;
    className?: string;
}

// Color palette
export const CHART_COLORS = [
    '#101b23', '#004552', '#007472', '#2f3847',
    '#56566c', '#847690', '#3b464f', '#28131f'
];