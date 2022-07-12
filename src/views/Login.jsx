import React, {useState, useEffect} from 'react'
import {Link, useNavigate } from "react-router-dom";
import Alert from '../components/Alert';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
const Login = () => {
const [email, setEmail ] = useState('');
const [password, setPassword] = useState('');
const [msg, setMsg] = useState(false)
const [showAlert, setShowAlert] = useState({})
const {setAuth} = useAuth()

const navigate = useNavigate();

const handleSubmit = async(e) => {
  e.preventDefault();
    setMsg(true)
    if(email === '' || password === ''){
        setShowAlert({
          msg: 'Debes llenar toda la información para poder iniciar sesión',
          error: true
        })
        return;
    }
      setShowAlert({
        msg: "Iniciando sesión por favor espere",
        error: false
      })
        const url = 'vets/login';
        try {
          const {data} = await clienteAxios.post(url, {
            email,
            password
          })
          // console.log(data)
          setMsg(false)
          localStorage.setItem('apv_token', data.token)
          setAuth(data)
          navigate('/admin')
        } catch (error) {
          console.log(error.response)
/*           localStorage.removeItem('apv_token') */
          setShowAlert({
            msg: error.response.data.msg,
            error: true
          })
        }
}


  return (
   <>
    <div>
      <h1 className='text-indigo-600 font-black md:text-7xl text-4xl text-center md:text-left'>Inicia sesión y administra tus <span className='text-black'>Pacientes</span></h1>
    </div>
    <div className='mt-10 md:mt-0  shadow-lg px-5 py-10 rounded-xl bg-white'>
      {msg && <Alert alerts={showAlert} />}
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
            placeholder='Email de registro' />
        </div>
        {/* Fin de email */}
        <div className='w-72 mx-auto mt-3 md:w-full'>
            <label 
            className='uppercase text-gray-600 block text-xl font-bold '
            htmlFor='password'>
              Password
            </label>
            <input 
            id='password' 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='border w-full p-3 mt-3 bg-gray-100 rounded-xl' 
            type="password" 
            placeholder='Tu contraseña' />
        </div>
        {/* Fin de password */}
        <input 
        type="submit"
        value="Iniciar Sesión"
        className='bg-indigo-600 md:w-auto w-72 mx-auto md:mx-0 py-3 md:px-10 rounded-xl text-white uppercase font-bold block mt-8 hover:cursor-pointer hover:bg-indigo-800' />
      </form>
      {/* Fin de formulario */}
      <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block my-5 text-center text-gray-500' to={"/register"}>Registrarse</Link>
          <Link className='block my-5 text-center text-gray-500' to={"/recovery-password"}>Olvide mi contraseña</Link>
       </nav>
    </div>
   </>
  )
}

export default Login