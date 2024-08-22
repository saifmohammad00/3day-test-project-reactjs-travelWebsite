
import { useRef } from "react";
import classes from "./AdminPanel.module.css"

const AdminPanel = () => {
    const enteredPlace=useRef();
    const enteredPrice=useRef();
    const enteredAddress=useRef();
    const enteredImages=useRef();
    const selectedRef=useRef();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData={
          place:enteredPlace.current.value,
          price:enteredPrice.current.value,
          address:enteredAddress.current.value,
          images:enteredImages.current.files,
          category:selectedRef.current.value
        }
        try{
          const res=await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/travel.json',{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
              'Content-Type':'application/json'
            }
          })
          if(!res.ok){
            throw new Error("unable to add data");
          }
        }catch(error){
          console.error(error);
        }
    }
    return <div className={classes.inputForm}>
        <h1>Form</h1>
        <form onSubmit={handleSubmit}>
          <label>Place Name:
            <input type="text" ref={enteredPlace} required/>
          </label>
          <label>Price per Night:
            <input type="number" ref={enteredPrice} required/>
          </label>
          <label>Place Address
            <input type="text" ref={enteredAddress} required/>
          </label>
          <label>Upload place images
            <input type="file" ref={enteredImages} multiple required/>
          </label>
          <label>Choose Category:
          <select ref={selectedRef} required>
            <option value="" disabled selected>Select</option>
            <option value="option1">Villa</option>
            <option value="option2">Apartment</option>
            <option value="option3">House Boat</option>
          </select>
          </label>
          <button type="submit">Submit</button>
    </form>
    </div>
}
export default AdminPanel;