import React from 'react';
import { ComputedGoldProduct, HistoryPoint, Trend } from '../types';
import { Sparkline } from './Sparkline';

interface GoldCardProps {
  product: ComputedGoldProduct;
  historyData: HistoryPoint[];
  onClick?: () => void;
}

export const GoldCard: React.FC<GoldCardProps> = ({ product, historyData, onClick }) => {
  const isWorld = product.group === 'world';
  
  // Determine overall trend for chart color (using Sell price trend)
  const chartTrend = product.trendSell === Trend.UP ? 'up' : product.trendSell === Trend.DOWN ? 'down' : 'flat';

  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between py-3 px-3 border-b border-gray-100 last:border-0 h-[72px] active:bg-gray-50 cursor-pointer transition-colors"
    >
      {/* COLUMN 1: Name & Unit */}
      <div className="flex flex-col justify-center w-[30%] pr-2">
        <h3 className="font-bold text-xs text-gray-900 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-400 mt-1 truncate">{product.unit}</p>
      </div>

      {/* COLUMN 2: Buy & Sell Prices */}
      <div className="flex flex-col justify-center items-end w-[35%] pr-3">
        {/* Buy Price */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-medium text-gray-400 tracking-tight">Mua</span>
          <div className="flex items-center">
             <span className={`text-xs font-bold tabular-nums ${!isWorld && product.trendBuy === Trend.UP ? 'text-green-600' : !isWorld && product.trendBuy === Trend.DOWN ? 'text-red-600' : 'text-gray-900'}`}>
              {product.today.buy.toLocaleString('vi-VN')}
            </span>
          </div>
        </div>

        {/* Sell Price */}
        <div className="flex items-center gap-2">
           <span className="text-[10px] uppercase font-medium text-gray-400 tracking-tight">Bán</span>
           <div className="flex items-center">
             <span className={`text-xs font-bold tabular-nums ${!isWorld && product.trendSell === Trend.UP ? 'text-green-600' : !isWorld && product.trendSell === Trend.DOWN ? 'text-red-600' : 'text-gray-900'}`}>
              {product.today.sell.toLocaleString('vi-VN')}
            </span>
           </div>
        </div>
      </div>

      {/* COLUMN 3: Sparkline Chart */}
      <div className="w-[35%] flex justify-end">
        <Sparkline 
          data={historyData} 
          dataKey={product.id} 
          trend={chartTrend} 
        />
      </div>
    </div>
  );
};