import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import { ComputedGoldProduct } from '../types';

interface CalculatorProps {
  products: ComputedGoldProduct[];
}

type Unit = 'luong' | 'chi' | 'phan';

export const Calculator: React.FC<CalculatorProps> = ({ products }) => {
  const [amount, setAmount] = useState<number>(1);
  const [unit, setUnit] = useState<Unit>('luong');
  const [selectedProduct, setSelectedProduct] = useState<string>('sjc_1l');
  const [result, setResult] = useState<number>(0);

  // Filter out world gold for simple VND calculation, or handle conversion if needed
  const vndProducts = products.filter(p => p.unit === 'Triệu đồng/lượng');

  useEffect(() => {
    const product = vndProducts.find(p => p.id === selectedProduct);
    if (product) {
      // Conversion logic:
      // 1 Lượng = 10 Chỉ = 100 Phân
      let amountInLuong = amount;
      
      if (unit === 'chi') {
        amountInLuong = amount / 10;
      } else if (unit === 'phan') {
        amountInLuong = amount / 100;
      }

      // Price is in Million VND per Luong
      // Result = Amount(in Luong) * Price * 1,000,000
      setResult(amountInLuong * product.today.sell * 1_000_000);
    }
  }, [amount, unit, selectedProduct, products]);

  return (
    <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <CalcIcon className="w-6 h-6" />
        <h2 className="text-xl font-bold">Tính Giá Trị Vàng Nhanh</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Amount Input & Unit Selector - 5 columns */}
        <div className="md:col-span-5">
          <label className="block text-sm text-gold-100 mb-1">Nhập số lượng</label>
          <div className="flex rounded-lg bg-white/20 border border-white/30 overflow-hidden focus-within:ring-2 focus-within:ring-white/50 transition-all">
            <input 
              type="number" 
              min="0"
              step="0.1"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full p-2 bg-transparent text-white placeholder-white/50 focus:outline-none border-r border-white/30 font-medium"
              placeholder="1"
            />
            <select 
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="bg-transparent text-white p-2 focus:outline-none [&>option]:text-gray-900 min-w-[80px] font-medium cursor-pointer hover:bg-white/10"
            >
              <option value="luong">Lượng</option>
              <option value="chi">Chỉ</option>
              <option value="phan">Phân</option>
            </select>
          </div>
        </div>
        
        {/* Product Selector - 4 columns */}
        <div className="md:col-span-4">
          <label className="block text-sm text-gold-100 mb-1">Loại vàng</label>
          <select 
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 [&>option]:text-gray-900 cursor-pointer"
          >
            {vndProducts.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Result Display - 3 columns */}
        <div className="md:col-span-3 flex flex-col justify-end">
          <label className="block text-sm text-gold-100 mb-1 text-right md:text-left">Thành tiền (VND)</label>
          <div className="text-2xl font-bold bg-white/10 p-2 rounded-lg tabular-nums truncate text-right md:text-left border border-white/10">
            {result.toLocaleString('vi-VN')}
            <span className="text-sm font-normal ml-1 opacity-80">đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};