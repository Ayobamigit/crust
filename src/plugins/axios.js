import axios from "axios";

let authToken= null

if (typeof window !== "undefined") {
    if(localStorage.getItem('userDetails'))
    {
        const {token}= JSON.parse(localStorage.getItem('userDetails'));
        authToken = token;
    }
}

console.log(authToken)
authToken && (axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`)
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.status === 401){
        localStorage.clear();
        window.location.href = "/sign-in"; 
    } 
    return Promise.reject(error);
  });

export default axios;