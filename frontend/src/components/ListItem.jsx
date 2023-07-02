import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";

export default function ListItem() {
    const [items, setItems] = useState([]);

    const getItems = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/items", { withCredentials: true });
            setItems(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getItems();
    }, []);

    const fetchData = async () => {
        const updatedItems = await Promise.all(
            items.map(async (item) => {
                try {
                    const response = await axios.get(
                        `https://pixabay.com/api/?key=38017794-63616cf97b3b1001d6cab16cc&q=${encodeURIComponent(
                            item.item_name
                        )}&image_type=photo&per_page=3`
                        , { withCredentials: false});
                    const image = response.data.hits[2];
                    return {
                        ...item,
                        img: image ? image.webformatURL : "",
                    };
                } catch (error) {
                    console.log(error);
                    return item;
                }
            })
        );

        setItems(updatedItems);
    }

    useEffect(() => {
        if (items.length > 0) {
            fetchData();
        }
    }, [items.length]);
    return (
        <div className="px-6">
            <div className="flex flex-wrap gap-8">
                {items.length > 0 &&
                    items.map((item) => (
                        <Link
                            to={`item/${item.item_id}`}
                            key={item.item_id}
                            className="md:w-56 w-44 md:h-64 h-56 border-2 top-0 left-0 p-2 rounded-lg bg-white border-black relative hover:top-1 hover:left-1 duration-100 cursor-pointer"
                        >
                            <div className="md:w-56 w-44 md:h-64 h-56 bg-black rounded-lg absolute -z-10 -right-3 -bottom-3"></div>
                            <img
                                src={item.img}
                                className="md:w-56 w-44 object-cover md:h-32 h-28"
                                alt={item.item_name}
                            />
                            <div className="flex flex-col gap-6">
                                <div className="mt-3 flex md:items-end items-center justify-between">
                                    <h2 className="font-oxanium-bold md:text-xl text-lg">
                                        {item.item_name}
                                    </h2>
                                    <div className="flex gap-1 items-center">
                                        <FaEthereum />
                                        <span>{item.price}</span>
                                    </div>
                                </div>
                                <button className="bg-yellow-pixel md:h-9 h-7 md:w-24 w-20 text-xs md:text-sm rounded-md font-oxanium-semibold text-black">
                                    View Items
                                </button>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
