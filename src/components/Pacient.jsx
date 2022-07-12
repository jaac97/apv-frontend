import usePatients from "../hooks/usePatients";
const Patient = ({patient}) => {
    const {setEdition, deletePatient} = usePatients();
    const {email, discharged, id, name, owner, symptom} = patient;
    return ( 
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-700">Nombre: {""}
                <span className="font-normal normal-case text-black">{name}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700">Propietario: {""}
                <span className="font-normal normal-case text-black">{owner}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700">Email: {""}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700">Fecha de alta: {""}
                <span className="font-normal normal-case text-black">{discharged}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700">Sintomas: {""}
                <span className="font-normal normal-case text-black">{symptom}</span>
            </p>
            <div className="flex justify-between my-5">
                <button
                    onClick={() => setEdition(patient)}
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white uppercase rounded-lg font-bold"
                >Editar</button>
                <button
                    onClick={() => deletePatient(patient)}
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 transition-colors text-white uppercase rounded-lg font-bold"
                >Eliminar</button>
            </div>
        </div>
     );
}
 
export default Patient;