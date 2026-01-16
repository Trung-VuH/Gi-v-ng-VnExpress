import React from 'react';
import { ComputedGoldProduct } from '../types';
import { TrendIndicator } from './TrendIndicator';

interface GoldTableProps {
  data: ComputedGoldProduct[];
}

export const GoldTable: React.FC<GoldTableProps> = ({ data }) => {
  if (data.length === 0) return null;

  const isWorldTable = data.every(p => p.group === 'world');

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

  const renderRow = (product: ComputedGoldProduct) => {
    const commonNameCell = (
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div>
            <div className="font-medium text-gray-900">
              {product.name}
            </div>
            {product.group === 'world' && (
              <div className="text-[10px] text-gray-500 font-normal">
                {product.unit}
              </div>
            )}
          </div>
        </div>
      </td>
    );

    if (isWorldTable) {
      // Simplified Row for World Gold
      return (
        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
          {commonNameCell}
          <td className="px-3 py-2.5 text-right">
            <div className="font-bold text-gray-900 text-lg tabular-nums">
              {product.today.buy.toLocaleString('vi-VN')}
            </div>
          </td>
          <td className="px-3 py-2.5 text-right">
            <div className="font-bold text-gray-900 text-lg tabular-nums">
              {product.today.sell.toLocaleString('vi-VN')}
            </div>
          </td>
        </tr>
      );
    }

    // Standard Row for other gold types
    return (
      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
        {commonNameCell}
        
        {/* Today Buy */}
        <td className="px-2 py-2.5 text-right bg-white/50">
          <div className="font-bold text-gray-900 text-base tabular-nums whitespace-nowrap">
            {product.today.buy.toLocaleString('vi-VN')}
          </div>
          <div className="flex justify-end mt-0.5">
            <TrendIndicator trend={product.trendBuy} value={product.changeBuy} />
          </div>
        </td>

        {/* Today Sell */}
        <td className="px-2 py-2.5 text-right bg-white/50">
          <div className="font-bold text-gray-900 text-base tabular-nums whitespace-nowrap">
            {product.today.sell.toLocaleString('vi-VN')}
          </div>
          <div className="flex justify-end mt-0.5">
            <TrendIndicator trend={product.trendSell} value={product.changeSell} />
          </div>
        </td>

        {/* Yesterday Buy */}
        <td className="px-2 py-2.5 text-right text-gray-500 tabular-nums bg-gray-50/50 whitespace-nowrap">
           {product.yesterday.buy.toLocaleString('vi-VN')}
        </td>

         {/* Yesterday Sell */}
        <td className="px-2 py-2.5 text-right text-gray-500 tabular-nums bg-gray-50/50 whitespace-nowrap">
           {product.yesterday.sell.toLocaleString('vi-VN')}
        </td>
      </tr>
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            {isWorldTable ? (
              // Simplified Header for World Gold
              <>
                <tr>
                  <th rowSpan={2} className="px-3 py-3 font-semibold text-gray-900 align-middle border-r border-gray-200 bg-gray-50 whitespace-nowrap text-sm">Sản phẩm</th>
                  <th colSpan={2} className="px-2 py-2 font-semibold text-gray-900 text-center bg-gray-100 whitespace-nowrap text-sm">
                    Giá hiện tại <span className="text-gray-500 text-[10px] font-normal inline-block ml-1">(USD/ounce)</span>
                  </th>
                </tr>
                <tr>
                  <th className="px-3 py-2 font-semibold text-gray-700 text-right text-xs uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap w-1/4">Mua vào</th>
                  <th className="px-3 py-2 font-semibold text-gray-700 text-right text-xs uppercase tracking-wider bg-gray-50 whitespace-nowrap w-1/4">Bán ra</th>
                </tr>
              </>
            ) : (
              // Standard Header
              <>
                <tr>
                  <th rowSpan={2} className="px-3 py-3 font-semibold text-gray-900 align-middle border-r border-gray-200 bg-gray-50 whitespace-nowrap text-sm">Sản phẩm</th>
                  <th colSpan={2} className="px-2 py-1.5 font-semibold text-gray-900 text-center border-r border-gray-200 bg-gray-100 whitespace-nowrap text-xs">
                    Hôm nay <span className="text-gray-500 text-[10px] font-normal inline-block">({todayDateStr})</span>
                  </th>
                  <th colSpan={2} className="px-2 py-1.5 font-semibold text-gray-600 text-center border-r border-gray-200 bg-gray-100 whitespace-nowrap text-xs">
                    Hôm qua <span className="text-gray-500 text-[10px] font-normal inline-block">({yesterdayDateStr})</span>
                  </th>
                </tr>
                <tr>
                  <th className="px-2 py-2 font-semibold text-gray-700 text-right text-[10px] uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap">Mua vào</th>
                  <th className="px-2 py-2 font-semibold text-gray-700 text-right text-[10px] uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap">Bán ra</th>
                  <th className="px-2 py-2 font-medium text-gray-500 text-right text-[10px] uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap">Mua vào</th>
                  <th className="px-2 py-2 font-medium text-gray-500 text-right text-[10px] uppercase tracking-wider bg-gray-50 border-r border-gray-200 whitespace-nowrap">Bán ra</th>
                </tr>
              </>
            )}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map(product => renderRow(product))}
          </tbody>
        </table>
      </div>
    </div>
  );
};