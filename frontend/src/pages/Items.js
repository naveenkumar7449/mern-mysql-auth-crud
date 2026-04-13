import React,{ useState,useEffect } from "react";
import API from "../services/api";

function Items(){

 const [title,setTitle] = useState("");
 const [description,setDescription] = useState("");

 const [items,setItems] = useState([]);

 const token = localStorage.getItem("token");

 const fetchItems = async () => {

  try{

   const res = await API.get("/items",{

    headers:{
     Authorization:`Bearer ${token}`
    }

   });

   setItems(res.data);

  }
  catch(err){

   alert("Error loading items");

  }

 };

 useEffect(()=>{

  fetchItems();

 },[]);


 const addItem = async () => {

  try{

   await API.post("/items",{

    title,
    description

   },{

    headers:{
     Authorization:`Bearer ${token}`
    }

   });

   alert("Item added");

   fetchItems();

   setTitle("");
   setDescription("");

  }
  catch(err){

   alert("Add failed");

  }

 };


 const deleteItem = async(id) => {

  try{

   await API.delete(`/items/${id}`,{

    headers:{
     Authorization:`Bearer ${token}`
    }

   });

   fetchItems();

  }
  catch(err){

   alert("Delete failed");

  }

 };


 const editItem = async(item) => {

  const newTitle = prompt("Enter title",item.title);
  const newDesc = prompt("Enter description",item.description);

  try{

   await API.put(`/items/${item.id}`,{

    title:newTitle,
    description:newDesc

   },{

    headers:{
     Authorization:`Bearer ${token}`
    }

   });

   fetchItems();

  }
  catch(err){

   alert("Update failed");

  }

 };


 const handleLogout = () => {

  localStorage.removeItem("token");

  window.location.href="/";

 };


 return(

  <div className="items-page">

   <button
    className="logout-btn"
    onClick={handleLogout}
   >
    Logout
   </button>


   <div className="container">

    <h2>Items</h2>

    <input
     placeholder="Title"
     value={title}
     onChange={(e)=>setTitle(e.target.value)}
    />


    <input
     placeholder="Description"
     value={description}
     onChange={(e)=>setDescription(e.target.value)}
    />


    <button onClick={addItem}>
     Add Item
    </button>


    {items.map(item => (

     <div
      key={item.id}
      className="item"
     >

      <h4>{item.title}</h4>

      <p>{item.description}</p>

      <button onClick={()=>editItem(item)}>
       Edit
      </button>

      <button onClick={()=>deleteItem(item.id)}>
       Delete
      </button>

     </div>

    ))}

   </div>

  </div>

 );

}

export default Items;