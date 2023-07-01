import styles from './board.module.css';
import { Context } from '../../Context/GameContext';
import { useContext } from 'react';

function Board() {

  const { boardArray } = useContext(Context);

  return (
    <div className={styles.board}>
      {
        boardArray.map((ROW: string[], index: number) => <div className={styles.row} key={index}>{ROW.map((letter, idx: number) => <button
          className={styles.cell} key={idx}>{letter ? letter : ''}</button>)}</div>)
      }
    </div>
  )
}

export default Board