import React, { useState, useEffect, useMemo } from 'react';
import { getGoldData, getHistoryData } from './services/goldData';
import { GoldTable } from './components/GoldTable';
import { GoldCard } from './components/GoldCard';
import { Calculator } from './components/Calculator';
import { ChartModal } from './components/ChartModal';
import { ComputedGoldProduct, HistoryPoint } from './types';

const App: React.FC = () => {
  const [data] = useState(getGoldData());
  const [historyData, setHistoryData] = useState<HistoryPoint[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ComputedGoldProduct | null>(null);

  useEffect(() => {
    // Simulate loading historical data
    const history = getHistoryData();
    setHistoryData(history);
  }, []);

  const worldGoldData = useMemo(() => data.filter(p => p.group === 'world'), [data]);
  const sjcData = useMemo(() => data.filter(p => p.group === 'sjc'), [data]);
  const otherData = useMemo(() => data.filter(p => p.group !== 'world' && p.group !== 'sjc'), [data]);

  const handleProductClick = (product: ComputedGoldProduct) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen pb-8 bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gold-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-sm text-sm">
              G
            </div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight truncate">Giá vàng hôm nay</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-[10px] sm:text-xs text-right leading-tight">
              <p className="text-gray-500">Cập nhật lúc</p>
              <p className="font-medium text-gray-900">{data[0].updatedAt}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-5">
        
        {/* SECTION 1: WORLD GOLD */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-gray-900">Giá vàng thế giới</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>
          
          <div className="mb-3">
            <div className="hidden md:block">
              <GoldTable 
                data={worldGoldData} 
                historyData={historyData}
                onRowClick={handleProductClick}
              />
            </div>
            {/* Mobile Table View */}
            <div className="md:hidden bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {worldGoldData.map(product => (
                <GoldCard 
                  key={product.id} 
                  product={product} 
                  historyData={historyData} 
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: SJC GOLD */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-gray-900">Giá vàng SJC</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          <div className="mb-3">
            <div className="hidden md:block">
              <GoldTable 
                data={sjcData} 
                historyData={historyData}
                onRowClick={handleProductClick}
              />
            </div>
            {/* Mobile Table View */}
            <div className="md:hidden bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {sjcData.map(product => (
                <GoldCard 
                  key={product.id} 
                  product={product} 
                  historyData={historyData}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: OTHER PRODUCTS */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-gray-900">Các loại vàng khác</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          <div className="mb-3">
            <div className="hidden md:block">
              <GoldTable 
                data={otherData} 
                historyData={historyData}
                onRowClick={handleProductClick}
              />
            </div>
            {/* Mobile Table View */}
            <div className="md:hidden bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {otherData.map(product => (
                <GoldCard 
                  key={product.id} 
                  product={product} 
                  historyData={historyData}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section (Tính giá trị vàng) */}
        <section>
          <Calculator products={data} />
        </section>

        {/* SEO Content Footer */}
        <section className="prose prose-sm max-w-none text-xs text-gray-500 bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-1 text-sm">Lưu ý thị trường</h3>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Giá vàng thế giới được quy đổi theo tỷ giá USD ngân hàng chưa bao gồm thuế phí.</li>
            <li>Dữ liệu được cập nhật tự động 15 phút/lần từ các nguồn uy tín.</li>
            <li>Nhấn vào tên sản phẩm để xem biểu đồ chi tiết.</li>
          </ul>
        </section>

        {/* Mobile Detail Modal */}
        <ChartModal 
          product={selectedProduct}
          historyData={historyData}
          onClose={() => setSelectedProduct(null)}
        />

      </main>
    </div>
  );
};

export default App;