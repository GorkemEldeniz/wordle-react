import { createContext, useMemo, useState } from "react";
import type { ReactElement } from "react";

export const Context = createContext<any>(undefined);

function GameContextProvider({ children }: { children: ReactElement }) {

  const [boardArray, setBoardArray] = useState(new Array(6).fill('').map(_ => new Array(5).fill('')));
  const [row, setRow] = useState<number>(0)
  const [col, setCol] = useState<number>(0)


  const data = useMemo(() => ({ boardArray, setBoardArray, row, setRow, col, setCol }), [setBoardArray, boardArray]);

  return <Context.Provider value={data}>{children}</Context.Provider>
}

export default GameContextProvider;