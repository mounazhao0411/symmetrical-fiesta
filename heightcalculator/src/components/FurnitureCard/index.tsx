/**
 * 家具高度卡片组件
 * 以卡片形式展示单个家具的推荐高度
 */
import React from 'react';
import { motion } from 'framer-motion';

interface FurnitureCardProps {
  name: string;
  height: number | { min: number; max: number };
  icon: string;
  color: string;
  description: string;
  index: number;
}

const FurnitureCard: React.FC<FurnitureCardProps> = ({
  name,
  height,
  icon,
  color,
  description,
  index
}) => {
  const isRange = typeof height === 'object';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
          style={{ backgroundColor: color + '20', color }}
        >
          {icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          
          <div className="flex items-end space-x-2">
            {isRange ? (
              <div className="text-2xl font-bold" style={{ color }}>
                {height.min}-{height.max}
                <span className="text-sm text-gray-500 ml-1">cm</span>
              </div>
            ) : (
              <div className="text-2xl font-bold" style={{ color }}>
                {height}
                <span className="text-sm text-gray-500 ml-1">cm</span>
              </div>
            )}
          </div>
          
          {/* 可视化高度条 */}
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isRange ? '85%' : '70%' }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FurnitureCard;
