import React, { useContext } from 'react'
import {FaEyeSlash, FaEye} from 'react-icons/fa'
import { LoginContext } from '../../pages/Signin/Signin'
import LoginError from '../loginerror/LoginError'
import SubmitLoader from '../submitloader/SubmitLoader'

const SignIn = () => {
    const {onSignIn, onChange, onRouteChange, togglePassword, state:{isPasswordShown, isLoggingIn, error, loginError}} = useContext(LoginContext)
  return (
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
            <div className="formgroup d-flex flex-wrap justify-content-end align-items-center">
                <p className="text-muted cursor-pointer text-hover-primary" onClick={()=>onRouteChange('forgot')}>Forgot Password ?</p>
            </div>
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
  )
}

export default SignIn