import clienteAxios from '../config/axios';
import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
const ConfirmAccount = () => {
  const params = useParams();
  const {id} = params;
  const [confirmAccount, setConfirmAccount] = useState(false);
  const [load, setLoad] = useState(true);
  const [showAlert,setShowAlert] = useState({})
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `vets/confirm/${id}`;
        const {data} = await clienteAxios(url)
        setConfirmAccount(true)
        setShowAlert({msg:data.msg, error: false})
      } catch (error) {
        setShowAlert({msg:error.response.data.msg, error: true})
      }
      setLoad(false)
    }
    confirmarCuenta()
  }, [])

    return (
      <>
        <div>
            <h1 className='text-indigo-600 font-black md:text-7xl text-4xl text-center md:text-left'>Confirma tu cuenta y empienza a administrar<span className='text-black'>{" "}Tus Pacientes</span></h1>
        </div>
        
        <div className='mt-10 md:mt-0  shadow-lg px-5 py-10 rounded-xl bg-white'>
          {!load && <Alert 
                  alerts={showAlert}
          />}
          {confirmAccount && (
            <nav className='mt-10 lg:flex lg:justify-center'>
                <Link className='block my-5 text-center text-gray-500' to={"/"}>Iniciar Sesión</Link>
            </nav>
          )}
        </div>
      </>
      )
}

export default ConfirmAccount