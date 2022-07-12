import { useState } from "react";
import Form from "../components/Form";
import PatientsList from "../components/PatientsList";


const AdminPatients = () => {
    const [showForm, setShowForm] = useState(false)
    
    return ( 
     

        <div className="flex flex-col md:flex-row ">
        <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white font-bold uppercase mx-10 mb-10 p-3 rounded-md md:hidden"
            type="button">
            {!showForm ? 'Mostrar Formulario': 'Ocultar Formulario'}
        </button>
            <div className={`${showForm ? 'block': 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
                <Form />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <PatientsList />
            </div>
        </div>
        

     );
}
 
export default AdminPatients;