import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from '../hooks/useAuth'

const ChangePassword = () => {
    const [cuPassword, setCuPassword] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState({});
    const [currentPassword, setCurrentPassword] = useState(false);
    const [change, setChange] = useState(false)
    const {auth, checkPassword, updatePassword} = useAuth();
    const handleSubmit = async e => {
        e.preventDefault();

        if(!currentPassword) {
            const response = await checkPassword({cuPassword})
            if(response.error){
                setMsg(response)
                return setShowAlert(true)
            }else{
                setMsg(response)
                setShowAlert(true)
                return setCurrentPassword(true)
            }
        }
        
        if(password === '' || rePassword === '') {
            setMsg({
                msg: 'No puede haber campos vacios',
                error: true
            })
            setShowAlert(true)
            return;
        }
        if(password !== rePassword) {
            setMsg({
                msg: 'Las contraseñas deben ser identicas',
                error: true
            })
            setShowAlert(true)
            return;
        }
        if(password.length < 8) {
            setMsg({
                msg: 'La contraseñas deben de ser minimo 8 caracteres',
                error: true
            })
            setShowAlert(true)
            return;
        }
        setTimeout(()=>{
            setMsg({})
            setShowAlert(false)

        }, 1500)
        const response = await updatePassword({password});

        if(response.error){
            setMsg(response)
            return setShowAlert(true)
        }else{
            setMsg(response)
            setShowAlert(true)
            setCurrentPassword(true)
            setTimeout(() => {
               setChange(true)
            }, 1000)
            return 
        }
    }
    return ( 
        <>
            <AdminNav />
            <h2
            className="font-black text-3xl text-center mt-10"
            >Cambiar Contraseña</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""} <span className="text-indigo-600 font-bold">contraseña</span></p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {showAlert && <Alert alerts={msg} />}
                    <form
                        onSubmit={handleSubmit}
                    >
                    {!currentPassword ? (
                        <div className="my-3">
                            <label htmlFor="cuPassword" className="uppercase font-bold text-gray-600">Contraseña ACtual</label>
                            <input
                            value={cuPassword}
                            onChange={e => setCuPassword(e.target.value)}
                            id="cuPassword"
                            name="cuPassword"
                            type={`password`}
                            className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                            placeholder="Escribe tu contraseña actual"
                            />
                        </div>
                    ):(
                        <>
                            <div className="my-3">
                                <label htmlFor="password" className="uppercase font-bold text-gray-600">Nueva Contraseña</label>
                                <input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type={`password`}
                                className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                                />
                            </div>

                            <div className="my-3">
                                <label htmlFor="rePassword" className="uppercase font-bold text-gray-600">Confirmar contraseña</label>
                                <input
                                value={rePassword}
                                onChange={e => setRePassword(e.target.value)}
                                id="rePassword"
                                name="rePassword"
                                type={`password`}
                                className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                                />
                            </div>
                        </>
                    )
                    }

                        <input 
                        type={`submit`}
                        value= {!currentPassword ? "Enviar contraseña" :"Guardar cambio"}
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
                        />
                    </form>
                </div>
            </div>
            
            {change &&<Navigate to="/admin/profile" replace={true} />}
        </>
     );
}
 
export default ChangePassword;