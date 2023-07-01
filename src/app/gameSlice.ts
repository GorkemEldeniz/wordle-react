// import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from './store'

// export type Board = {
//   letter: string
//   state: 'absent' | 'present' | 'correct' | null
//   priority: number | null
// }

// export type Game = {
//   result: Board[][] | null
//   isFinished: boolean
// }

// // Define the initial state using that type
// const initialState: {
//   game:Game,
//   board:Board[][]
// } = {
//   board:new Array(6).fill('').map(() => new Array(5).fill({
//     letter: '',
//     state: null,
//     priority: null
//   })),
//   game : {
//     result: null,
//     isFinished: false,
//   }
// }

// export const gameSlice = createSlice({
//   name: 'gameState',
//   initialState,
//   reducers: {
//     handleInput: (state,action:PayloadAction<{id:number,word:Board}>) => {
//       const {id,word} = action.payload
//       state.board.map((row,idx) => {
//         if(idx == id) return word
//         return row
//       })
//     },
//     submitLetter: (state, action: PayloadAction<Board[]>) => {
//       const word = action.payload;
//       if(word.every(({state}:{state:string}) => state === 'correct')){
//         state.game = {
//           result:state.board,
//           isFinished:true
//         }
//       }
//     },
//   },
// })

// export const { handleInput,submitLetter } = gameSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const getBoardState = (state: RootState) => state?.gameState.board
// export const selectCount = (state: RootState) => state?.gameState.game

// export default gameSlice.reducer