import styles from './board.module.css';
import { GameContext } from '../../Context/Context';
import { useContext } from 'react';
import type { Board } from '../../Context/Context';

function Board() {

  const { boardArray } = useContext(GameContext);

  return (
    <div className={styles.board}>
      {
        boardArray.map((ROW: Board[], index: number) => <div className={styles.row} key={index}>{ROW.map((COL: Board, idx: number) => <button
          className={`${styles.cell} ${COL.state ? styles[COL.state] : undefined}`} key={idx}>{COL.letter}</button>)}</div>)
      }
    </div>
  )
}

export default Board