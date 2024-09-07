import { useEffect, useRef, useState } from "react";
import classes from "./AdminPanel.module.css";
import AdminList from "./AdminList";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, travelActions } from "../store/traveldata";


const AdminPanel = () => {
  const myCategory=useSelector(state=>state.cart.selectedCategory);
  const list = useSelector(state => state.user.items);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(myCategory);
  const [categories, setCategories] = useState(new Set([]));
  const [imageIndices, setImageIndices] = useState({}); // Object to track image index for each listing

  const enteredPlace = useRef();
  const enteredPrice = useRef();
  const enteredAddress = useRef();
  const enteredImages = useRef();
  const selectedRef = useRef();
  const newCategoryRef = useRef();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  
  useEffect(() => {
    if (list.length > 0) {
      const newCategories = new Set(list.map(item => item.category));
      setCategories(prev => new Set([...prev, ...newCategories]));
      const newImageIndices = list.reduce((acc, item) => {
        acc[item.id] = 0;
        return acc;
      }, {});
      setImageIndices(newImageIndices);
    }
  }, [list]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      id: isEdit ? editId : list.length,
      place: enteredPlace.current.value,
      price: enteredPrice.current.value,
      address: enteredAddress.current.value,
      images: enteredImages.current.value.split(',').map(url => url.trim()),
      category: selectedRef.current.value,
    };
    // Initialize image index for new listing
    if (isEdit) {
      try {
        const res = await fetch(`https://react-auth-a54ec-default-rtdb.firebaseio.com/travel/${editId}.json`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!res.ok) {
          throw new Error("unable to edit data");
        }
        dispatch(travelActions.add(formData));
        setCategories(prev => new Set(prev).add(formData.category));
        setImageIndices(prev => ({ ...prev, [formData.id]: 0 }));
      } catch (error) {
        console.error(error);
      }
    }
    else {
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
        dispatch(travelActions.add(formData));
        setCategories(prev => new Set(prev).add(formData.category));
        setImageIndices(prev => ({ ...prev, [formData.id]: 0 }));
      } catch (error) {
        console.error(error);
      }
    }
    enteredPlace.current.value = "";
    enteredPrice.current.value = "";
    enteredAddress.current.value = "";
    enteredImages.current.value = "";
    selectedRef.current.value = "";
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
    setIsEdit(true);
    setEditId(item.id);

  }
  const handleDelete = async (item) => {
    console.log(item);
    try {
      const res = await fetch(`https://react-auth-a54ec-default-rtdb.firebaseio.com/travel/${item.id}.json`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        throw new Error('unable to delete');
      }
      dispatch(travelActions.remove(item.id));
    } catch (error) {
      console.log(error);
    }
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
            Image URLs (separate with commas):<br />
            <br />
            <textarea ref={enteredImages} style={{ width: "100%" }} placeholder="Enter image URLs separated by commas" required />
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
          <button type="submit">{isEdit ? "Edit" : "Submit"}</button>
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
        setDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPanel;