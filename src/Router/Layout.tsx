import { Outlet } from 'react-router-dom';
import Header from '../components/Navs/Header';
import { useNavigation } from "react-router-dom";

function Layout() {

  const navigate = useNavigation();

  if (navigate.state == 'loading') return (
    <div>
      <span>Loading..</span>
    </div>
  )

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout