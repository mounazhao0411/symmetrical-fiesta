/**
 * 应用主入口组件
 * 整合所有功能模块，提供完整的交互式尺寸计算体验
 */
import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Toaster } from 'react-hot-toast';
import { showResultsAtom } from './store/atoms';
import HeightInput from './components/HeightInput';
import FurnitureResults from './components/FurnitureResults';
import ShareActions from './components/ShareActions';

const App: React.FC = () => {
  const [showResults] = useAtom(showResultsAtom);
  const contentRef = useRef<HTMLDivElement>(null);

  // 添加页面meta信息优化分享效果
  useEffect(() => {
    // 设置页面标题
    document.title = '智能家具尺寸计算器 - 个性化家具高度建议';
    
    // 创建或更新meta标签
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 基础meta信息
    updateMeta('description', '根据身高智能计算个性化家具高度建议，包含桌面、沙发、床等11种家具的最佳尺寸');
    updateMeta('keywords', '家具高度,人体工程学,家具尺寸,身高计算,家具建议');
    
    // Open Graph标签（用于社交媒体分享）
    updateMeta('og:title', '智能家具尺寸计算器');
    updateMeta('og:description', '根据身高智能计算个性化家具高度建议');
    updateMeta('og:type', 'website');
    updateMeta('og:url', window.location.href);
    
    // 微信分享优化
    updateMeta('twitter:card', 'summary');
    updateMeta('twitter:title', '智能家具尺寸计算器');
    updateMeta('twitter:description', '根据身高智能计算个性化家具高度建议');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          }
        }}
      />
      
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div ref={contentRef} className="space-y-6">
          {/* 头部标题 */}
          <div className="text-center py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              智能家具尺寸
            </h1>
            <p className="text-gray-600">
              根据身高定制专属家具高度建议
            </p>
          </div>

          {/* 身高输入 */}
          <HeightInput />

          {/* 计算结果 */}
          {showResults && (
            <>
              <FurnitureResults />
              <ShareActions contentRef={contentRef} />
            </>
          )}

          {/* 底部说明 */}
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">
              * 建议基于人体工程学标准，仅供参考
            </p>
            <p className="text-xs text-gray-400 mt-2">
              by F7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;