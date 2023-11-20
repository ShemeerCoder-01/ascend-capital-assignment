import React from 'react'
import Navbar from '../Components/Navbar'
import Form from '../Components/Form'

function SignUpPage() {
  return (
    <div>
        <Navbar/>
        <Form formType={"SignUp"} text={'Already signed up? '}/>
    </div>
  )
}

export default SignUpPage