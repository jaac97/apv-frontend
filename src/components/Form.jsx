import { useState, useEffect } from "react";
import Alert from '../components/Alert';
import usePatients from '../hooks/usePatients';
const Form = () => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [discharged, setDischarged] = useState('');
    const [symptom, setSymptom] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState({});
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);


    const {savePatient, patient, updatePatient} = usePatients();


    useEffect(() =>{
              if(Object.keys(patient).length){
                  setEdit(true)
                  setId(patient.id)
                  setName(patient.name)
                  setOwner(patient.owner)
                  setEmail(patient.email)
                  setDischarged(patient.discharged)
                  setSymptom(patient.symptom)
              }
      
          },[patient])

    const handleSubmit = e => {
        e.preventDefault();
        if([name, owner,email,discharged,symptom].includes('')){
            setShowAlert(true)
            setMsg({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        setMsg({
            msg: 'Paciente guardado',
            error: false
        });
        setShowAlert(true)
        const patient = {
            name, owner,email,discharged,symptom
        }
        savePatient({name, owner,email,discharged,symptom});

        // Once save, reset the form and stages
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
        setEdit(false)
        setId(null)
        setName('')
        setOwner('')
        setEmail('')
        setDischarged('')
        setSymptom('')
    }




    const handleEdit = e => {
        e.preventDefault()
        if([name, owner,email,discharged,symptom].includes('')){
            setShowAlert(true)
            setMsg({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        setMsg({
            msg: 'Paciente editado',
            error: false
        });
        updatePatient({name, owner,email,discharged,symptom,id})
        setShowAlert(true)
        setEdit(false)
        setId(null)
        setName('')
        setOwner('')
        setEmail('')
        setDischarged('')
        setSymptom('')
        
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }
    return ( 
        <>
            <p className="text-xl text-center mb-10">
                Añade tus pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                id="pet"
                onSubmit={!edit ? handleSubmit : handleEdit}
                className="bg-white py-10 px-5 mb-10 md:mb-5 shadow-md rounded-md"
            >
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold"
                    >
                    Nombre mascota
                    </label>
                    <input 
                        value={name}
                        onChange={e =>setName(e.target.value)}
                        id="name"
                        type='text'
                        placeholder="Osito" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="owner"
                        className="text-gray-700 uppercase font-bold"
                    >
                    Nombre Propietario
                    </label>
                    <input 
                        value={owner}
                        onChange={e =>setOwner(e.target.value)}
                        id="owner"
                        type='text'
                        placeholder="Josue ALarcon" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >
                    Email Propietario
                    </label>
                    <input 
                        value={email}
                        onChange={e =>setEmail(e.target.value)}
                        id="email"
                        type='text'
                        placeholder="ejemplo@correo.com" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="discharged"
                        className="text-gray-700 uppercase font-bold"
                    >
                    Fecha de alta
                    </label>
                    <input 
                        value={discharged}
                        onChange={e =>setDischarged(e.target.value)}
                        id="discharged"
                        type='date'
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="symptom"
                        className="text-gray-700 uppercase font-bold"
                    >
                    Sintomas
                    </label>
                    <textarea 
                        value={symptom}
                        onChange={e =>setSymptom(e.target.value)}
                        id="symptom"
                        placeholder="Describe los síntomas" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                     >
                     </textarea>
                </div>
                { !edit ? ( 
                <input 
                    type="submit"
                    value="Agregar Paciente"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
                />
                ) : 
                (<input 
                    type="submit"
                    value="Editar paciente"
                    className="bg-cyan-600 w-full p-3 text-white uppercase font-bold hover:bg-cyan-800 cursor-pointer transition-colors"
                />
                ) 
                }
            </form>
            {showAlert && <Alert alerts={msg} />}

        </>
    );
}
 
export default Form;