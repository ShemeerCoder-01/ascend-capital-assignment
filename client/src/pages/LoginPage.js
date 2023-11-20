import React from 'react'
import Navbar from '../Components/Navbar'
import Form from '../Components/Form'

function LoginPage() {
  return (
    <div>
        <Navbar/>
        <Form formType={"Login"} text={"Not yet signed up? "}/>
    </div>
  )
}

export default LoginPage