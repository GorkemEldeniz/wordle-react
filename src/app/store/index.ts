import { create } from 'zustand'
import type { Inputs } from '../../pages/LoginRegister/Register'


export const useUserStore = create((set) => ({
  user:  JSON.parse(localStorage.getItem('user') || 'false'),
  score:null,
  registerUser: (payload:Inputs) => set(() => {
    localStorage.setItem('user',JSON.stringify(payload))
    return { user:{...payload}  }
  }),
}))