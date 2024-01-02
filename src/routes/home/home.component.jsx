import { Outlet } from 'react-router-dom';
import Directory from '../../components/directory/directory.component'

const Home = ({categories}) => {
  return (
    <div>
        <Outlet/>
        <Directory/>
    </div>
  );
}

export default Home;