import React, { useState, useContext } from 'react'
import {FaEyeSlash, FaEye} from 'react-icons/fa'
import SubmitLoader from '../../components/submitloader/SubmitLoader';
import LoginError from '../../components/loginerror/LoginError';
import { signIn } from '../../plugins/url';
import axios from '../../plugins/axios';
import { useNavigate } from 'react-router';
import { authContext } from '../../context/AuthenticationContext';
import logo from '../../assets/img/logo.png'


const Signin = () => {
  const {setAuthenticationStatus} = useContext(authContext)
  const navigate = useNavigate()
  const[state, setState] = useState({
    username:'',
    password:'',
    loginError:false,
  })

  const {loginError, isPasswordShown, username, password, error, isLoggingIn} = state;

  const onChange =(e)=>{
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  const onSignIn = (e) =>{
      e.preventDefault();
      setState(state=>({
          ...state,
          isLoggingIn: true
      }))

      let reqBody={
          username,
          password
      }

      axios({
          url:`${signIn}`,
          method: 'post',
          data: reqBody,
      }).then(res=>{
          if(res.status === 200){
              const {token, firstname, lastname, id, username, userType, permissionList} = res.data;
              setAuthenticationStatus(true)

              localStorage.setItem('userDetails', JSON.stringify({
                  token,
                  firstname,
                  lastname,
                  id,
                  userType, 
                  username,
                  permissionList
              }))
              localStorage.setItem('reloadCount',0)
              navigate('/dashboard')
          }

      }).catch(err => {
        if(err.response.status === 417)
        {
          setState(state=>({
            ...state,
            isLoggingIn: false,
            loginError: true,
            error: 'Invalid Credentials'
        }))
        }else{
          setState(state=>({
              ...state,
              isLoggingIn: false,
              loginError: true,
              error: err.message
          }))
        }
      });
  }

  const togglePassword = () =>{
      setState({
          ...state,
          isPasswordShown : !isPasswordShown
      }) 
  } 

  return (
    <div className="d-flex flex-column flex-root bgi-position-top">
      <div className="login login-4 login-signin-on d-flex flex-row-fluid">
          <div className="d-flex flex-center flex-row-fluid">
              <div className="login-form text-center p-7 position-relative overflow-hidden">
                  <div className="d-flex flex-center mb-15">
                      <img src={logo} alt="Logo" className="max-h-75px"  />
                  </div>

                <div className="login-signin">
                <div className="my-20">
                    <h1 className="sign-head">Welcome to CRUST</h1>
                    <div className="sign-muted">
                            Enter your details to login to your account:
                    </div>
                </div>
          
                <form className="form fv-plugins-bootstrap fv-plugins-framework" onSubmit={onSignIn}>
                  <div className="formgroup mb-5 fv-plugins-icon-container">
                      <input 
                          className="formcontrol formcontrolsolid h-auto py-04 px-8"
                          type="text"
                          placeholder="Username" 
                          name="username" 
                          onChange={onChange}
                          required
                      />
                      <div className="fv-plugins-message-container"></div>
                  </div>
                  <div className="formgroup mb-5 fv-plugins-icon-container">
                      <input 
                          className="formcontrol formcontrolsolid h-auto py-04 px-8"
                          placeholder="Password" 
                          name="password" 
                          // autoComplete='new-password'
                          onChange={onChange}
                          type= {isPasswordShown ? "text" : "password"} 
                          required
                      />
                      {
                      isPasswordShown?
                      
                      <FaEyeSlash size={22} className="password-icon" style={{fill: '#3E2E26'}}  onClick={togglePassword}  />
                      :
                      
                      <FaEye className="password-icon" style={{fill: '#3E2E26'}} size={22} onClick={togglePassword}  />
                      
                      }
                      <div className="fv-plugins-message-container"></div>
                  </div>
                  {
                      loginError ?
                      <LoginError error={error} />
                      :
                      null
                  }

                  
                  <button className="button-primary px-9 py-04 w-100" disabled={isLoggingIn} style={{fontSize:'16px'}}>
                      {
                          isLoggingIn ?
                          <SubmitLoader />
                          :
                          'Sign In'
                      }
                  </button>
              
                  <input type="hidden" /><div></div>
                </form>
             </div>
            </div>
          </div> 
      </div>
    </div>
  )
}

export default Signin