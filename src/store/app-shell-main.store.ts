import { create } from "zustand";

export type SizeType = {
  width: number;
  height: number;
};

type AppShellMainState = {
  size: SizeType;
  setSize: (param: SizeType) => void;
};

const initialSize: SizeType = {
  width: 0,
  height: 0,
};

export const useAppShellMainStore = create<AppShellMainState>()((set) => ({
  size: initialSize,
  setSize: (size) => set({ size }),
}));
