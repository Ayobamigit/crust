import React from 'react'

const LoginError = (props) => {
    return (
        <div className="alert alert-info" dismissible="true" id="loginError" style={{fontSize:'12px'}}>
            {
                props.error    
            }    
        </div>
    )
}

export default LoginError