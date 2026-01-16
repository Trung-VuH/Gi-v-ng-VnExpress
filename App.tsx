import React, { useState, useEffect, useMemo } from 'react';
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

  const worldGoldData = useMemo(() => data.filter(p => p.group === 'world'), [data]);
  const sjcData = useMemo(() => data.filter(p => p.group === 'sjc'), [data]);
  const otherData = useMemo(() => data.filter(p => p.group !== 'world' && p.group !== 'sjc'), [data]);

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

      <main className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* SECTION 1: WORLD GOLD */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Giá vàng thế giới</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>
          
          <div className="mb-6">
            <div className="hidden md:block">
              <GoldTable data={worldGoldData} />
            </div>
            <div className="md:hidden space-y-3">
              {worldGoldData.map(product => (
                <GoldCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <GoldChart 
            products={worldGoldData} 
            historyData={historyData} 
            title="Biểu đồ giá vàng thế giới"
          />
        </section>

        {/* SECTION 2: SJC GOLD */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Giá vàng SJC</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          <div className="mb-6">
            <div className="hidden md:block">
              <GoldTable data={sjcData} />
            </div>
            <div className="md:hidden space-y-3">
              {sjcData.map(product => (
                <GoldCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <GoldChart 
            products={sjcData} 
            historyData={historyData} 
            title="Biểu đồ giá vàng SJC"
          />
        </section>

        {/* SECTION 3: OTHER PRODUCTS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Các loại vàng khác</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          <div className="mb-6">
            <div className="hidden md:block">
              <GoldTable data={otherData} />
            </div>
            <div className="md:hidden space-y-3">
              {otherData.map(product => (
                <GoldCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <GoldChart 
            products={otherData} 
            historyData={historyData} 
            title="Biểu đồ các loại vàng khác"
          />
        </section>

        {/* Tools Section (Tính giá trị vàng) */}
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