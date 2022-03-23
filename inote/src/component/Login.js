import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
        const navigate = useNavigate()
    const [credential, setcredential]=useState({email:"",password:""})
    const handleSubmint=async(e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:credential.email,password:credential.password})
          })
          setcredential({email:"",password:""})
          const json= await  response.json()
          console.log(json);
          if(json.token){
              localStorage.setItem('token',json.token)
              navigate('/')
              props.showAlert(' login Successfully','success')
          }else{
              props.showAlert('Invalid email or password','danger')
          }
        }
        const onChange = (e) => {
            setcredential({...credential,[e.target.name]: e.target.value });
          };
  return (
    <div className='mt-5'>
      <form onSubmit={handleSubmint}>
        <div className='mb-3'>
          <label htmlFor='Email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='Email'
            value={credential.email}
            name="email"
            onChange={onChange}
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='Password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='Password'
            name="password"
            onChange={onChange}
            value={credential.password}
          />
        </div>
        <button type='submit' className='btn btn-primary' >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
