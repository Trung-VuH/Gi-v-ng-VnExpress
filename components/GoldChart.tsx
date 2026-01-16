import React, { useState, useMemo } from 'react';
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
import { Calendar, Filter } from 'lucide-react';
import { ComputedGoldProduct, HistoryPoint, TimeRange } from '../types';

interface GoldChartProps {
  products: ComputedGoldProduct[];
  historyData: HistoryPoint[];
}

const COLORS = [
  '#9f224e', // New Brand Color
  '#2563eb', // blue-600
  '#dc2626', // red-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#ea580c', // orange-600
  '#0891b2', // cyan-600
  '#4f46e5', // indigo-600
];

export const GoldChart: React.FC<GoldChartProps> = ({ products, historyData }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(['world_gold', 'sjc_1l']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter history data based on time range
  const filteredData = useMemo(() => {
    const daysMap: Record<TimeRange, number> = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '365d': 365,
    };
    const days = daysMap[timeRange];
    // Get the last N items
    return historyData.slice(-days);
  }, [historyData, timeRange]);

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => {
      if (prev.includes(id)) {
        // Don't allow unselecting the last one
        if (prev.length === 1) return prev;
        return prev.filter(pid => pid !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 mb-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gold-500 rounded-full block"></span>
            Biểu đồ biến động giá vàng
          </h2>
          <p className="text-sm text-gray-500 ml-3.5">Dữ liệu tổng hợp {timeRange === '365d' ? '1 năm' : timeRange.replace('d', ' ngày')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {(['7d', '30d', '90d', '365d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {range === '7d' ? '7 ngày' : range === '30d' ? '30 ngày' : range === '90d' ? '90 ngày' : '1 năm'}
              </button>
            ))}
          </div>
          
          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden p-2 bg-gray-100 rounded-lg text-gray-600"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Product Selection Chips */}
      <div className={`flex flex-wrap gap-2 mb-6 ${isFilterOpen ? 'block' : 'hidden md:flex'}`}>
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => toggleProduct(product.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
              selectedProductIds.includes(product.id)
                ? 'bg-gold-50 border-gold-200 text-gold-700'
                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: selectedProductIds.includes(product.id) ? COLORS[index % COLORS.length] : '#ccc' }}
            ></span>
            {product.name}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="h-[350px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              minTickGap={30}
              tick={{ fill: '#6b7280' }}
            />
            
            {/* Left Axis for VND */}
            <YAxis 
              yAxisId="left"
              domain={['auto', 'auto']}
              tickFormatter={(value) => `${value}`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6b7280' }}
              label={{ value: 'Triệu đồng', angle: -90, position: 'insideLeft', fill: '#9ca3af', style: { textAnchor: 'middle' } }}
            />
            
            {/* Right Axis for USD (World Gold) */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value}`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9ca3af' }}
              label={{ value: 'USD/ounce', angle: 90, position: 'insideRight', fill: '#9ca3af', style: { textAnchor: 'middle' } }}
            />

            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px', padding: '2px 0' }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            {products.map((product, index) => {
              if (!selectedProductIds.includes(product.id)) return null;
              
              // Determine which axis to use
              const isWorld = product.group === 'world';
              const axisId = isWorld ? 'right' : 'left';
              
              return (
                <Line
                  key={product.id}
                  yAxisId={axisId}
                  type="monotone"
                  dataKey={product.id}
                  name={product.name}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-400 italic">
        * Lưu ý: Biểu đồ sử dụng 2 trục giá (Trái: VNĐ, Phải: USD)
      </div>
    </div>
  );
};