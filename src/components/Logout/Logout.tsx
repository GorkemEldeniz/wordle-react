import styles from './logout.module.css'
import { useUserStore } from '../../app/store'

function Logout() {

  const logOut = useUserStore((state: any) => state.logOut);

  return (
    <button onClick={() => logOut()} className={styles.logout}>Logout</button>
  )
}

export default Logout