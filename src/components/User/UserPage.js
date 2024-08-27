import { useState } from "react";
import AdminList from "../Admin/AdminList";
import classes from "./UserPage.module.css";

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
const UserPage = () => {
    const [list,setList]=useState(initialData);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(new Set(["Villa", "Apartment", "Houseboat"]));
    const [imageIndices, setImageIndices] = useState({});

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

    return <div style={{justifyContent:"center"}}>
        <div className={classes.userpage}>
            <h1>Travel Destinations</h1>
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
}
export default UserPage;