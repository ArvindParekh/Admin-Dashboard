import { useState } from "react";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export const NewUser = () => {
   const [fName, setFName] = useState();
   const [lName, setLName] = useState();
   let navigate = useNavigate();

   async function handleSave() {
      try {
         const docRef = await addDoc(collection(db, "users"), {
            first: fName,
            last: lName,
            // born: 1815,
         });
         console.log("Document written with ID: ", docRef.id);
         navigate("/");
      } catch (e) {
         console.error("Error adding document: ", e);
      }
   }

   return (
      <>
         {/* <form> */}
            <label>First Name</label>
            <input onChange={(e) => setFName(e.target.value)}></input>

            <label>Last Name</label>
            <input onChange={(e) => setLName(e.target.value)}></input>

            <button onClick={handleSave}>Save</button>
         {/* </form> */}
      </>
   );
};
