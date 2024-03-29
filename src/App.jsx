import { Link } from "react-router-dom";
import { Form } from "react-router-dom";

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
   //  const users = [
   //     {
   //        first: "Your",
   //        last: "Name",
   //        avatar: "https://placekitten.com/g/200/200",
   //        twitter: "your_handle",
   //        notes: "Some notes",
   //        favorite: true,
   //     },
   //     {
   //        first: "Arvind",
   //        last: "Parekh",
   //        avatar: "https://placekitten.com/g/200/200",
   //        twitter: "Arvindparekh_21",
   //        notes: "Some notes",
   //        favorite: true,
   //     },
   //  ];

   useEffect(() => {
      async function getUsers() {
         try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
               console.log(doc.id);
               setUsers((prev) => {
                  return [
                     ...prev,
                     {
                        data: doc.data(),
                        id: doc.id,
                     },
                  ];
               });
            });
         } catch (e) {
            console.log("Error getting doc: ", e);
         }
      }

      getUsers();
   }, []);

   useEffect(() => {
      console.log("Users have changed!");
   }, [users]);

   async function handleDelete(event) {
      if (!confirm("Please confirm you want to delete this record.")) {
         event.preventDefault();
      }
      const userId = event.target.getAttribute("data-user-id");
      await deleteDoc(doc(db, "users", userId));

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
   }

   return (
      <main className='w-screen h-screen flex items-center justify-center'>
         <section className='w-[70vw] h-[70vh] border rounded-md shadow-sm flex flex-col items-center justify-evenly'>
            <aside className='border w-[60vw] h-[8vh] rounded-lg flex items-center justify-between'>
               <input className='border' placeholder='Search'></input>
               <Link
                  to='/add-user'
                  className='p-2 bg-black rounded-lg text-white'
               >
                  Add New User
               </Link>
            </aside>
            <aside className='border w-[60vw] h-[50vh] rounded-lg'>
               <div id='user'>
                  {users.map((user, index) => {
                     return (
                        <div key={index} className='flex border'>
                           <div className='flex w-full items-center justify-between'>
                              <Link to={`/users/${user.id}`}>
                                 <h1>
                                    {user.data.first || user.data.last ? (
                                       <>
                                          {user.data.first} {user.data.last}
                                       </>
                                    ) : (
                                       <i>No Name</i>
                                    )}{" "}
                                 </h1>
                              </Link>

                              <div>
                                 {/* <Form action='edit'>
                                    <button type='submit'>Edit</button>
                                 </Form> */}
                                 {/* <Form
                                    method='post'
                                    action='destroy'
                                    onSubmit={(event) => {
                                       if (
                                          !confirm(
                                             "Please confirm you want to delete this record."
                                          )
                                       ) {
                                          event.preventDefault();
                                       }
                                    }}
                                 > */}
                                 <button
                                    type='submit'
                                    onClick={handleDelete}
                                    data-user-id={user.id}
                                 >
                                    Delete
                                 </button>
                                 {/* </Form> */}
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </aside>
         </section>
      </main>
   );
}

export default App;
