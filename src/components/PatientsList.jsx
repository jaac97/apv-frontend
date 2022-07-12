import usePatients from "../hooks/usePatients";
import Patient from "./Pacient";


const PatientsList = () => {
    const {patients} = usePatients()
    return ( 
        <>
            {patients.length ? 
                (
                    <>
                    <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
                    <p className="text-center mb-10 text-xl">Administa tus {''}
                        <span className="text-indigo-600 font-bold">pacientes.</span>
                    </p>
                    {
                        patients.map(patient =>(
                         <Patient  
                            key={patient.id}
                            patient={patient}
                         />
                        ))
                    }
                    </>
                ) : 
                (
                    <>
                        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                        <p className="text-center">Comienza agregando pacientes {''}
                            <span className="text-indigo-600 font-bold">y aparecerán listado aqui.</span>
                        </p>
                    </>
                )
            }
        </>
    );
}
 
export default PatientsList;