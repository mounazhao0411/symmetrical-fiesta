/**
 * 家具高度结果展示组件
 * 整合显示所有家具的推荐高度
 */
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { userHeightAtom, furnitureHeightsAtom } from '../../store/atoms';
import { calculateFurnitureHeights, furnitureConfig } from '../../utils/furnitureCalculator';
import FurnitureCard from '../FurnitureCard';

const FurnitureResults: React.FC = () => {
  const [height] = useAtom(userHeightAtom);
  const [furnitureHeights, setFurnitureHeights] = useAtom(furnitureHeightsAtom);

  useEffect(() => {
    if (height >= 150 && height <= 200) {
      const results = calculateFurnitureHeights(height);
      setFurnitureHeights(results);
    }
  }, [height, setFurnitureHeights]);

  if (!furnitureHeights) return null;

  const getHeightValue = (key: string) => {
    if (key === 'storageShelfMin' || key === 'storageShelfMax') {
      return {
        min: furnitureHeights.storageShelfMin,
        max: furnitureHeights.storageShelfMax
      };
    }
    if (key === 'drawerMin' || key === 'drawerMax') {
      return {
        min: furnitureHeights.drawerMin,
        max: furnitureHeights.drawerMax
      };
    }
    return furnitureHeights[key as keyof typeof furnitureHeights] as number;
  };

  const cards = furnitureConfig.map((config, index) => {
    const heightValue = getHeightValue(config.key);
    return (
      <FurnitureCard
        key={config.key}
        name={config.name}
        height={heightValue}
        icon={config.icon}
        color={config.color}
        description={config.description}
        index={index}
      />
    );
  });

  // 添加储物架和抽屉的范围卡片
  const rangeCards = [
    {
      name: '储物架高度',
      height: { min: furnitureHeights.storageShelfMin, max: furnitureHeights.storageShelfMax },
      icon: '📚',
      color: '#06B6D4',
      description: '日常储物的最佳高度范围'
    },
    {
      name: '抽屉高度',
      height: { min: furnitureHeights.drawerMin, max: furnitureHeights.drawerMax },
      icon: '🗃️',
      color: '#84CC16',
      description: '抽屉安装的合适高度范围'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">为您推荐</h2>
        <p className="text-gray-600">基于 {height}cm 身高的个性化家具尺寸</p>
      </div>

      <div className="space-y-4">
        {cards}
        {rangeCards.map((card, index) => (
          <FurnitureCard
            key={card.name}
            name={card.name}
            height={card.height}
            icon={card.icon}
            color={card.color}
            description={card.description}
            index={furnitureConfig.length + index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FurnitureResults;
