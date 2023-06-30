import styles from './board.module.css';
import { Context } from '../../Context/GameContext';
import { useContext, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';

function Board() {

  const { boardArray } = useContext(Context);
  const [word, setWord] = useState<string[]>([]);


  return (
    <div className={styles.board}>
      {
        boardArray.map((ROW: string[], index: number) => <div className={styles.row} key={index}>{ROW.map((_, idx: number) => <button
          className={styles.cell} key={idx}></button>)}</div>)
      }
    </div>
  )
}

export default Board