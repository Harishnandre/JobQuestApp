import { createContext,useEffect,useState} from "react";
import axios from "axios";

export const Authcontext=createContext({
  user:"", //default value
  token:"",
})  //this context will pass to all child when it needed

const AuthcontextProvider=({children})=>{
  const [auth,setauth]=useState(Authcontext);
  console.log(auth.user);
  axios.defaults.headers.common["Authorization"] = auth?.token; //every axios request contains token in header by default for authorization purpose
useEffect(()=>{
  const data=JSON.parse(localStorage.getItem('auth'));
  if (data){
    setauth({
      ...auth,
      user:data.user,
      token:data.token
    })
  }

},[]);
return(
  <Authcontext.Provider value={[auth,setauth]}>
      {children}
  </Authcontext.Provider>
);  

}
export default AuthcontextProvider;