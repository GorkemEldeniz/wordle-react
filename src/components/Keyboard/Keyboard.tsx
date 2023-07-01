import styles from './keyboard.module.css';
import { Context } from '../../Context/GameContext';
import { MouseEvent, useContext, useEffect, useState } from 'react';


const alphapet = ['E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ', 'Enter', 'Z', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', 'Delete'];

function Keyboard() {

  const { boardArray, setBoardArray, setCol, setRow, row, col } = useContext(Context);
  const [letter, setLetter] = useState('');


  // ufak buglar var düzeltilecek...
  const handleClick = (L: string) => {
    if (L === 'Delete' && col > -1) {
      setCol(pre => pre == 0 ? 0 : pre - 1);
      setBoardArray((oldBoardArray: string[][]) => {
        return oldBoardArray.map((ROW, row_idx) => {
          if (row_idx == row) {
            return ROW.map((COL, col_idx) => {
              if (col_idx == col) return '';
              return COL
            })
          }
          return ROW
        })
      })
    }

    if (L !== 'Delete' && L !== 'Enter') {
      setBoardArray((oldBoardArray: string[][]) => {
        return oldBoardArray.map((ROW, row_idx) => {
          if (row_idx == row) {
            return ROW.map((COL, col_idx) => {
              if (col_idx == col) return L;
              return COL
            })
          }
          return ROW
        })
      })
      if (col < 5) setCol(pre => pre + 1);
    }
  }

  // useEffect(() => {
  //   setBoardArray((oldBoardArray: string[][]) => {
  //     return oldBoardArray.map((ROW, row_idx) => {
  //       if (row_idx == row) {
  //         return ROW.map((COL, col_idx) => {
  //           if (col_idx == col) return letter;
  //           return COL
  //         })
  //       }
  //       return ROW
  //     })
  //   })
  //   console.log(boardArray)
  // }, [col, row])

  return (
    <div className={styles.keyboard}>
      <div>
        {alphapet.slice(0, 10).map(letter => <button onClick={() => handleClick(letter)} key={letter}>{letter}</button>)}
      </div>
      <div>
        {alphapet.slice(10, 21).map(letter => <button onClick={() => handleClick(letter)} key={letter}>{letter}</button>)}
      </div>
      <div>
        {alphapet.slice(21).map(letter => <button onClick={() => handleClick(letter)} key={letter}>{letter === 'Delete' ?
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