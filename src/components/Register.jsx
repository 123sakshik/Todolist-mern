import React from 'react'
import { useState } from 'react';
import { register } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Register() {
  const [form, setform] = useState({
    name:"",
    username:"",
    email:"",
    password:""
  });

  const [errors, seterrors] = useState(null)
  
  const navigation=useNavigate();

  useEffect(() => {
   const user =localStorage.getItem('user');
   if(user){
    return navigation('/')
   }

  }, []);
  
  const handleInputChange = (e) => {
    setform({...form,[e.target.name]:e.target.value })
   }
const handleSubmit = async() => {
  const result =await register(form)
  if(result.status===200){
    if(result.status.data.status===201){
       seterrors(result.data.data);
       toast(result.data.message)
       return;
    }
    if(result.status.data.status===200){
     localStorage.setItem('user',JSON.stringify(result.data.data))
      navigation('/')
     return;
   }
   if(result.status.data.status===202){
    toast(result.data.message)
    return;
  }

  }else{
    toast('Something went wrong,please try again');  }
}
   
  return (
    <>
    <div className='container'>
       <ToastContainer/>
    <div className="row justify-content-md-center mt-4">
      <div className="col-lg-5 card border-primary mb-3">
      <div className='card-header h4 text-center'>
        Register An Account
      </div>
    <div className='card-body'>
       
       <div className="form-group">
        <label className="col-form-label mt-4">
          Name
        </label>
        <input type="text"
        name="name"
        onChange={handleInputChange}
         className='form-control'
          placeholder='Enter Name'/>

{errors?.name && (
 <small id="emailHelp" className="form-text text-denger">
  {errors.name.msg}
 </small>
)}
       </div>

       
       <div className="form-group">
        <label className="col-form-label mt-4">
          Username
        </label>
        <input type="text"
         name="username"
        onChange={handleInputChange}
         className='form-control'
          placeholder='Enter Username'/>

          
{errors?.username && (
 <small id="emailHelp" className="form-text text-denger">
  {errors.username.msg}
 </small>
)}
       </div>

       <div className="form-group">
        <label className="col-form-label mt-4">
          Email
        </label>
        <input type="text"
         name="email"
         onChange={handleInputChange}
         className='form-control'
          placeholder='Enter Your Email'/>
       
       
{errors?.email && (
 <small id="emailHelp" className="form-text text-denger">
  {errors.email.msg}
 </small>
)}
       </div>

       <div className="form-group">
        <label className="col-form-label mt-4">
          Password
        </label>
        <input type="password"
         name="password"
         onChange={handleInputChange}
         className='form-control'
          placeholder='Enter Password'/>
       
       
{errors?.password && (
 <small id="emailHelp" className="form-text text-denger">
  {errors.password.msg}
 </small>
)}
       </div>

       <div className="row justify-content-md-center form-group mt-4">
        <button type="button"
        onClick={handleSubmit}
        className="col-sm-6 btn btn-outline-secondary center">
          Register Now
          </button>
       </div>
      </div>
      </div>
    </div>
    </div>
    </>

  )
}

export default Register;