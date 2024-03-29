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
         console.log(docs.data());
         setContacts((prev) => {
            return [...prev, docs.data()];
         });
      };

      fetchUser();
   }, [userId]);

   async function handleDelete() {
      await deleteDoc(doc(db, "users", userId));
      navigate("/");
   }

   return (
      <div id='contact'>
         {contacts.map((contact, index) => {
            return (
               <div key={index}>
                  <div>
                     <img key={contact.avatar} src={contact.avatar || null} />
                  </div>

                  <div>
                     <h1>
                        {contact.first || contact.last ? (
                           <>
                              {contact.first} {contact.last}
                           </>
                        ) : (
                           <i>No Name</i>
                        )}{" "}
                     </h1>

                     {contact.twitter && (
                        <p>
                           <a
                              target='_blank'
                              href={`https://twitter.com/${contact.twitter}`}
                           >
                              {contact.twitter}
                           </a>
                        </p>
                     )}

                     {contact.linkedin && (
                        <p>
                           <a
                              target='_blank'
                              href={`https://linkedin.com/in/${contact.linkedin}`}
                           >
                              {contact.linkedin}
                           </a>
                        </p>
                     )}

                     {contact.description && <p>{contact.description}</p>}

                     <div>
                        <Form action='edit'>
                           <button type='submit'>Edit</button>
                        </Form>
                        {/* <Form
                           method='post'
                           // action='destroy'
                           onSubmit={async (event) => {
                              if (
                                 !confirm(
                                    "Please confirm you want to delete this record."
                                 )
                              ) {
                                 event.preventDefault();
                                 await deleteDoc(doc(db, "users", userId));
                              }
                           }}
                        > */}
                        <button type='submit' onClick={handleDelete}>
                           Delete
                        </button>
                        {/* </Form> */}
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
}
