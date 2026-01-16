import React, { useState, useEffect } from 'react';
import { getGoldData, getHistoryData } from './services/goldData';
import { GoldTable } from './components/GoldTable';
import { GoldCard } from './components/GoldCard';
import { GoldChart } from './components/GoldChart';
import { Calculator } from './components/Calculator';
import { HistoryPoint } from './types';

const App: React.FC = () => {
  const [data] = useState(getGoldData());
  const [historyData, setHistoryData] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    // Simulate loading historical data
    const history = getHistoryData();
    setHistoryData(history);
  }, []);

  return (
    <div className="min-h-screen pb-12 bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
              G
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight truncate">Giá Vàng Hôm Nay</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-xs text-right">
              <p className="text-gray-500">Cập nhật lúc</p>
              <p className="font-medium text-gray-900">{data[0].updatedAt}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* 1. Data Display (Bảng giá chi tiết) */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bảng giá chi tiết</h2>
          {/* Desktop View */}
          <div className="hidden md:block">
            <GoldTable data={data} />
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {data.map(product => (
              <GoldCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 2. Chart Section (Biểu đồ) */}
        <section>
          <GoldChart products={data} historyData={historyData} />
        </section>

        {/* 3. Tools Section (Tính giá trị vàng) */}
        <section>
          <Calculator products={data} />
        </section>

        {/* SEO Content Footer */}
        <section className="prose prose-sm max-w-none text-gray-500 bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-900 font-semibold">Lưu ý thị trường</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>Giá vàng thế giới được quy đổi theo tỷ giá USD ngân hàng chưa bao gồm thuế phí.</li>
            <li>Dữ liệu được cập nhật tự động 15 phút/lần từ các nguồn uy tín.</li>
          </ul>
        </section>

      </main>
    </div>
  );
};

export default App;