import React, { useState, useContext, createContext } from 'react'
import { forgotPassword, signIn, updatePassword } from '../../plugins/url';
import axios from '../../plugins/axios';
import { useNavigate } from 'react-router';
import { authContext } from '../../context/AuthenticationContext';
import logo from '../../assets/img/logo.png'
import SignIn from '../../components/autocomponents/SignIn';
import ForgotPassword from '../../components/autocomponents/ForgotPassword';
import UpdatePassword from '../../components/autocomponents/UpdatePassword';
import Swal from '../../plugins/swal';


export const LoginContext = createContext()
const Signin = () => {
  const {setAuthenticationStatus} = useContext(authContext)
  const navigate = useNavigate()
  const[state, setState] = useState({
    route:'login',
    username:'',
    password:'',
    oldPassword:'',
    newPassword:'',
    confirmPassword:'',
    email:'',
    loginError:false,
    isPasswordShown: false,
    isOldPasswordShown: false,
    isNewPasswordShown:false, 
    isConfirmPasswordShown:false,
  })

  const {isPasswordShown, isOldPasswordShown, isNewPasswordShown, isConfirmPasswordShown, username, password, email, oldPassword, newPassword, route} = state;

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

  const togglePassword = (value) =>{
    if(value==='old'){
        setState({
            ...state,
            isOldPasswordShown : !isOldPasswordShown
        }) 
    }else if(value === 'new'){
        setState({
            ...state,
            isNewPasswordShown : !isNewPasswordShown
        }) 
    }else if(value === 'confirm'){
        setState({
            ...state,
            isConfirmPasswordShown : !isConfirmPasswordShown
        }) 
    }else{
        setState({
            ...state,
            isPasswordShown : !isPasswordShown,
        })
    }
    
} 

  const onRouteChange = (value) =>{
        setState(state=>({
            ...state,
            route: value
        }))
    }

    const onValidateEmail = (e) =>{
        e.preventDefault();
        setState(state=>({
            ...state,
            isLoggingIn: true
        }))

        axios({
            url:`${forgotPassword}/${email}`,
            method: 'get',
        }).then(res=>{
            setState(state=>({
                ...state,
                isLoggingIn: false
            }))

            if(res.status === 200){
                setState(state=>({
                    ...state,
                    route: 'change'
                }))
            }

        }).catch(err => {
            setState(state=>({
                ...state,
                isLoggingIn: false,
                loginError: true,
                error: err.response.data.messagee
            }))
        });
    }

    const onUpdatePassword=(e)=>{
        e.preventDefault();
        setState(state=>({
            ...state,
            isLoggingIn: true
        }))

        let reqBody = {
            email,
            oldPassword,
            newPassword,
        }

        axios({
            url:`${updatePassword}`,
            method: 'post',
            data: reqBody
        }).then(res=>{

            setState(state=>({
                ...state,
                isLoggingIn: false
            }))

            if(res.status === 200){
                Swal.fire({
                    // type:'success',
                    title: 'Successful....',
                    icon: 'success',
                    text: `Password change successful! Kindly login again with your new password`
                })
                setState(state=>({
                    ...state,
                    route: 'login'
                }))
            }

        }).catch(err => {
            Swal.fire({
                // type:'success',
                title: 'Ooops....',
                icon: 'error',
                text: `An error occured while trying to change password`
            })
            setState(state=>({
                ...state,
                isLoggingIn: false,
            }))
        });
    }

    const renderPages = () =>{
        switch(route){
            case 'login':
                return <SignIn />;
            case 'forgot':
                return <ForgotPassword/>;
            case 'change':
                return <UpdatePassword />;
            default:
                return <SignIn />
        }
    }
  return (
    <LoginContext.Provider value={{
        state,
        onSignIn,
        onChange,
        onRouteChange,
        onValidateEmail,
        onUpdatePassword,
        togglePassword
    }}>
    <div className="d-flex flex-column flex-root bgi-position-top">
      <div className="login login-4 login-signin-on d-flex flex-row-fluid">
          <div className="d-flex flex-center flex-row-fluid">
              <div className="login-form text-center p-7 position-relative overflow-hidden">
                  <div className="d-flex flex-center mb-15">
                      <img src={logo} alt="Logo" className="max-h-75px"  />
                  </div>

                {renderPages()}
            </div>
          </div> 
      </div>
    </div>
    </LoginContext.Provider>
  )
}

export default Signin