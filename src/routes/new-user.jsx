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
   const { userId } = useParams();
   let navigate = useNavigate();

   useEffect(() => {
      if (userId) {
         const fetchUser = async () => {
            const docs = await getDoc(doc(db, "users", userId));
            console.log(docs.data());
            setFName(docs.data().first);
            setLName(docs.data().last);
         };

         fetchUser();
      }
   }, []);

   async function handleSave() {
      if (userId) {
         console.log("Updating the existing data with the userId in database");
         try {
            await updateDoc(doc(db, "users", userId), {
               first: fName,
               last: lName,
            });
            navigate("/");
         } catch (e) {
            console.log("Error updating document: ", e);
         }
      } else {
         console.log("Creating new data in database");
         try {
            const docRef = await addDoc(collection(db, "users"), {
               first: fName,
               last: lName,
            });
            console.log("Document written with ID: ", docRef.id);
            navigate("/");
         } catch (e) {
            console.error("Error adding document: ", e);
         }
      }
   }

   return (
      <>
         {/* <form> */}
         <label>First Name</label>
         <input
            onChange={(e) => setFName(e.target.value)}
            value={fName}
         ></input>

         <label>Last Name</label>
         <input
            onChange={(e) => setLName(e.target.value)}
            value={lName}
         ></input>

         <button onClick={handleSave}>Save</button>
         {/* </form> */}
      </>
   );
};
