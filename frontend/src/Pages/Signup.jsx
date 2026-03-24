import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../Styles/SignUp.css"
import logo from "../Assert/logo/PortelLogo.png"

function Signup() {

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [number, setNumber] = useState('')
const [password, setPassword] = useState('')
const navigate=useNavigate()
const [error,setError]=useState('')
const register = async (e) => {
  e.preventDefault()

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/account/register/",
      { username:name, email:email, phone_num:number, password:password }
    )

   console.log(res.data)
   console.log("User registered successfully")
   navigate('/')


  } catch (error) {
    console.log(error)
    console.log(error.response?.data)
    const data=error.response?.data
    const message= data?.email?.[0] && data?.email?.[0]||
                  data?.phone_num?.[0] && data?.phone_num?.[0]||
                  data?.password?.[0] && data?.password?.[0]
    setError(message)
   
  }
}

  return (
  
 <div className="register-main ">
    
      <div className="register-right container">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="register-center">
            <h2>Welcome to our website!</h2>
            <p>Please enter your details</p>
            {error&&<p className="error">{error}</p>}
            <form onSubmit={register}>
            <input type="text" placeholder="UserName" name="name" required={true} onChange={(e)=>setName(e.target.value)} />
           
              <input type="email" placeholder="Email" name="email" required={true}  onChange={(e) => setEmail(e.target.value)}/>
              <div className="pass-input-div">
                <input  type="tel" pattern="[0-9]{10}" placeholder="Mobile number" name="number" required={true}  onChange={(e) => setNumber(e.target.value)}/>
              
                
              </div>
              <div className="pass-input-div">
                <input type='password' placeholder="Password" name="Password" required={true} onChange={(e) => setPassword(e.target.value)}/>
               
                
              </div>
              <div className="register-center-buttons">
                <button type="submit" >Sign Up</button>
              
              </div>
            </form>
          </div >

          <p className="login-bottom-p">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
    
      
  )
}

export default Signup

