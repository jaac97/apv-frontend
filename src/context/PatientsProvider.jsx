import {createContext, useState, useEffect} from 'react';
import clienteAxios  from '../config/axios';

const PatientsContext = createContext();
const PatientsProviders = ({children}) =>{

    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});

    useEffect(() => {
        const getPatients = async () => {
            try {
                 const token = localStorage.getItem('apv_token');
                 if(!token) return
                 const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/patients', config)
                setPatients(data)
            } catch (error) {
                console.log(error)
            }
        }
        getPatients()
    }, [])

   async function savePatient (patient)  {
        
        const token = localStorage.getItem('apv_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
         try {
           const {data} = await clienteAxios.post('/patients',patient,config)
           const {updatedAt, createdAt, ...patientDb } = data;
           setPatients([...patients, patientDb, ]);
        } catch (error) {
            console.log(error.response.data.msg)
        } 
    }
    const setEdition = (patient) => {
        setPatient(patient)
    }

    const updatePatient = async(patient) => {
        const token = localStorage.getItem('apv_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
  
         try {
            const {data} = await clienteAxios.put(`/patients/${patient.id}`, patient, config)
         } catch (error) {
            console.log(error)
         }
         const pets = patients.map(pet => {
            if(pet.id === patient.id){
                pet = patient;
            }
            return pet;
        })
        setPatients(pets)
        
    }
    const deletePatient = async(patient) => {
        const token = localStorage.getItem('apv_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        try {
            await clienteAxios.delete(`/patients/${patient.id}`, config)
            const pets = patients.filter(pet => pet.id !== patient.id)
            setPatients(pets)

         } catch (error) {
            console.log(error)
         }

  
    }
    return(
        <PatientsContext.Provider
            value={{
               patients,
               savePatient,
               setEdition,
               patient,
               updatePatient,
               deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )

}

export {
    PatientsProviders
}
export default PatientsContext;