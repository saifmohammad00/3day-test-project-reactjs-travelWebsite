import { useEffect, useRef, useState } from "react";
import classes from "./AdminPanel.module.css";
import AdminList from "./AdminList";

const initialData = [
  // Villa Category
  {
    id: 0,
    place: "Villa Serenity",
    price: "150",
    address: "123 Ocean Drive, Malibu, CA 90265",
    images: [
      "https://picsum.photos/seed/villa1/300/200",
      "https://picsum.photos/seed/villa2/300/200"
    ],
    category: "Villa"
  },
  {
    id: 1,
    place: "Mediterranean Escape",
    price: "250",
    address: "456 Coastal Road, Santorini, Greece",
    images: [
      "https://picsum.photos/seed/villa3/300/200",
      "https://picsum.photos/seed/villa4/300/200",
      "https://picsum.photos/seed/villa5/300/200"
    ],
    category: "Villa"
  },
  {
    id: 2,
    place: "Mountain Retreat",
    price: "180",
    address: "789 Summit Drive, Aspen, CO 81611",
    images: [
      "https://picsum.photos/seed/villa6/300/200",
      "https://picsum.photos/seed/villa7/300/200",
      "https://picsum.photos/seed/villa8/300/200"
    ],
    category: "Villa"
  },

  // Apartment Category
  {
    id: 3,
    place: "Urban Apartment",
    price: "80",
    address: "456 City Center, New York, NY 10001",
    images: [
      "https://picsum.photos/seed/apartment1/300/200",
      "https://picsum.photos/seed/apartment2/300/200"
    ],
    category: "Apartment"
  },
  {
    id: 4,
    place: "Chic Downtown Loft",
    price: "120",
    address: "123 Main Street, San Francisco, CA 94105",
    images: [
      "https://picsum.photos/seed/apartment3/300/200",
      "https://picsum.photos/seed/apartment4/300/200",
      "https://picsum.photos/seed/apartment5/300/200"
    ],
    category: "Apartment"
  },
  {
    id: 5,
    place: "Cozy Studio",
    price: "65",
    address: "789 Elm Street, Austin, TX 78701",
    images: [
      "https://picsum.photos/seed/apartment6/300/200",
      "https://picsum.photos/seed/apartment7/300/200"
    ],
    category: "Apartment"
  },

  // Houseboat Category
  {
    id: 6,
    place: "Luxury Houseboat",
    price: "350",
    address: "101 Floating Dock, Seattle, WA 98109",
    images: [
      "https://picsum.photos/seed/houseboat1/300/200",
      "https://picsum.photos/seed/houseboat2/300/200",
      "https://picsum.photos/seed/houseboat3/300/200"
    ],
    category: "Houseboat"
  },
  {
    id: 7,
    place: "Serene Floating Home",
    price: "290",
    address: "202 Harbor View, Amsterdam, Netherlands",
    images: [
      "https://picsum.photos/seed/houseboat4/300/200",
      "https://picsum.photos/seed/houseboat5/300/200",
      "https://picsum.photos/seed/houseboat6/300/200"
    ],
    category: "Houseboat"
  },
  {
    id: 8,
    place: "Rustic Houseboat Retreat",
    price: "220",
    address: "303 River Bend, Nashville, TN 37203",
    images: [
      "https://picsum.photos/seed/houseboat7/300/200",
      "https://picsum.photos/seed/houseboat8/300/200"
    ],
    category: "Houseboat"
  }
];


const AdminPanel = () => {
  const [list, setList] = useState(initialData);
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
        if (data && typeof data==='object') {
          const fetchedData = Object.keys(data).map(key => ({ ...data[key], id: key }));
          setList(fetchedData);
        }
        else{
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
      images: Array.from(enteredImages.current.files).map(file => URL.createObjectURL(file)),
      category: selectedRef.current.value,
    };

    setList(prev => [...prev, formData]);
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
            Upload Place Images (3-4 images):
            <input type="file" ref={enteredImages} multiple accept="image/*" required />
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
      />
    </div>
  );
};

export default AdminPanel;