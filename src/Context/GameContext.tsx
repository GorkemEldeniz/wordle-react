import { createContext, useMemo, useState } from "react";
import type { ReactElement } from "react";

export const Context = createContext<any>(undefined);

function GameContextProvider({ children }: { children: ReactElement }) {

  const [boardArray, setBoardArray] = useState(new Array(6).fill('').map(_ => new Array(5).fill('')))


  const data = useMemo(() => ({ boardArray, setBoardArray }), [setBoardArray, boardArray]);

  return <Context.Provider value={data}>{children}</Context.Provider>
}

export default GameContextProvider;