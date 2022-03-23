import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const navigate = useNavigate()
    const [credential, setcredential]=useState({name:"" ,email:"",password:"",cpassword:""})
    const handleSubmint=async(e)=>{
        e.preventDefault()
        if(credential.password==credential.cpassword){
            const response = await fetch(`http://localhost:4000/auth/sign`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
          })
          setcredential({name:"" ,email:"",password:"",cpassword:""})
          const json= await  response.json()
          console.log(json);
          if(json.token){
              localStorage.setItem('token',json.token)
              navigate('/')
              props.showAlert("user added successfully",'success')
          }else{
              props.showAlert("Invalid credential",'danger')
          }
        }else{
            props.showAlert("confirm the currect password",'danger')
        }
        
        }
        const onChange = (e) => {
            setcredential({...credential,[e.target.name]: e.target.value });
          };
  return (
    <div className='mt-5'>
      <form onSubmit={handleSubmint}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={credential.name}
            aria-describedby='emailHelp'
        onChange={onChange}
        />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={credential.email}
            aria-describedby='emailHelp'
        onChange={onChange}
        />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={credential.password}
        onChange={onChange}
        />
        </div>
        <div className='mb-3'>
          <label htmlFor='cpassword' className='form-label'>
            confirm Password
          </label>
          <input
            type='password'
            name='cpassword'
            value={credential.cpassword}
            className='form-control'
            id='cpassword'
        onChange={onChange}
        />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
