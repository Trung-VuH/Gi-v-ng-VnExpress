import React from 'react';
import { ComputedGoldProduct } from '../types';
import { TrendIndicator } from './TrendIndicator';

interface GoldCardProps {
  product: ComputedGoldProduct;
}

export const GoldCard: React.FC<GoldCardProps> = ({ product }) => {
  return (
    <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.unit}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* BUY COLUMN */}
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Giá Mua</p>
          <div className="text-lg font-bold text-gray-900 tabular-nums">
            {product.today.buy.toLocaleString('vi-VN')}
          </div>
          <div className="mt-1">
            <TrendIndicator 
              trend={product.trendBuy} 
              value={product.changeBuy} 
              percent={product.percentBuy} 
            />
          </div>
        </div>

        {/* SELL COLUMN */}
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Giá Bán</p>
          <div className="text-lg font-bold text-gray-900 tabular-nums">
            {product.today.sell.toLocaleString('vi-VN')}
          </div>
          <div className="mt-1">
            <TrendIndicator 
              trend={product.trendSell} 
              value={product.changeSell} 
              percent={product.percentSell} 
            />
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-dashed border-gray-200 text-xs text-gray-500">
         <div className="flex justify-between mb-1">
             <span className="text-gray-400">Chênh lệch mua/bán:</span>
             <span className="text-gray-700 font-medium">{product.spread.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}</span>
         </div>
         <div className="flex justify-between items-end">
             <span className="text-gray-400">Hôm qua:</span>
             <div className="flex gap-3">
                <span>Mua <span className="text-gray-700 font-medium">{product.yesterday.buy.toLocaleString('vi-VN')}</span></span>
                <span className="text-gray-300">|</span>
                <span>Bán <span className="text-gray-700 font-medium">{product.yesterday.sell.toLocaleString('vi-VN')}</span></span>
             </div>
         </div>
      </div>
    </div>
  );
};