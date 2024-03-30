import { useState } from "react";
import {
   addDoc,
   collection,
   doc,
   getDoc,
   updateDoc,
} from "firebase/firestore/lite";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const NewUser = () => {
   const [fName, setFName] = useState();
   const [lName, setLName] = useState();
   const [twitter, setTwitter] = useState();
   const [lk, setLk] = useState();
   const [desc, setDesc] = useState();

   const { userId } = useParams();
   let navigate = useNavigate();

   useEffect(() => {
      if (userId) {
         const fetchUser = async () => {
            const docs = await getDoc(doc(db, "users", userId));
            setFName(docs.data().first);
            setLName(docs.data().last);
            setTwitter(docs.data().twitter);
            setLk(docs.data().linkedin);
            setDesc(docs.data().description);
         };

         fetchUser();
      }
   }, []);

   async function handleSave() {
      if (userId) {
         try {
            await updateDoc(doc(db, "users", userId), {
               first: fName,
               last: lName,
               twitter: twitter,
               linkedin: lk,
               description: desc,
            });
            navigate(`/users/${userId}`);
         } catch (e) {
            console.log("Error updating document: ", e);
         }
      } else {
         try {
            const docRef = await addDoc(collection(db, "users"), {
               first: fName,
               last: lName,
               twitter: twitter,
               linkedin: lk,
               description: desc,
            });
            navigate("/dashboard");
         } catch (e) {
            console.error("Error adding document: ", e);
         }
      }
   }

   return (
      <div className='w-screen h-screen flex flex-col items-center justify-center bg-gray-100'>
         <div className='border w-[50%] h-[50%] bg-white rounded-xl shadow-lg p-6'>
            <div className='grid grid-rows-5 grid-cols-3 gap-y-5 gap-x-4'>
               <label className='col-span-1 text-gray-700 font-semibold'>
                  Name
               </label>
               <input
                  onChange={(e) => setFName(e.target.value)}
                  value={fName}
                  placeholder='First Name'
                  className='col-span-1 border rounded-lg shadow-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
               ></input>
               <input
                  onChange={(e) => setLName(e.target.value)}
                  value={lName}
                  placeholder='Last Name'
                  className='col-span-1 border rounded-lg shadow-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
               ></input>

               <label className='col-span-1 text-gray-700 font-semibold'>
                  Twitter
               </label>
               <input
                  onChange={(e) => setTwitter(e.target.value)}
                  value={twitter}
                  className='col-span-2 border rounded-lg shadow-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='@username'
               ></input>

               <label className='col-span-1 text-gray-700 font-semibold'>
                  LinkedIn
               </label>
               <input
                  onChange={(e) => setLk(e.target.value)}
                  value={lk}
                  className='col-span-2 border rounded-lg shadow-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='username'
               ></input>

               <label className='col-span-1 text-gray-700 font-semibold'>
                  Description
               </label>
               <input
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className='col-span-2 border rounded-lg shadow-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Notes'
               ></input>
            </div>
            <button
               className='mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
               onClick={handleSave}
            >
               Save
            </button>
         </div>
      </div>
   );
};
