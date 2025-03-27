import React, { useState } from 'react'
import AuthLayout from "../../components/layouts/AuthLayout"
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from "../../utils/helper"


const Login = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] =useState("")
  const [ error, setError ] = useState(null)

  const navigate = useNavigate()

  //logic to handle login 

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("enter the valid email address")
      return;
    }
    if (!password) {
      setError("please enter the password")
      return;
    }
    setError("");

    // API calls goes here
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter the details to log in
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            Value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@gmail.com"
            type="email"
          />
          <Input
            Value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          { error && <p className='text-red-500 text-xs pb-2.5'>{error}</p> }
          <button type='submit' className='btn-primary'>
            LOGIN
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            don't have an account?{" "}
                <Link className="font-medium text-primary underline" to="/signUp">
                  SignUp
                </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login