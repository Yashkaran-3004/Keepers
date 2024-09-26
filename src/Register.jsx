import React ,{useState}from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from 'axios';
import {useNavigate}  from "react-router-dom";


function Register(){
    const navigate = useNavigate();

    const [user,setUser] = useState({email:"",password:""});
    const [message,setMessage] = useState("");

    function handleChange(event){

        const {name,value} = event.target;

        setUser(prevValue=>{
            return{
                ...prevValue,[name]:value
            }
        });
    }

    
    async function handleSubmit(event){
        event.preventDefault();
        try{
        const response = await axios.post("https://keepers-zmu2.onrender.com/register",user);
        //console.log("recieved data after regisitration: ",response.data);

        navigate("/notes", { state: { user: response.data } });

        }
        catch(err){
            setMessage("Email already exist! Try login")

        }

    }



    return<>
    <div>
        <Header />
        <div className="form-signin w-100 m-auto">
        <form className="my-4" onSubmit={handleSubmit}>
    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

    <div className="form-floating mt-5">
    <label for="floatingInput">Email address</label>
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={handleChange} value={user.email}/>
      
    </div>
    <div className="form-floating">
    <label for="floatingPassword">Password</label>
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={handleChange}  value={user.password}/>
      
    </div>

    <button className="btn btn-primary w-100 py-2 my-5 signup" type="submit" >Sign Up</button>
  </form>
  </div>
        <Footer />
    </div>
    

    </>
}

export default Register;