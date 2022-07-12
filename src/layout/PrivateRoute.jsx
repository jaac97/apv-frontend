import {Outlet, Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';
const PrivateRoute = () => {
    const {auth, load} = useAuth();

    if(load) return 'cargando';

    return ( 
        <>
            <Header />                      
            {auth?.id ? (
                <main className='container mx-auto mt-10'>
                 <Outlet />
                </main>) : <Navigate to="/" />}
            <Footer />
        </>
     );
}
 
export default PrivateRoute;