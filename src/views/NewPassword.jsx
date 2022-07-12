import clienteAxios from '../config/axios';
import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showAlert, SetShowAlert] = useState({})
    const [submit, setSubmit] = useState(false)
    const [tokenValido, setTokenValido] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)
        if(password === '' || rePassword === ''){
            SetShowAlert({
                msg: 'Ambos campos deben estar llenos',
                error: true
            })
            return;
        }
        if(password !== rePassword) {
            SetShowAlert({
                msg: 'Ambos campos deben ser iguales',
                error: true
            })
            return;
        }
        if(password.length < 8 && rePassword.length < 8) {
            SetShowAlert({
                msg: 'La contraseña no puede ser menor a 8 caracteres',
                error: true
            })
            return;
        }
        try {
            const {data} =  await clienteAxios.post(`/vets/account-recovery/${token}`,{
                password
            })
            SetShowAlert({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            SetShowAlert({
                msg: 'Hubo un error al cambiar la contraseña',
                error: true
            })
            console.log(error)
        }
        
    }
    const params = useParams()
    const {token} = params;
    useEffect(() => {
        const checkToken = async () => {
            setSubmit(true)
            try {
                const {data} = await clienteAxios(`/vets/account-recovery/${token}`)
                console.log(data)
                setTokenValido(true)
                SetShowAlert({
                    msg: data.msg,
                    error: false
                })
            } catch (error) {
                setTokenValido(false)
               SetShowAlert({
                    msg: error.response.data.msg,
                    error: true
               })
               console.log(error)

            }
        }
        checkToken()
    }, [])


    return ( 
        <>
        <div>
            <h1 className='text-indigo-600 font-black md:text-7xl text-4xl text-center md:text-left'>Reincia tu contraseña y continua administrando<span className='text-black'>{" "}Tus Pacientes</span></h1>
        </div>
        
        <div className='mt-10 md:mt-0  shadow-lg px-5 py-10 rounded-xl bg-white'>
            {submit && <Alert alerts={showAlert} />}
            {tokenValido && (
                <form
                onSubmit={handleSubmit}
                >
                    <div className='w-72 mx-auto mt-3 md:w-full'>
                        <label 
                        className='uppercase text-gray-600 block text-xl font-bold '
                        htmlFor='password'>
                        Nueva Contraseña
                        </label>
                        <input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id='password' 
                        className='border w-full p-3 mt-3 bg-gray-100 rounded-xl' 
                        type="password" 
                        placeholder='Tu contraseña' />
                    </div>
                    <div className='w-72 mx-auto mt-3 md:w-full'>
                        <label 
                        className='uppercase text-gray-600 block text-xl font-bold '
                        htmlFor='rePassword'>
                        Confirmar Contraseña
                        </label>
                        <input 
                        id='rePassword' 
                        value={rePassword}
                        onChange={e => setRePassword(e.target.value)}
                        className='border w-full p-3 mt-3 bg-gray-100 rounded-xl' 
                        type="password" 
                        placeholder='Confirmar Contraseña' />
                    </div>
                    <input 
                        type="submit"
                        value="Cambiar contraseña"
                        className='bg-indigo-600 md:w-auto w-72 mx-auto md:mx-0 py-3 md:px-10 rounded-xl text-white uppercase font-bold block mt-8 hover:cursor-pointer hover:bg-indigo-800' />
                <Link className='block my-5 text-center text-gray-500' to={"/"}>Iniciar Sesión</Link>
                </form>
            )}
        </div>
        </>
     );
}
 
export default NewPassword;