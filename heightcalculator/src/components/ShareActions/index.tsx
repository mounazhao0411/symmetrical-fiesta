/**
 * 分享操作组件
 * 提供保存图片和分享功能
 */
import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import { Download, Share2, RotateCcw } from 'lucide-react';
import { userHeightAtom, showResultsAtom } from '../../store/atoms';

interface ShareActionsProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

const ShareActions: React.FC<ShareActionsProps> = ({ contentRef }) => {
  const [height] = useAtom(userHeightAtom);
  const [, setShowResults] = useAtom(showResultsAtom);

  const saveAsImage = async () => {
    if (!contentRef.current) return;

    try {
      toast.loading('正在生成图片...', { id: 'generating' });
      
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        backgroundColor: '#f8fafc',
        useCORS: true,
        allowTaint: true,
        height: contentRef.current.scrollHeight,
        width: contentRef.current.scrollWidth
      });

      const link = document.createElement('a');
      link.download = `家具尺寸建议-${height}cm.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.success('图片保存成功！', { id: 'generating' });
    } catch (error) {
      toast.error('图片生成失败，请重试', { id: 'generating' });
      console.error('Save image error:', error);
    }
  };

  const shareResults = async () => {
    const shareData = {
      title: '智能家具尺寸计算器',
      text: `我用${height}cm身高测试了家具尺寸，快来试试你的专属建议！`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // 优化复制分享文案
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      try {
        await navigator.clipboard.writeText(shareText);
        toast.success('分享链接已复制到剪贴板');
      } catch (error) {
        // 降级方案：显示分享信息
        alert(`请复制以下内容分享：\n${shareText}`);
      }
    }
  };

  const resetCalculator = () => {
    setShowResults(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        分享您的专属建议
      </h3>
      
      <div className="space-y-3">
        <button
          onClick={saveAsImage}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>保存为图片</span>
        </button>

        <button
          onClick={shareResults}
          className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>分享给朋友</span>
        </button>

        <button
          onClick={resetCalculator}
          className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>重新计算</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ShareActions;