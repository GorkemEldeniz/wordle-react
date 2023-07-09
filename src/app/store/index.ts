import { create } from 'zustand'
import type { User,Score } from '../../types'
import { getCurrentDate } from '../../utils'


export const useUserStore = create((set) => ({
  user:  JSON.parse(localStorage.getItem('user') || 'false'),
  score:JSON.parse(localStorage.getItem('dailyScore') || 'false'),
  registerUser: (payload:User) => set(() => {
    let dailyScore
    localStorage.setItem('user',JSON.stringify(payload))
    if(Array.isArray(payload?.scores)){
      dailyScore = payload.scores.find((score:Score) => score.created_at == getCurrentDate());
      if(dailyScore){
        localStorage.setItem('dailyScore',JSON.stringify(dailyScore));
      }
    }
    return { user:{...payload},score:dailyScore  }
  }),
  logOut: () => set(() => {
    localStorage.removeItem('user')
    return { user:'false' }
  }),
}))