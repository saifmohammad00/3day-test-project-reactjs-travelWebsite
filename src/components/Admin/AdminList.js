import React, { useEffect } from "react";
import classes from "./AdminPanel.module.css";
import { useSelector } from "react-redux";

const AdminList = ({ selectedCategory, categories = [], setSelectedCategory,setDelete,list, setEdit, handlePrevImage, imageIndices = {}, handleNextImage }) => {
  const handleEdit = async (item) => {
    setEdit(item);
  }
  const handleDelete=async(item)=>{
    setDelete(item);
  }
  console.log(list);
  return <div style={{ width: "100%" }}>
    {!selectedCategory && <div style={{ textAlign: "center" }}>
      <h2>Categories</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
        {[...categories].map(category => (
          <div key={category} onClick={() => setSelectedCategory(category)} style={{ cursor: 'pointer', width: "80%", margin: "10px", flex: "1 1 calc(25% - 16px)" }}>
            <h3>{category}</h3>
            {list.some(item => item.category === category) && (
              <img
                src={list.find(item => item.category === category).images[0]}
                alt={category}
                style={{ height: "200px", width: "300px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>}
    {selectedCategory && <div style={{display:"grid",justifyContent:"center"}}>
      <h2>Submitted Items</h2>
      {list.map((item) => (
        <div key={item.id}>
          {item.images.length > 0 && (<div className={classes.card}>
              <div className={classes.slider}>
                <button
                  className={classes.prevButton}
                  onClick={() => handlePrevImage(item.id)}
                >
                  &#10094;
                </button>
                <img
                  src={item.images[imageIndices[item.id] || 0]}
                  alt="Slider Image"
                  className={classes.sliderImage}
                />
                <button
                  className={classes.nextButton}
                  onClick={() => handleNextImage(item.id)}
                >
                  &#10095;
                </button>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={()=>handleDelete(item)}>Delete</button>
              </div>
              <div>
                <h1>{item.place}</h1>
                <p>Price: {item.price}</p>
                <p>Address: {item.address}</p>
                <p>Category: {item.category}</p>
              </div>
              </div>
          )}
        </div>
      ))}
    </div>}
  </div>
}
export default AdminList;