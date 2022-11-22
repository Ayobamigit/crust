const getDetails = () =>{
    if (typeof window !== "undefined"){
        return JSON.parse(localStorage.getItem('userDetails'));
    }
}

export const userData = getDetails()