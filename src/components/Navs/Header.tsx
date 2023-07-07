import Logo from '../../assets/wordle-bundle.png'
import styles from './header.module.css'
import * as Icons from 'src/Icons'
import { useUserStore } from '../../app/store'

function Header() {

  const { username } = useUserStore((state: any) => state.user);

  return (
    <nav className={styles.nav}>
      <img src={Logo} alt="Logo" />
      <span className={styles.name}>{username}</span>
      <header>
        <h1>WORDLE TR</h1>
      </header>

      <ol>
        <li><Icons.Info /></li>
        <li><Icons.Settings /></li>
        <li><Icons.Stats /></li>
      </ol>
    </nav>
  )
}

export default Header