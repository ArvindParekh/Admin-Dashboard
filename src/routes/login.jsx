import { collection, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();



    async function handleLogin(){
        const adminRef = collection(db, "admins");

        const q = query(adminRef, where("email", "==", email), where("password", "==", pass));

        if(q){

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc)=> console.log(doc.data()))
        }
        else{
            console.log("User not found")
        }
    }

   return (
      <main className='h-screen w-screen flex items-center justify-center bg-gray-100'>
         <section className='h-[50%] w-[20%] flex flex-col items-center justify-evenly gap-10 bg-white border rounded-md p-5'>
            <h1 className='text-center text-5xl font-bold'>Login</h1>

            <div className="flex flex-col gap-3">
               <div className='flex flex-col justify-center'>
                  <label>Email</label>
                  <input
                     type='email'
                     className='border border-black rounded-md focus:outline-blue-500 focus:border-none' onChange={(e)=>setEmail(e.target.value)}
                  />
               </div>
               <div className='flex flex-col justify-center'>
                  <label>Password</label>
                  <input
                     type='password'
                     className='border border-black rounded-md focus:outline outline-blue-500 focus:border-none' onChange={(e)=>setPass(e.target.value)}
                  />
               </div>
            </div>

            <div>
            <button
                  className='p-3 rounded-md bg-black text-white font-medium hover:bg-white hover:text-black hover:border-black hover:border transition-all'
                  onClick={handleLogin}
               >
                  Login
               </button>
            </div>

            <div>
               <h1>New user? </h1>
               <Link to='/signup' className='text-blue-500'>
                  Create an account
               </Link>
            </div>
         </section>
      </main>
   );
};

export default Login;
