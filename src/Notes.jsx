import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";



function Notes(){

    const [notes, setNotes] = useState([]);
    const location = useLocation();
  const { user } = location.state || {};
 // console.log("Notes page:",user);
  //console.log(user.data.user_id);
  //console.log(user.data[0].users_id)

//   useEffect(() => {
//     if (!user?.data || user.data.length === 0) return;
//     console.log("useEffect is running"); // This should appear as soon as the page renders
  
//     if (!user?.data[0].users_id) {
//       console.log("User ID not available"); // Ensure user ID is logged properly
//       return;
//     }

//       async function fetchItems() {
//         try {
//           console.log("Fetching items for user:", user.data[0].users_id); // Log the user ID
//           const response = await axios.get(`http://localhost:3000/items?user=${user.data[0].users_id}`);
//           console.log("Fetched items:", response.data); // Log the API response
//           //console.log("notes before setIems:",notes);
//           setNotes([response.data]);
//           console.log("notes after setItems",notes)
//           console.log("items after fetching from server", notes)
//         } catch (error) {
//           console.error("Error fetching items:", error);
//         }
//       }

//       fetchItems();
//     },[user]);

//     async function addNote(newNote) {
//         try{
//             const response = await axios.post("http://localhost:3000/add",{user_data: newNote,id: user.data[0].users_id});
//             console.log("response from API after add request",response.data);
//             setNotes(response.data)
//         } catch(err){
//             console.log("error in response after add request",err);
//         }
//     }

useEffect(() => {
    // Ensure `user` and `user.data` exist and contain the necessary data
    if (!user?.data || user.data.length === 0) {
      //console.log("No user data available or user data is empty.");
      return;
    }

    const userId = user.data[0].users_id;
    if (!userId) {
      //console.log("User ID not available.");
      return;
    }

    const fetchItems = async () => {
      try {
        //console.log("Fetching items for user:", userId);
        const response = await axios.get(`https://keepers-zmu2.onrender.com/items?user=${userId}`);
        //console.log("Fetched response data:", response.data.data);

        if (Array.isArray(response.data.data)) {
          setNotes(response.data.data);  
        } else {
          //console.error("Fetched data is not an array:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [user]);

  async function addNote(newNote) {
    try {
      const response = await axios.post("https://keepers-zmu2.onrender.com/add", {
        user_data: newNote,
        id: user.data[0].users_id
      });
      //console.log("Response from API after add request", response.data.data);

      if (Array.isArray(response.data.data)) {
        setNotes(response.data.data);  // Assuming the API returns the updated list of notes
      } else {
        //console.error("API response is not an array:", response.data.data);
      }
    } catch (err) {
      console.log("Error in response after add request", err);
    }
  }
  //console.log(notes)
  
   async function deleteNote(id) {

    try{
        const response = await axios.post("https://keepers-zmu2.onrender.com/delete", { deleteNoteId: id });
        setNotes(response.data.data);
    } catch(err){
        console.log("error while deleting",err);
    }  
    }
  
    return (
      <div>
        <Header  logout={true}/>
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
            deleteId = {noteItem.id}
              key={index}
              id={noteItem.users_id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    );
}


export default Notes;