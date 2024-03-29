import { useEffect } from "react";
import { Form, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore/lite";
import { db } from "../services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
   const [contacts, setContacts] = useState([]);
   const { userId } = useParams();
   let navigate = useNavigate();

   useEffect(() => {
      const fetchUser = async () => {
         const docs = await getDoc(doc(db, "users", userId));
         setContacts((prev) => [...prev, docs.data()]);
      };

      fetchUser();
   }, [userId]);

   async function handleDelete() {
      await deleteDoc(doc(db, "users", userId));
      navigate("/");
   }

   return (
      <div
         id='contact'
         className='min-h-screen bg-gray-100 flex items-center justify-center'
      >
         {contacts.map((contact, index) => {
            return (
               <div
                  key={index}
                  className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'
               >
                  <div className='flex items-center justify-center mb-6'>
                     <img
                        key={contact.avatar}
                        src={contact.avatar || null}
                        className='w-32 h-32 rounded-full'
                     />
                  </div>

                  <div>
                     <h1 className='text-2xl font-bold mb-2'>
                        {contact.first || contact.last ? (
                           <>
                              {contact.first} {contact.last}
                           </>
                        ) : (
                           <i>No Name</i>
                        )}
                     </h1>

                     {contact.twitter && (
                        <p className='mb-2'>
                           <a
                              target='_blank'
                              href={`https://twitter.com/${contact.twitter}`}
                              className='text-blue-500 hover:underline'
                           >
                              {contact.twitter}
                           </a>
                        </p>
                     )}

                     {contact.linkedin && (
                        <p className='mb-2'>
                           <a
                              target='_blank'
                              href={`https://linkedin.com/in/${contact.linkedin}`}
                              className='text-blue-500 hover:underline'
                           >
                              {contact.linkedin}
                           </a>
                        </p>
                     )}

                     {contact.description && (
                        <p className='mb-4'>{contact.description}</p>
                     )}

                     <div className='flex justify-between'>
                        <Form action='edit'>
                           <button
                              type='submit'
                              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                           >
                              Edit
                           </button>
                        </Form>
                        <button
                           type='submit'
                           onClick={handleDelete}
                           className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
}
