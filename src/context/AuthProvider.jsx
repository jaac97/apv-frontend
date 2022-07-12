import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/axios';


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [load, setLoad] = useState(true);
    const [auth, setAuth] = useState({});
    useEffect(() => {
        const authVet = async() =>{
            const token = localStorage.getItem('apv_token')
            if(!token) {
                setLoad(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('vets/profile',config);
                setAuth(data)         
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setLoad(false);
            
        }
        authVet()
    },[])
    const closedSesion = () => {
        localStorage.removeItem('apv_token')
        setAuth({})

    }


    const updateProfile = async (info) => {
            const token = localStorage.getItem('apv_token')
            if(!token) {
                setLoad(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            try {
                const url = `/vets/profile/${info.id}`
                const {data} = await clienteAxios.put(url,info, config)
                return {
                    msg: 'Almacenado correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
    }

    const checkPassword = async (info) => {
        console.log(info)
        const token = localStorage.getItem('apv_token')
        if(!token) {
            setLoad(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        try{
            const url = `/vets/profile`;
            const {data} = await clienteAxios.post(url,info, config )
            return {
                msg: data.msg,
            
            }
        }catch(error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const updatePassword = async(info) => {
        console.log(info)
        const token = localStorage.getItem('apv_token')
        if(!token) {
            setLoad(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        try{
            const url = `/vets/profile`;
            const {data} = await clienteAxios.put(url,info, config )
            return {
                msg: data.msg,
            }
        }catch(error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
        value={{
            auth,
            setAuth,
            load,
            closedSesion,
            updateProfile,
            checkPassword,
            updatePassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext;