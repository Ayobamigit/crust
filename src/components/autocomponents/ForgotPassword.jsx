import React, { useContext } from 'react'
import { LoginContext } from '../../pages/Signin/Signin'
import LoginError from '../loginerror/LoginError'
import SubmitLoader from '../submitloader/SubmitLoader'

const ForgotPassword = () => {
    const {onChange, onRouteChange, onValidateEmail, state:{loginError,error, isLoggingIn}} = useContext(LoginContext)
    return (
      <div className="login-signin">
          <div className="my-20">
              <h1 className="sign-head">Reset your password</h1>
              <div className="text-muted">
                      Provide the following details to reset your password:
              </div>
          </div>
          
              <form className="form fv-plugins-bootstrap fv-plugins-framework" onSubmit={onValidateEmail}>
                <div className="formgroup mb-5 fv-plugins-icon-container">
                    <input 
                        className='formcontrol formcontrolsolid h-auto py-04 px-8'
                        type="email" 
                        placeholder="Email" 
                        name="email" 
                        onChange={onChange}
                        required
                    />
                    <div className="fv-plugins-message-container"></div>
                </div>
                <div className="formgroup d-flex flex-wrap justify-content-end align-items-center">
                    <p className="text-muted cursor-pointer text-hover-primary" onClick={()=>onRouteChange('login')}>Back to Sign in</p>
                </div>

                {
                    loginError ?
                    <LoginError error={error} />
                    :
                    null
                }

                
                <button className="button-primary px-9 py-04 w-100" disabled={isLoggingIn}>
                    {
                        isLoggingIn ?
                        <SubmitLoader />
                        :
                        'Proceed'
                    }

                </button>

            
                <input type="hidden" /><div></div>
              </form>
  
      </div>
    )
}

export default ForgotPassword