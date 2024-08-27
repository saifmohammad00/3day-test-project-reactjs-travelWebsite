import React from "react";
import classes from "./AdminPanel.module.css";

const AdminList=({selectedCategory,categories=[],setSelectedCategory,list=[],handlePrevImage,imageIndices={},handleNextImage})=>{
    return <div style={{width:"100%"}}>
    {!selectedCategory && <div style={{textAlign:"center"}}>
      <h2>Categories</h2>
      <div style={{display:"flex",justifyContent:"center"}}>
      {[...categories].map(category => (
        <div key={category} onClick={() => setSelectedCategory(category)} style={{ cursor: 'pointer',margin:"10px"}}>
          <h3>{category}</h3>
          {list.some(item => item.category === category) && (
            <img
              src={list.find(item => item.category === category).images[0]}
              alt={category}
              // style={{padding:"10px", height: 'auto'}}
            />
          )}
        </div>
      ))}
      </div>
    </div>}
    {selectedCategory && <div>
      <h2>Submitted Items</h2>
      {list.map((item) => (
        <div key={item.id}>
          <h1>{item.place}</h1>
          <p>Price: {item.price}</p>
          <p>Address: {item.address}</p>
          <p>Category: {item.category}</p>
          {item.images.length > 0 && (
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
            </div>
          )}
        </div>
      ))}
    </div>}
  </div>
}
export default AdminList;