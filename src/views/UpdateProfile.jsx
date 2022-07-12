import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from '../hooks/useAuth'
const UpdateProfile = () => {
    const {auth, updateProfile} = useAuth();
    const [profile, setProfile] = useState({});
    const [msg, setMsg] = useState({})

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setProfile(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();
        const {name, email} = profile
        if([name, email].includes('')) {
            setMsg({
                msg: "Email y Nombre son obligatorios",
                error: true
            })
            setShowAlert(true);
            return;
        }
        const response = await updateProfile(profile)
        setMsg(response)
        setShowAlert(true)

        setTimeout(() => {
            setShowAlert(false)

            setMsg({response})
        }, 2000)
    }

    return ( 

        <>
            <AdminNav />
            <h2
            className="font-black text-3xl text-center mt-10"
            >Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {""} <span className="text-indigo-600 font-bold">información</span></p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {showAlert && <Alert alerts={msg} />}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label htmlFor="name" className="uppercase font-bold text-gray-600">Nombre</label>
                            <input
                            value={profile.name || ''}
                            onChange={e => setProfile({
                                ...profile, 
                                [e.target.name]: e.target.value
                            }
                            )}
                            id="name"
                            name="name"
                            type={`text`}
                            className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input
                            value={profile.web || ''}
                            onChange={e => setProfile({
                                ...profile, 
                                [e.target.name]: e.target.value
                            }
                            )}
                            id="web"
                            name="web"
                            type={`text`}
                            className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="phone" className="uppercase font-bold text-gray-600">Telefono</label>
                            <input
                            value={profile.phone || ''}
                            onChange={e => setProfile({
                                ...profile, 
                                [e.target.name]: e.target.value
                            }
                            )}
                            id="phone"
                            name="phone"
                            type={`phone`}
                            className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input
                            value={profile.email || ''}
                            onChange={e => setProfile({
                                ...profile, 
                                [e.target.name]: e.target.value
                            }
                            )}
                            id="email"
                            name="email"
                            type={`email`}
                            className="border w-full bg-gray-50 p-2 mt-5 rounded-lg"
                            />
                        </div>
                        <input 
                        type={`submit`}
                        value="Guardar cambio"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </>

    );
}
 
export default UpdateProfile;