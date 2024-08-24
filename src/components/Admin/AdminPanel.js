
import { useRef, useState } from "react";
import classes from "./AdminPanel.module.css"

const data = [
  {
    id: 0,
    place: "Villa Serenity",
    price: "150",
    address: "123 Ocean Drive, Malibu",
    images: [
      "https://picsum.photos/seed/villa1/300/200",
      "https://picsum.photos/seed/villa2/300/200"
    ],
    category: "option1" // Villa
  },
  {
    id: 1,
    place: "Urban Apartment",
    price: "80",
    address: "456 City Center, New York",
    images: [
      "https://picsum.photos/seed/apartment1/300/200",
      "https://picsum.photos/seed/apartment2/300/200"
    ],
    category: "option2" // Apartment
  },
  {
    id: 2,
    place: "House Boat Retreat",
    price: "200",
    address: "789 Lakeview Drive, Seattle",
    images: [
      "https://picsum.photos/seed/houseboat1/300/200",
      "https://picsum.photos/seed/houseboat2/300/200"
    ],
    category: "option3" // House Boat
  },
  {
    id: 3,
    place: "Mountain Lodge",
    price: "120",
    address: "321 Alpine Road, Aspen",
    images: [
      "https://picsum.photos/seed/lodge1/300/200",
      "https://picsum.photos/seed/lodge2/300/200"
    ],
    category: "option1" // Villa
  },
  {
    id: 4,
    place: "Beachside Bungalow",
    price: "90",
    address: "654 Beachfront Ave, Honolulu",
    images: [
      "https://picsum.photos/seed/bungalow1/300/200",
      "https://picsum.photos/seed/bungalow2/300/200"
    ],
    category: "option2" // Apartment
  }
];





const AdminPanel = () => {
  const [list, setList] = useState([]);
  const enteredPlace = useRef();
  const enteredPrice = useRef();
  const enteredAddress = useRef();
  const enteredImages = useRef();
  const selectedRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      id: list.length,
      place: enteredPlace.current.value,
      price: enteredPrice.current.value,
      address: enteredAddress.current.value,
      // Handle images as URLs or base64 data in practice
      images: Array.from(enteredImages.current.files).map(file => URL.createObjectURL(file)),
      category: selectedRef.current.value,
    };
    setList(prev => [...prev, formData]);
    return;
    try {
      const res = await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/travel.json', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        throw new Error("unable to add data");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return <div>
    <div className={classes.inputForm}>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Place Name:
          <input type="text" ref={enteredPlace} required />
        </label>
        <label>Price per Night:
          <input type="number" ref={enteredPrice} required />
        </label>
        <label>Place Address
          <input type="text" ref={enteredAddress} required />
        </label>
        <label>Upload place images
          <input type="file" ref={enteredImages} multiple required />
        </label>
        <label>Choose Category:
          <select ref={selectedRef} required>
            <option value="">Select</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>House Boat</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div>
        <h2>Submitted Items</h2>
        {data.map((item) => (
          <div key={item.id}>
            <h1>{item.place}</h1>
            <p>Price: {item.price}</p>
            <p>Address: {item.address}</p>
            <p>Category: {item.category}</p>
            {item.images.length > 0 && (
              <div>
                {item.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Preview ${index}`}
                    style={{ width: '100px', height: 'auto', marginRight: '10px' }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
  </div>
}
export default AdminPanel;