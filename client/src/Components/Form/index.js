import React, { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Form({formType,text}) {

    const [buttonClicked,setButtonClicked] = useState(false);
    const[errMsg,setErrMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      let email = e.target['email']?.value;
      let username = e.target['username']?.value;
      let password = e.target['password']?.value;
      
      try {
        if(formType ==='SignUp'){
          const response = await axios.post('http://localhost:8000/user/signup',{email,username,password});
          if(response?.status === 200){
            navigate('/login');
          }
        }
        else{
          const response = await axios.post('http://localhost:8000/user/login',{email,password});
          sessionStorage.setItem('token',response.data.token);
          sessionStorage.setItem('userEmail',response.data.dbEmail);
          if(response?.status === 200){
            navigate('/home');
          }
        }
      } catch (err) {
        console.log(err.response.data.msg);
        setErrMsg(err.response.data.msg);
      }
      setButtonClicked(true);
      setTimeout(()=>{
        setButtonClicked(false);
        setErrMsg('');
      },5000);
    }
    const handleNavigate = () => {
      if(formType === 'SignUp'){
        navigate('/login');
      }
      else{
        navigate('/');
      }
    }

  return (
    <div className='form-wrapper'>
        <h2>{formType}</h2>
        <form onSubmit={handleSubmit}>
          {formType === "SignUp"?<input type='text' name='username' placeholder='UserName' required/>:null}
            <input type='email' placeholder='Email' name='email' required/>
            <input type='password' placeholder='Password' name='password' required/>
            <div className='errMsg'>{errMsg}</div>
            <button className='btn' disabled={buttonClicked} type='submit'>{buttonClicked?`${formType}...`:formType}</button>
            <p>{text}<span onClick={handleNavigate}>{formType==='SignUp'? "Login":"SignUp"}</span></p>
        </form>
    </div>
  )
}

export default Form