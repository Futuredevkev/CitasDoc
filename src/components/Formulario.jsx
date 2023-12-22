import { useState, useEffect } from "react";
import Error from './Error'


export default function Formulario({ setPacientes, pacientes, paciente, setPaciente }) {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('')
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)

  useEffect(() => {
    if( Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setTelefono(paciente.telefono)
      setSintomas(paciente.sintomas)
    }
  },[paciente])

  const generarId = () => {
    const random = Math.random().toLocaleString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion de formulario 

    if([nombre,propietario,email,fecha,sintomas,telefono].includes('')) {
      setError(true)
      return;
    }

    setError(false)

    // Objeto de paciente 

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      telefono,
      sintomas
    }

    if(paciente.id) {
      // editando el registro 

      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
      
      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {

      // nuevo registro 

      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])
    }

   

    // Reiniciar form 

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setTelefono('')
    setSintomas('')
  }

  return (

    <div className="md:w-1/2 lg:w-2/5 mx-5">
    <h2 className="font-black text-3xl text-center">Seguimientos Perrunos</h2>

    <p className="text-lg mt-5 text-center mb-10">
       Añade Pacientes y {''}
       <span className="font-bold text-indigo-600">Administralos</span>
    </p>

    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5">

    { error &&  <Error mensaje='Todos los campos son obligatorios'/> }

    <div className="mb-5">
      <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Perruno</label>
      <input id="mascota" value={nombre} onChange={ (e) => setNombre(e.target.value) } className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md" type="text" placeholder="Nombre de la Mascota" />
  </div>

  <div className="mb-5">
      <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
      <input value={propietario} onChange={ (e) => setPropietario(e.target.value) } id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md" type="text" placeholder="Nombre del propietario" />
  </div>

  <div className="mb-5">
      <label htmlFor="email" className="block text-gray-700 uppercase font-bold">E-mail</label>
      <input value={email} onChange={ (e) => setEmail(e.target.value) } id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md" type="email" placeholder="E-mail" />
  </div>

  <div className="mb-5">
      <label htmlFor="telefono" className="block text-gray-700 uppercase font-bold">Tel</label>
      <input value={telefono} onChange={ (e) => setTelefono(e.target.value) } id="telefono" className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md" type="tel" placeholder="TEL" />
  </div>

  <div className="mb-5">
      <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
      <input value={fecha} onChange={ (e) => setFecha(e.target.value) } id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md" type="date" />
  </div>

  <div className="mb-5">
  <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
  <textarea value={sintomas} onChange={ (e) => setSintomas(e.target.value) } id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md" placeholder="Describe los sintomas" />
</div>

<input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } />

    </form>

    </div>
  )
}
