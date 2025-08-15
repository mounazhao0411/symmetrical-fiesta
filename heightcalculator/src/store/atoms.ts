/**
 * 全局状态管理
 * 管理用户身高输入和计算结果的全局状态
 */
import { atom } from 'jotai';

export interface FurnitureHeights {
  deskHeight: number;
  counterHeight: number;
  sinkHeight: number;
  clothesRodHeight: number;
  storageShelfMin: number;
  storageShelfMax: number;
  drawerMin: number;
  drawerMax: number;
  switchHeight: number;
  sofaHeight: number;
  diningTableHeight: number;
  chairHeight: number;
  coffeeTableHeight: number;
  bedHeight: number;
  tvCabinetHeight: number;
}

// 用户身高状态
export const userHeightAtom = atom<number>(170);

// 计算后的家具高度状态
export const furnitureHeightsAtom = atom<FurnitureHeights | null>(null);

// 是否显示结果
export const showResultsAtom = atom<boolean>(false);