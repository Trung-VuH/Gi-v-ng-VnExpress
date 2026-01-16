import React from 'react';
import { ComputedGoldProduct } from '../types';
import { TrendIndicator } from './TrendIndicator';

interface GoldCardProps {
  product: ComputedGoldProduct;
}

export const GoldCard: React.FC<GoldCardProps> = ({ product }) => {
  const isWorld = product.group === 'world';

  return (
    <div className="p-3 rounded-xl border border-gray-100 bg-white shadow-sm mb-2">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
          <p className="text-[10px] text-gray-500">{product.unit}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* BUY COLUMN */}
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-[10px] text-gray-500 mb-0.5 uppercase tracking-wide">Giá Mua</p>
          <div className="text-base font-bold text-gray-900 tabular-nums">
            {product.today.buy.toLocaleString('vi-VN')}
          </div>
          {!isWorld && (
            <div className="mt-0.5">
              <TrendIndicator 
                trend={product.trendBuy} 
                value={product.changeBuy} 
              />
            </div>
          )}
        </div>

        {/* SELL COLUMN */}
        <div className="bg-gray-50 p-2 rounded-lg">
          <p className="text-[10px] text-gray-500 mb-0.5 uppercase tracking-wide">Giá Bán</p>
          <div className="text-base font-bold text-gray-900 tabular-nums">
            {product.today.sell.toLocaleString('vi-VN')}
          </div>
          {!isWorld && (
            <div className="mt-0.5">
              <TrendIndicator 
                trend={product.trendSell} 
                value={product.changeSell} 
              />
            </div>
          )}
        </div>
      </div>
      
      {!isWorld && (
        <div className="mt-2 pt-2 border-t border-dashed border-gray-200 text-xs text-gray-500">
           <div className="flex justify-between items-end">
               <span className="text-gray-400 text-[10px]">Hôm qua:</span>
               <div className="flex gap-2 text-[11px]">
                  <span>Mua <span className="text-gray-700 font-medium">{product.yesterday.buy.toLocaleString('vi-VN')}</span></span>
                  <span className="text-gray-300">|</span>
                  <span>Bán <span className="text-gray-700 font-medium">{product.yesterday.sell.toLocaleString('vi-VN')}</span></span>
               </div>
           </div>
        </div>
      )}
    </div>
  );
};