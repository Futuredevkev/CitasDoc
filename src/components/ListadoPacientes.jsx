import Paciente from "./Paciente";

export default function ListadoPacientes({ pacientes, setPaciente, eliminarPaciente }) {

// zona donde se crea la lista de pacientes 

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map((paciente) => (
            <Paciente paciente={paciente} setPaciente={setPaciente} key={paciente.id}  eliminarPaciente={eliminarPaciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {""}
            <span className="text-indigo-600 font-bold">
              Apareceran aqui abajo!
            </span>
          </p>
        </>
      )}
    </div>
  );
}
