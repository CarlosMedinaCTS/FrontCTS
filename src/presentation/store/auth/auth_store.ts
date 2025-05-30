import { create } from 'zustand'

type AuthStore = {
  count: number
  inc: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))