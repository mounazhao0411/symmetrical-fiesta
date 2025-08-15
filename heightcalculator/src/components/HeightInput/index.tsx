/**
 * 身高输入组件
 * 提供滑块和数字输入两种方式设置身高
 */
import React from 'react';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { userHeightAtom, showResultsAtom } from '../../store/atoms';
import { Ruler } from 'lucide-react';

const HeightInput: React.FC = () => {
  const [height, setHeight] = useAtom(userHeightAtom);
  const [, setShowResults] = useAtom(showResultsAtom);

  const handleHeightChange = (value: number) => {
    setHeight(value);
    if (value >= 150 && value <= 200) {
      setShowResults(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Ruler className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">输入您的身高</h2>
        <p className="text-gray-600">为您量身定制家具高度建议</p>
      </div>

      <div className="space-y-6">
        {/* 身高显示 */}
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {height}
            <span className="text-2xl text-gray-500 ml-1">cm</span>
          </div>
        </div>

        {/* 滑块输入 */}
        <div className="px-4">
          <input
            type="range"
            min="150"
            max="200"
            value={height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((height - 150) / 50) * 100}%, #E5E7EB ${((height - 150) / 50) * 100}%, #E5E7EB 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>150cm</span>
            <span>200cm</span>
          </div>
        </div>

        {/* 数字输入 */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => handleHeightChange(Math.max(150, height - 1))}
            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            −
          </button>
          <input
            type="number"
            value={height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="w-20 text-center text-xl font-bold py-2 border-b-2 border-blue-600 focus:outline-none"
            min="150"
            max="200"
          />
          <button
            onClick={() => handleHeightChange(Math.min(200, height + 1))}
            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeightInput;
