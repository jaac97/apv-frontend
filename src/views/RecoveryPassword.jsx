import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import clienteAxios from '../config/axios'
const RecoveryPassword = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState({});
  const [submit, setSubmit] = useState(false);
  const handleSubmit = async e => {
    setSubmit(true)
      e.preventDefault();
      if(email === '' || email.length < 6) {
          setShowAlert({
            msg: 'El correo electronico es obligatorio',
            error: true
          })
    
          return;
      }
      try {
      
        const {data} = await clienteAxios.post('/vets/account-recovery', {
          email
        })
        setShowAlert({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setShowAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
  }
  return (
    <>
    <div>
      <h1 className='text-indigo-600 font-black md:text-7xl text-4xl text-center md:text-left'>Recupera el acceso a tu cuenta y no pierdas<span className='text-black'>{" "}tus Pacientes</span></h1>
    </div>
    <div className='mt-10 md:mt-0  shadow-lg px-5 py-10 rounded-xl bg-white'>
      {submit && <Alert alerts={showAlert} />}
      <form
        onSubmit={handleSubmit}
      >
        <div className='w-72 mx-auto md:w-full'>
            <label 
            className='uppercase text-gray-600 block text-xl font-bold '
            htmlFor='email'>
              Email
            </label>
            <input 
            value={email}
            onChange={e => setEmail(e.target.value)}
            id='email' 
            className='border w-full p-3 mt-3 bg-gray-100 rounded-xl' 
            type="email" 
            placeholder='Tu email' />
        </div>
        {/* Fin de email */}

        <input 
        type="submit"
        value="Recuperar Contraseña"
        className='bg-indigo-600 md:w-auto w-72 mx-auto md:mx-0 py-3 md:px-10 rounded-xl text-white uppercase font-bold block mt-8 hover:cursor-pointer hover:bg-indigo-800' />
      </form>
      {/* Fin de formulario */}
      <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block my-5 text-center text-gray-500' to={"/"}>Iniciar Sesión</Link>
          <Link className='block my-5 text-center text-gray-500' to={"/register"}>Registrarse</Link>
       </nav>
    </div>
    </>
  )
}

export default RecoveryPassword