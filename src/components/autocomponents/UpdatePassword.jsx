import React, { useContext } from 'react'
import { LoginContext } from '../../pages/Signin/Signin'
import {FaEyeSlash, FaEye} from 'react-icons/fa'
import SubmitLoader from '../submitloader/SubmitLoader'

const UpdatePassword = () => {
    const {onChange, onUpdatePassword,togglePassword, state:{isLoggingIn, newPassword, confirmPassword, isOldPasswordShown, isNewPasswordShown, isConfirmPasswordShown}} = useContext(LoginContext)
    let disabled = true;
    let error = null


    if(newPassword !== '' && confirmPassword !== ''){
        if(newPassword !== confirmPassword){
            error = (<p style={{color:'#ff0014', fontSize: '14px'}} >Passwords don&apos;t match!!!</p>)
            disabled=true
        }
        else{
            disabled = false
        }
    }
    return (
      <div className="login-signin">
          <div className="my-20">
              <h1 className="sign-head">Update your Password</h1>
              <div style={{color:'#ff0014', fontSize: '13px'}}>
                    Enter the password sent to your mail to reset your password
              </div>
          </div>
        
            <form className="form fv-plugins-bootstrap fv-plugins-framework" onSubmit={onUpdatePassword}>
                <div className="formgroup mb-5 fv-plugins-icon-container">
                    <input 
                        className='formcontrol formcontrolsolid h-auto py-04 px-8'
                        type= {isOldPasswordShown ? "text" : "password"}
                        placeholder="Temporary Password" 
                        name="oldPassword" 
                        // value={username}
                        onChange={onChange}
                        required
                    />
                    {
                    isOldPasswordShown?
                    
                    <FaEyeSlash size={22} className="password-icon" style={{fill: '#181C32'}}  onClick={()=>togglePassword('old')}  />
                    :
                    
                    <FaEye className="password-icon" style={{fill: '#181C32'}} size={22} onClick={()=>togglePassword('old')}  />
                    
                    }
                    <div className="fv-plugins-message-container"></div>
                </div>
                <div className="formgroup mb-5 fv-plugins-icon-container">
                    <input 
                        className='formcontrol formcontrolsolid h-auto py-04 px-8'
                        type= {isNewPasswordShown ? "text" : "password"}
                        placeholder="New Password" 
                        name="newPassword" 
                        // value={password}
                        onChange={onChange}
                        required
                    />
                    {
                    isNewPasswordShown?
                    
                    <FaEyeSlash size={22} className="password-icon" style={{fill: '#181C32'}}  onClick={()=>togglePassword('new')}  />
                    :
                    
                    <FaEye className="password-icon" style={{fill: '#181C32'}} size={22} onClick={()=>togglePassword('new')}  />
                    
                    }
                    <div className="fv-plugins-message-container"></div>
                </div>
                <div className="formgroup mb-5 fv-plugins-icon-container">
                    <input 
                        className='formcontrol formcontrolsolid h-auto py-04 px-8'
                        type= {isConfirmPasswordShown ? "text" : "password"}
                        placeholder="Confirm Password" 
                        name="confirmPassword" 
                        // value={password}
                        onChange={onChange}
                        required
                    />
                    {
                    isConfirmPasswordShown?
                    
                    <FaEyeSlash size={22} className="password-icon" style={{fill: '#181C32'}}  onClick={()=>togglePassword('confirm')} />
                    :
                    
                    <FaEye className="password-icon" style={{fill: '#181C32'}} size={22} onClick={()=>togglePassword('confirm')}  />
                    
                    }
                    <div className="fv-plugins-message-container"></div>
                </div>

                {error}
                
                <button className="button-primary px-9 py-04 w-100" disabled={isLoggingIn || disabled}>
                    {
                        isLoggingIn ?
                        <SubmitLoader />
                        :
                        'Update Password'
                    }

                </button>

            
                <input type="hidden" /><div></div>
            </form>
  
      </div>
    )
}

export default UpdatePassword