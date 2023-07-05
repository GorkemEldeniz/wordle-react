import styles from './keyboard.module.css';
import { GameContext } from '../../Context/Context';
import { useContext, useEffect, useState } from 'react';
import type { Board } from '../../Context/Context';


const alphapet = ['E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ', 'Enter', 'Z', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', 'Delete'];

function Keyboard() {

  const { setBoardArray, boardArray, gameState, setGameState } = useContext(GameContext);
  const [row, setRow] = useState(0);
  const [word, setWord] = useState<any[]>([]);

  // ufak buglar var düzeltilecek...
  const handleClick = (L: string) => {

    if (L === 'Delete') {
      setWord(oldWord => {
        if (oldWord.length) {
          return [...oldWord.slice(0, oldWord.length - 1)];
        }
        return oldWord
      })
    }
    else if (L !== 'Enter') {
      setWord(oldWord => {
        if (oldWord.length !== 5) {
          return [...oldWord, L];
        }
        return oldWord
      })
    }
    else if (word.length === 5 && L === 'Enter' && row < 5) {
      const key = 'KEMER';
      const guessWordArray = key.split('');

      //sadece correct için kontrol
      const resultForCorrect = boardArray[row].map(({ letter }: { letter: string }, idx: number) => {
        if (key[idx] === word[idx]) {
          guessWordArray.splice(idx, 1, '');
          return {
            letter,
            state: 'correct',
            priority: 2
          }
        }
        return {
          letter,
          state: 'absent',
          priority: 0
        }
      })

      //sadece present için kontrol
      const resultForPresent = boardArray[row].map(({ letter }: { letter: string }, idx: number) => {
        if (guessWordArray.includes(word[idx])) {
          return {
            letter,
            state: 'present',
            priority: 1
          }
        }

        return {
          letter,
          state: 'absent',
          priority: 0
        }
      })

      const resultArray = resultForCorrect.map((l: Board, idx: number) => {
        if (l.priority && l.priority >= resultForPresent[idx].priority) {
          return {
            ...l
          }
        }
        else return { ...resultForPresent[idx] }
      })

      setBoardArray((oldArray: Board[][]) => {
        return oldArray.map((ROW, idx) => {
          if (idx === row) {
            return resultArray
          }
          return ROW
        })
      })

      if (resultArray.every(({ state }: { state: string }) => state === 'correct')) {
        setGameState({
          isFinished: true,
          result: boardArray
        })
      }

      setRow(row + 1);
      setWord([]);
    }
  }

  useEffect(() => {
    setBoardArray((oldBoardArray: string[][]) => {
      return oldBoardArray.map((ROW, row_idx) => {
        if (row_idx == row) {
          return ROW.map((_, idx) => word[idx] ? { letter: word[idx], state: null } : {
            letter: '',
            state: null
          })
        }
        return ROW
      })
    })
  }, [word, setBoardArray, row])

  return (
    <div className={styles.keyboard}>
      <div>
        {alphapet.slice(0, 10).map(letter => <button disabled={gameState.isFinished} onClick={() => handleClick(letter)} key={letter}>{letter}</button>)}
      </div>
      <div>
        {alphapet.slice(10, 21).map(letter => <button disabled={gameState.isFinished} onClick={() => handleClick(letter)} key={letter}>{letter}</button>)}
      </div>
      <div>
        {alphapet.slice(21).map(letter => <button disabled={gameState.isFinished} onClick={() => handleClick(letter)} key={letter}>{letter === 'Delete' ?
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
            <path fill="#d7dadc"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z">
            </path>
          </svg>
          : letter}</button>)}
      </div>
    </div>
  )
}

export default Keyboard