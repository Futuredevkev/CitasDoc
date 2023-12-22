import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import './App.css'
import { useEffect, useState } from "react"

function App() {
 
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []); // este es el de la lista.
  const [paciente, setPaciente] = useState({}); // este estado lo estamos usando para editar la lista creada


  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  },[pacientes]) // almacenamos en el local storage, la lista para q no se borre 

  const eliminarPaciente = (id) => {
      const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
      setPacientes(pacientesActualizados)
  } // logica para eliminar paciente 

  return (
    <div>
      <Header/>

      <div className="mt-12 md:flex ml-5">

        <Formulario 
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
        />

        <ListadoPacientes pacientes={pacientes} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente} />

      </div>

    </div>
  )
}

export default App
