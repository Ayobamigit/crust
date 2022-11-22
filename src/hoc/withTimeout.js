import React, { useEffect } from 'react'
import timeout from '../constants/timeout';

const withTimeout = (WrappedComponent) => {
    const WithTimeOut = () => {
        let logout;

        const clearTimeoutFunc = () => { 
            if (logout) {
                clearTimeout(logout)
            } 
        }
        const resetTimeout = () => {clearTimeoutFunc(); timer(); };

        const timer = () =>{
            logout = setTimeout(signout, timeout)
        }

        const signout = () => { 
            window.location.href = "/sign-in"; 
            localStorage.clear();  
        };
           
        useEffect(()=>{
            let events = [
                'load',
                'mousemove',
                'mousedown',
                'click',
                'scroll',
                'keypress'
            ];

            for (let i in events) 
                { window.addEventListener(events[i], resetTimeout); } 
            // timer()
            // return () => clearTimeout(timer);
        },[])

        return <WrappedComponent />
    };

    return WithTimeOut;
}

export default withTimeout