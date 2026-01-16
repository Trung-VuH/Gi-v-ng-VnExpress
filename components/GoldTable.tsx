import React from 'react';
import { ComputedGoldProduct } from '../types';
import { TrendIndicator } from './TrendIndicator';

interface GoldTableProps {
  data: ComputedGoldProduct[];
}

export const GoldTable: React.FC<GoldTableProps> = ({ data }) => {
  // Extract date from the first item
  const updatedAt = data[0]?.updatedAt || '';
  // Format based on "09:15 16/01/2026"
  const dateParts = updatedAt.split(' ');
  const todayDateStr = dateParts[1] || '16/01/2026';
  
  // Calculate yesterday's date string
  const getYesterdayStr = (today: string) => {
    try {
      const [d, m, y] = today.split('/').map(Number);
      const date = new Date(y, m - 1, d);
      date.setDate(date.getDate() - 1);
      const dStr = String(date.getDate()).padStart(2, '0');
      const mStr = String(date.getMonth() + 1).padStart(2, '0');
      return `${dStr}/${mStr}/${date.getFullYear()}`;
    } catch (e) {
      return '15/01/2026';
    }
  }
  const yesterdayDateStr = getYesterdayStr(todayDateStr);

  // Split data
  const worldGold = data.find(p => p.group === 'world');
  const domesticGold = data.filter(p => p.group !== 'world');

  const renderRow = (product: ComputedGoldProduct) => (
    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-3 py-3 md:px-4 md:py-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-gray-900">
              {product.name}
            </div>
            {product.group === 'world' && (
              <div className="text-xs text-gray-500 mt-0.5 font-normal">
                {product.unit}
              </div>
            )}
          </div>
        </div>
      </td>
      
      {/* Today Buy */}
      <td className="px-2 py-3 md:px-4 md:py-4 text-right bg-white/50">
        <div className="font-bold text-gray-900 text-base tabular-nums whitespace-nowrap">
          {product.today.buy.toLocaleString('vi-VN')}
        </div>
        <div className="flex justify-end mt-1">
          <TrendIndicator trend={product.trendBuy} value={product.changeBuy} percent={product.percentBuy} />
        </div>
      </td>

      {/* Today Sell */}
      <td className="px-2 py-3 md:px-4 md:py-4 text-right bg-white/50">
        <div className="font-bold text-gray-900 text-base tabular-nums whitespace-nowrap">
          {product.today.sell.toLocaleString('vi-VN')}
        </div>
        <div className="flex justify-end mt-1">
          <TrendIndicator trend={product.trendSell} value={product.changeSell} percent={product.percentSell} />
        </div>
      </td>

      {/* Yesterday Buy */}
      <td className="px-2 py-3 md:px-4 md:py-4 text-right text-gray-500 tabular-nums bg-gray-50/50 whitespace-nowrap">
         {product.yesterday.buy.toLocaleString('vi-VN')}
      </td>

       {/* Yesterday Sell */}
      <td className="px-2 py-3 md:px-4 md:py-4 text-right text-gray-500 tabular-nums bg-gray-50/50 whitespace-nowrap">
         {product.yesterday.sell.toLocaleString('vi-VN')}
      </td>

      {/* Spread */}
      <td className="px-3 py-3 md:px-4 md:py-4 text-right text-gray-600 tabular-nums hidden lg:table-cell whitespace-nowrap">
         {product.spread.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}
      </td>
    </tr>
  );

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th rowSpan={2} className="px-3 md:px-4 py-4 font-semibold text-gray-900 align-middle border-r border-gray-200 bg-gray-50 whitespace-nowrap">Sản phẩm</th>
              <th colSpan={2} className="px-2 py-2 font-semibold text-gray-900 text-center border-r border-gray-200 bg-gray-100 whitespace-nowrap">
                Hôm nay <span className="text-gray-500 text-xs font-normal inline-block ml-1">({todayDateStr})</span>
              </th>
              <th colSpan={2} className="px-2 py-2 font-semibold text-gray-600 text-center border-r border-gray-200 bg-gray-100 whitespace-nowrap">
                Hôm qua <span className="text-gray-500 text-xs font-normal inline-block ml-1">({yesterdayDateStr})</span>
              </th>
              <th rowSpan={2} className="px-3 md:px-4 py-4 font-semibold text-gray-900 text-right align-middle hidden lg:table-cell bg-gray-50 whitespace-nowrap">
                <div className="flex flex-col items-end">
                  <span>Chênh lệch</span>
                  <span className="text-xs font-normal text-gray-500">Mua - Bán</span>
                </div>
              </th>
            </tr>
            <tr>
              <th className="px-2 py-2 font-semibold text-gray-700 text-right text-xs uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap">Mua vào</th>
              <th className="px-2 py-2 font-semibold text-gray-700 text-right text-xs uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap">Bán ra</th>
              <th className="px-2 py-2 font-medium text-gray-500 text-right text-xs uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap">Mua vào</th>
              <th className="px-2 py-2 font-medium text-gray-500 text-right text-xs uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap">Bán ra</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {worldGold && renderRow(worldGold)}
            
            <tr className="bg-gray-100/80 border-t border-b border-gray-200">
              <td colSpan={6} className="px-3 md:px-4 py-2.5">
                <span className="font-bold text-gray-800 text-sm">Giá vàng trong nước</span>
                <span className="text-xs text-gray-500 ml-2 font-normal bg-white px-2 py-0.5 rounded border border-gray-200">Đơn vị: Triệu đồng/lượng</span>
              </td>
            </tr>

            {domesticGold.map(product => renderRow(product))}
          </tbody>
        </table>
      </div>
    </div>
  );
};