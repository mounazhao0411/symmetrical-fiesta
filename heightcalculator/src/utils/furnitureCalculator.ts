/**
 * 家具高度计算工具
 * 基于人体工程学原理计算各种家具的推荐高度
 */
import { FurnitureHeights } from '../store/atoms';

export const calculateFurnitureHeights = (height: number): FurnitureHeights => {
  // 基于人体工程学的标准比例计算
  const sitHeight = height * 0.26; // 坐高
  const elbowHeight = height * 0.63; // 肘高
  const shoulderHeight = height * 0.81; // 肩高
  const eyeHeight = height * 0.94; // 眼高
  const kneeHeight = height * 0.3; // 膝盖高度
  
  return {
    // 桌面高度 = 肘高 - 2-3cm
    deskHeight: Math.round(elbowHeight - 2.5),
    
    // 橱柜台面高度 = 肘高 - 10-15cm
    counterHeight: Math.round(elbowHeight - 12),
    
    // 洗手池高度 = 肘高 - 5-10cm  
    sinkHeight: Math.round(elbowHeight - 7.5),
    
    // 衣架高度 = 身高 + 10-20cm
    clothesRodHeight: Math.round(height + 15),
    
    // 储物架高度范围
    storageShelfMin: Math.round(height * 0.4), // 易取物品高度
    storageShelfMax: Math.round(eyeHeight), // 最高可视高度
    
    // 抽屉高度范围
    drawerMin: Math.round(height * 0.3), // 下层抽屉
    drawerMax: Math.round(elbowHeight), // 上层抽屉
    
    // 开关插座高度 = 肘高 - 10cm
    switchHeight: Math.round(elbowHeight - 10),
    
    // 沙发座面高度 = 小腿长度 + 2-3cm (约为身高的0.25倍)
    sofaHeight: Math.round(height * 0.25 + 2),
    
    // 餐桌高度 = 肘高 (站立操作舒适高度)
    diningTableHeight: Math.round(elbowHeight),
    
    // 椅子座面高度 = 小腿长度 (约为身高的0.25倍)
    chairHeight: Math.round(height * 0.25),
    
    // 茶几高度 = 沙发座面高度 - 5-10cm
    coffeeTableHeight: Math.round(height * 0.25 + 2 - 7),
    
    // 床高度 = 小腿长度 + 膝盖厚度 (约为身高的0.28倍)
    bedHeight: Math.round(height * 0.28),
    
    // 电视柜高度 = 眼高的1/3 (坐在沙发上看电视的舒适高度)
    tvCabinetHeight: Math.round(eyeHeight * 0.35)
  };
};

export const furnitureConfig = [
  {
    key: 'deskHeight' as keyof FurnitureHeights,
    name: '桌面高度',
    icon: '🪑',
    color: '#3B82F6',
    description: '适合工作学习的桌面高度'
  },
  {
    key: 'diningTableHeight' as keyof FurnitureHeights,
    name: '餐桌高度',
    icon: '🍽️',
    color: '#F59E0B',
    description: '用餐时的舒适桌面高度'
  },
  {
    key: 'sofaHeight' as keyof FurnitureHeights,
    name: '沙发座面',
    icon: '🛋️',
    color: '#8B5CF6',
    description: '舒适的沙发座面高度'
  },
  {
    key: 'chairHeight' as keyof FurnitureHeights,
    name: '椅子座面',
    icon: '💺',
    color: '#EF4444',
    description: '标准椅子的座面高度'
  },
  {
    key: 'bedHeight' as keyof FurnitureHeights,
    name: '床面高度',
    icon: '🛏️',
    color: '#06B6D4',
    description: '便于上下床的床面高度'
  },
  {
    key: 'coffeeTableHeight' as keyof FurnitureHeights,
    name: '茶几高度',
    icon: '☕',
    color: '#84CC16',
    description: '搭配沙发的茶几高度'
  },
  {
    key: 'tvCabinetHeight' as keyof FurnitureHeights,
    name: '电视柜高度',
    icon: '📺',
    color: '#EC4899',
    description: '观看电视的最佳柜体高度'
  },
  {
    key: 'counterHeight' as keyof FurnitureHeights,
    name: '橱柜台面',
    icon: '🏠',
    color: '#10B981',
    description: '厨房操作台面的舒适高度'
  },
  {
    key: 'sinkHeight' as keyof FurnitureHeights,
    name: '洗手池高度',
    icon: '🚿',
    color: '#F97316',
    description: '洗漱台的合适高度'
  },
  {
    key: 'clothesRodHeight' as keyof FurnitureHeights,
    name: '衣架高度',
    icon: '👔',
    color: '#6366F1',
    description: '衣柜挂杆的理想高度'
  },
  {
    key: 'switchHeight' as keyof FurnitureHeights,
    name: '开关插座',
    icon: '🔌',
    color: '#14B8A6',
    description: '墙面开关插座的便捷高度'
  }
];