import { createContext, useMemo, useState } from "react";
import type { ReactElement } from "react";

export const GameContext = createContext<any>(undefined);

export type Board = {
  letter: string
  state: 'absent' | 'present' | 'correct' | null
  priority: number | null
}

export type Game = {
  result: Board[][] | null
  isFinished: boolean
}

function ContextProvider({ children }: { children: ReactElement }) {

  const [boardArray, setBoardArray] = useState<Board[][]>(new Array(6).fill('').map(() => new Array(5).fill({
    letter: '',
    state: null,
    priority: null
  })));

  const [gameState, setGameState] = useState<Game>({
    result: null,
    isFinished: false,
  })


  const data = useMemo(() => ({ boardArray, setBoardArray, gameState, setGameState }), [setBoardArray, boardArray, setGameState, gameState]);

  return <GameContext.Provider value={data}>{children}</GameContext.Provider>
}

export default ContextProvider;