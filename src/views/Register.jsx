import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert';
import clienteAxios from '../config/axios';
class Register extends React.Component {
  constructor(props) {
    super(props);
    /*   
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [rePassword, setRePassword] = useState('');
    */
    this.state= {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      alerts: {},
      msg: false
    }
    this.msg = this.state.alerts;
    // Change State Inputs
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangEmail = this.handleChangEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeRePassword = this.handleChangeRePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    // Alerts
    this.handleAlerts = this.handleAlerts.bind(this);
    // Change state MSG to show or hidde an alert message
    this.handleChangeMsg = this.handleChangeMsg.bind(this);
  }
  handleChangeName(e) {
    this.setState({name: e.target.value})
  }
  handleChangEmail(e) {
    this.setState({email: e.target.value})
  }
  handleChangePassword(e) {
    this.setState({password: e.target.value})
  }
  handleChangeRePassword(e) {
    this.setState({rePassword: e.target.value})
  }

  handleChangeMsg(data) {
    this.setState({msg: data})
  } 
  // Check when the form is submit and if inputs are filled
  handleSubmit (e) {
      e.preventDefault();
      const properties = this.state
      if(Object.values(properties).includes('')){
          this.handleAlerts({msg:"Campos vacios",error: true})
          this.handleChangeMsg(true)
          return;
      }
      if(this.state.password !== this.state.rePassword){
        this.handleAlerts({msg:"Contraseñas diferentes", error: true})
        this.handleChangeMsg(true)
        return;
        
      }
      if(this.state.password.length < 8 ){
        this.handleAlerts({msg:"Contraseña muy corta, agrega minimo 8 caracteres", error: true});
        this.handleChangeMsg(true)
        return;
      }
      // If pass all validations then set alert to empty and msg to false to hidden div
      this.handleAlerts({})
      this.handleChangeMsg(false)

      // Send Request
      this.saveVet(this.state)
  }
    
    handleAlerts(data) {
      this.setState({alerts: data})
    }
    
    // Save the new Vet
   async saveVet({name, email, password}) {
      try {
        
        const url = `${import.meta.env.VITE_BACK_URL}/api/vets`;
        console.log(url)
        const response = await clienteAxios.post(url, {name, email, password})
        this.handleAlerts({
          msg: 'Creado Correctamente, revisa tú correo electronico',
          error: false
        })
        this.handleChangeMsg(true)
        
      } catch (error) {
        console.log(error.response) 
        this.handleAlerts({
          msg:error.response.data.msg,
          error: true
        })
        this.handleChangeMsg(true)
      }

    }


    render(){
    return (
    <>
        <div>
            <h1 className='text-indigo-600 font-black md:text-7xl text-4xl text-center md:text-left'>Crea tu cuenta y administra tus<span className='text-black'>{" "}Pacientes</span></h1>
        </div>
        
        <div className='mt-10 md:mt-0  shadow-lg px-5 py-10 rounded-xl bg-white'>
    {this.state.msg && <Alert 
        alerts={this.state.alerts}
      />}
      <form
        onSubmit={this.handleSubmit}
      >
      <div className='w-72 mx-auto md:w-full'>
            <label 
            className='uppercase text-gray-600 block text-xl font-bold '
            htmlFor='name'>
              Nombres
            </label>

            <input id='name' 
              value={this.state.name}
              onChange={this.handleChangeName}
              className='border w-full p-3 mt-3 bg-gray-100 rounded-xl'
              type="text" 
              placeholder='Escribe tu nombre' />
        </div>
        <div className='w-72 mx-auto md:w-full'>
            <label 
            className='uppercase text-gray-600 block text-xl font-bold '
            htmlFor='email'>
              Email
            </label>

            <input 
            id='email'
            value={this.state.email}
            onChange={this.handleChangEmail}
            className='border w-full p-3 mt-3 bg-gray-100 rounded-xl' 
            type="email" 
            placeholder='Email de registro' />
        </div>
        {/* Fin de email */}
        <div className='w-72 mx-auto mt-3 md:w-full'>
            <label 
            className='uppercase text-gray-600 block text-xl font-bold '
            htmlFor='password'>
              Password
            </label>
            <input 
            id='password' 
            value={this.state.password}
            onChange={this.handleChangePassword}
            className='border w-full p-3 mt-3 bg-gray-100 rounded-xl' 
            type="password" 
            placeholder='Tu contraseña' />
        </div>
        {/* Fin de password */}
        <div className='w-72 mx-auto mt-3 md:w-full'>
            <label 
            className='uppercase text-gray-600 block text-xl font-bold '
            htmlFor='rePassword'>
              Confirmar Contraseña
            </label>
            <input 
            id='rePassword' 
            value={this.state.rePassword}
            onChange={this.handleChangeRePassword}
            className='border w-full p-3 mt-3 bg-gray-100 rounded-xl' 
            type="password" 
            placeholder='Confirmar Contraseña' />
        </div>
        {/* Fin de password */}
        <input 
        type="submit"
        value="Registrarse"
        className='bg-indigo-600 md:w-auto w-72 mx-auto md:mx-0 py-3 md:px-10 rounded-xl text-white uppercase font-bold block mt-8 hover:cursor-pointer hover:bg-indigo-800' />
      </form>
      {/* Fin de formulario */}
      <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block my-5 text-center text-gray-500' to={"/"}>Iniciar Sesión</Link>
          <Link className='block my-5 text-center text-gray-500' to={"/recovery-password"}>Olvide mi contraseña</Link>
       </nav>
    </div>

    </>
      )
}
}

export default Register