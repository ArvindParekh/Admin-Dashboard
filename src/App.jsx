import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
   collection,
   getDocs,
   addDoc,
   deleteDoc,
   doc,
} from "firebase/firestore/lite";
import { db } from "./services/firebase";
import { useEffect } from "react";
import { useState } from "react";

function App() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      async function getUsers() {
         try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
               setUsers((prev) => [
                  ...prev,
                  {
                     data: doc.data(),
                     id: doc.id,
                  },
               ]);
            });
         } catch (e) {
            console.log("Error getting doc: ", e);
         }
      }

      getUsers();
   }, []);

   async function handleDelete(event) {
      if (!confirm("Please confirm you want to delete this record.")) {
         event.preventDefault();
      }
      const userId = event.target.getAttribute("data-user-id");
      await deleteDoc(doc(db, "users", userId));

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
   }

   return (
      <main className='flex items-center justify-center min-h-screen bg-gray-100'>
         <section className='w-full max-w-7xl p-6 bg-white rounded-lg shadow-lg'>
            <div className='flex justify-between items-center mb-6'>
               <div className='flex items-center gap-3'>
                  <div className='border bg-white focus-within:outline py-2 rounded-lg flex items-center shadow-lg'>
                     <SearchIcon className='text-gray-500' />
                     <input
                        className='border-none outline-none'
                        placeholder='Search'
                     ></input>
                  </div>
                  <Link
                     to='/add-user'
                     className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600'
                  >
                     Add User
                  </Link>
               </div>
            </div>
            <div className='overflow-auto'>
               {users.map((user, index) => (
                  <div
                     key={index}
                     className='flex items-center justify-between border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors duration-150'
                  >
                     <Link
                        to={`/users/${user.id}`}
                        className='text-lg font-semibold text-gray-700 hover:text-blue-500'
                     >
                        {user.data.first || user.data.last ? (
                           <>
                              {user.data.first} {user.data.last}
                           </>
                        ) : (
                           <i>No Name</i>
                        )}
                     </Link>
                     <button
                        type='button'
                        onClick={handleDelete}
                        data-user-id={user.id}
                        className='px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600'
                     >
                        Delete
                     </button>
                  </div>
               ))}
            </div>
         </section>
      </main>
   );
}

export default App;
