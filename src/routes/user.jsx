import { useEffect } from "react";
import { Form, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../services/firebase";
import { useState } from "react";

export default function User() {
   // const contact = {
   //    first: "Your",
   //    last: "Name",
   //    avatar: "https://placekitten.com/g/200/200",
   //    twitter: "your_handle",
   //    notes: "Some notes",
   //    favorite: true,
   // };

   const [contacts, setContacts] = useState([]);

   const { userId } = useParams();

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

                     {contact.notes && <p>{contact.notes}</p>}

                     <div>
                        <Form action='edit'>
                           <button type='submit'>Edit</button>
                        </Form>
                        <Form
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
                        >
                           <button type='submit'>Delete</button>
                        </Form>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
}
