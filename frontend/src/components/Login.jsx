import React, { useContext, useState } from 'react'
import TextInput from './shared/TextInput'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import globalContext from '../contexts/globalContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
const FormLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dataToSend = {
    email: email.trim().toLowerCase(),
    password,
  }
  const [loading, setLoading] = useState(false)
  const { token, setToken } = useContext(globalContext)
  const handleSignin = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signin`,
        {
          email: email.trim().toLowerCase(),
          password,
        },
        {
          withCredentials: true,
        }
      )

      setToken(res.data.data.token)
      setLoading(false)
      toast.success('Logged in Successfully')
      navigate('/home')
    } catch (error) {
      console.log(error)
      toast.error('Login Failed')
      setLoading(false)
    }
  }
  return (
    <div className="  flex flex-col w-fit  text-white justify-center items-center">
      <h1 className="mt-4 font-semibold text-3xl">Login to Medishop.</h1>
      <div className="p-4 w-full items-center justify-center flex">
        <GoogleLogin
          theme="filled_blue"
          onSuccess={async (credentialResponse) => {
            const { credential } = credentialResponse
            try {
              const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/google`,
                { token: credential },
                {
                  withCredentials: true,
                }
              )
              navigate('/home')

              setToken(res.data.data.token)
              console.log(token)

              console.log('User authenticated successfully', res.data)
            } catch (error) {
              console.error('Google authentication failed', error)
            }
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
      <div>
        <h1 className="w-full text-sm text-zinc-400 text-center">- OR -</h1>
      </div>
      <div className=" text-base text-white  w-full p-4 ">
        <TextInput
          label={'Email Address'}
          placeholder={'Enter your email address'}
          type={'text'}
          value={email}
          onChange={setEmail}
        />

        <TextInput
          label={'Password'}
          placeholder={'Enter Password'}
          type="password"
          value={password}
          onChange={setPassword}
        />

        <div className="flex items-center justify-between mt-4">
          <h5 className="text-sm group mr-5">
            Don't Have an account?{' '}
            <Link
              to="/signup"
              className="group-hover:text-blue-500 hover:text-blue-400 underline"
            >
              Register
            </Link>
          </h5>
          <button
            className="relative w-[150px]  my-4  px-4 py-1 rounded-full bg-zinc-900 isolation-auto z-10 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-600 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
            onClick={handleSignin}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </div>{' '}
    </div>
  )
}
const Login = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full md:w-10/12 flex-col md:flex-row flex h-fit p-2  bg-black  rounded-xl overflow-hidden">
        <div className="md:hidden w-full md:w-1/2 text-black my-auto flex justify-center items-center h-full max-h-[700px]">
          <FormLogin />
        </div>
        <div className="w-full relative md:w-1/2 h-full max-h-[700px] overflow-hidden rounded-xl">
          <img
            className="rounded-xl obej"
            src="https://images.rawpixel.com/image_social_portrait/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsX29mZmljZV80NV9hbl9hYnNyYWN0X2dyYXBoaWNfZWxlbWVudF9vZl9zcGxhc2hfbWluaW1hbF9lYzkwZTRmMi1iYmZiLTQzOTktYTk2MS01NGYxZTg4NjVkZTkuanBn.jpg"
            alt=""
          />
          <div className=" flex flex-col justify-center items-baseline  capitalize absolute p-6 top-0 left-0 w-full h-full">
            <h1 className="text-white lg:text-[5vw] text-6xl font-bold">
              Have a Good and Healthy Body and Mind.
            </h1>
          </div>
        </div>
        <div className=" hidden md:flex w-full md:w-1/2 text-black my-auto  justify-center items-center h-full max-h-[700px]">
          <FormLogin />
        </div>
      </div>
    </div>
  )
}
export default Login
