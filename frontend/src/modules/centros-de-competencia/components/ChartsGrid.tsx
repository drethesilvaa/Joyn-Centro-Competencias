import { Chart, ChartModal } from "@/components/Charts";

export const ChartsGrid = ({ charts }: { charts: Chart[] }) => {
    if (!charts || charts.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No charts available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {charts.map((chart, index) => (
                <ChartModal
                    key={index}
                    chart={chart}
                />
            ))}
        </div>
    );
};