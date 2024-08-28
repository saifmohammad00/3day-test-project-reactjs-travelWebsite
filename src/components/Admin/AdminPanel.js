import { useEffect, useRef, useState } from "react";
import classes from "./AdminPanel.module.css";
import AdminList from "./AdminList";
import { useDispatch, useSelector } from "react-redux";
import { travelActions } from "../store/traveldata";


const AdminPanel = () => {
  const list = useSelector(state => state.user.items);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState(new Set(["Villa", "Apartment", "Houseboat"]));
  const [imageIndices, setImageIndices] = useState({}); // Object to track image index for each listing

  const enteredPlace = useRef();
  const enteredPrice = useRef();
  const enteredAddress = useRef();
  const enteredImages = useRef();
  const selectedRef = useRef();
  const newCategoryRef = useRef();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/travel.json')
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        const data = await res.json();
        if (data && typeof data === 'object') {
          const fetchedData = Object.keys(data).map(key => ({ ...data[key], id: key }));
          dispatch(travelActions.add(fetchedData));
          const newCategories = new Set(fetchedData.map(item => item.category));
          setCategories(prev => new Set([...prev, ...newCategories]));
          const newImageIndices = fetchedData.reduce((acc, item) => {
            acc[item.id] = 0;
            return acc;
          }, {});
          setImageIndices(prev => ({ ...prev, newImageIndices }));
        }
        else {
          console.warn("fetched data is not in the expected format")
        }
      } catch (error) {
        console.log(error, "hello");
      }
    }
    getData();
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      id: list.length,
      place: enteredPlace.current.value,
      price: enteredPrice.current.value,
      address: enteredAddress.current.value,
      images: enteredImages.current.value.split(',').map(url => url.trim()),
      category: selectedRef.current.value,
    };
    dispatch(travelActions.add(formData));
    setCategories(prev => new Set(prev).add(formData.category));
    setImageIndices(prev => ({ ...prev, [formData.id]: 0 })); // Initialize image index for new listing

    try {
      const res = await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/travel.json', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        throw new Error("Unable to add data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = () => {
    const newCategory = newCategoryRef.current.value.trim();
    if (newCategory && !categories.has(newCategory)) {
      setCategories(prev => new Set(prev).add(newCategory));
      newCategoryRef.current.value = ""; // Clear the input
    }
  };

  const handleNextImage = (listingId) => {
    setImageIndices(prev => {
      const index = prev[listingId] || 0;
      const newIndex = (index + 1) % list.find(item => item.id === listingId).images.length;
      return { ...prev, [listingId]: newIndex };
    });
  };

  const handlePrevImage = (listingId) => {
    setImageIndices(prev => {
      const index = prev[listingId] || 0;
      const newIndex = (index - 1 + list.find(item => item.id === listingId).images.length) % list.find(item => item.id === listingId).images.length;
      return { ...prev, [listingId]: newIndex };
    });
  };

  const handleEdit = async (item) => {
    enteredPlace.current.value = item.place;
    enteredPrice.current.value = item.price;
    enteredAddress.current.value = item.address;
    enteredImages.current.value = item.images;
    selectedRef.current.value = item.category;
    //   try{
    //     const res=await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/travel.json',{
    //      method:"PUT",
    //      body:""
    //     })
    //  }catch(error){

    //  }
  }

  // Filter items based on selected category
  const filteredItems = selectedCategory ? list.filter(item => item.category === selectedCategory) : list;

  return (
    <div className={classes.container}>
      <div className={classes.inputForm}>
        <h1>Create Listing</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Place Name:
            <input type="text" ref={enteredPlace} required />
          </label>
          <label>
            Price per Night:
            <input type="number" ref={enteredPrice} required />
          </label>
          <label>
            Place Address (including city and PIN code):
            <input type="text" ref={enteredAddress} required />
          </label>
          <label>
            Image URLs (separate with commas):<br/>
            <br/>
            <textarea ref={enteredImages} style={{width:"100%"}} placeholder="Enter image URLs separated by commas" required />
          </label>
          <label>
            Choose Category:
            <select ref={selectedRef} required>
              <option value="">Select</option>
              {[...categories].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        <div>
          <h2>Add New Category</h2>
          <input type="text" ref={newCategoryRef} placeholder="New category" />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>
      </div>
      <AdminList
        list={filteredItems}
        categories={[...categories]}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        imageIndices={imageIndices}
        handleNextImage={handleNextImage}
        handlePrevImage={handlePrevImage}
        setEdit={handleEdit}
      />
    </div>
  );
};

export default AdminPanel;