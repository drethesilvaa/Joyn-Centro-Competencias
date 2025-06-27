import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '@phosphor-icons/react/dist/ssr';
import { ChartModalProps } from './data/interfaces';
import { FullBarChart, MiniBarChart } from './components/BarChart';
import { FullLineChart, MiniLineChart } from './components/LineChart';
import { FullPieChart, MiniPieChart } from './components/PieChart';


const ChartModal = ({ chart, className = "" }: ChartModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { chartType, values, title } = chart;

    if (!values || values.length === 0) {
        return (
            <div className={`p-4 bg-gray-100 rounded-lg ${className}`}>
                <p className="text-center text-gray-500 text-sm">No data available</p>
            </div>
        );
    }

    // Render mini chart based on type
    const renderMiniChart = () => {
        switch (chartType) {
            case 'bar':
                return <MiniBarChart data={values} />;
            case 'line':
                return <MiniLineChart data={values} />;
            case 'pie':
                return <MiniPieChart data={values} />;
            default:
                return <div className="flex items-center justify-center h-[120px] bg-gray-100 rounded">
                    <span className="text-gray-400 text-sm">Unknown chart type</span>
                </div>;
        }
    };

    // Render full chart based on type
    const renderFullChart = () => {
        switch (chartType) {
            case 'bar':
                return <FullBarChart data={values} title={title} />;
            case 'line':
                return <FullLineChart data={values} title={title} />;
            case 'pie':
                return <FullPieChart data={values} title={title} />;
            default:
                return <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded">
                    <span className="text-gray-400">Unknown chart type</span>
                </div>;
        }
    };

    return (
        <>
            {/* Mini Chart Card */}
            <motion.div
                className={`grid bg-white rounded-lg shadow-md border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-shadow ${className}`}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
            >
                {title && (
                    <h4 className="body-xl font-medium mb-2">
                        {title}
                    </h4>
                )}
                <div className="relative">
                    {renderMiniChart()}
                    {/* Overlay to indicate it's clickable */}
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-200 rounded flex items-center justify-center">
                        <motion.div
                            className="opacity-0 hover:opacity-100 bg-white bg-opacity-90 rounded-full p-2 shadow-lg"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                                duration: 0.4
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {title || 'Chart Details'}
                                </h2>
                                <motion.button
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <XIcon className="w-6 h-6 text-gray-500" />
                                </motion.button>
                            </div>

                            {/* Chart Content */}
                            <div className="p-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                >
                                    {renderFullChart()}
                                </motion.div>
                            </div>

                            {/* Footer with data summary */}
                            <div className="px-6 pb-6">
                                <motion.div
                                    className="bg-gray-50 rounded-lg p-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.3 }}
                                >
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Data Summary</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Total Points:</span>
                                            <span className="ml-2 font-medium">{values.length}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Max Value:</span>
                                            <span className="ml-2 font-medium">
                                                {Math.max(...values.map(v => v.value))}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Min Value:</span>
                                            <span className="ml-2 font-medium">
                                                {Math.min(...values.map(v => v.value))}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Chart Type:</span>
                                            <span className="ml-2 font-medium capitalize">{chartType}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChartModal