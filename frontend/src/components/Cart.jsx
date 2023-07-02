import { useContext } from "react";
import { BsFillBasket3Fill } from "react-icons/bs";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export default function Cart() {
    const { user } = useContext(UserContext)

    return (
        <Link to="/cart" className='fixed bottom-6 right-6 flex gap-2'>
            <div className="bg-green-pixel md:w-36 w-32 flex items-center justify-between cursor-pointer border-t-2 border-b-2 border-black hover:translate-y-1 hover:translate-x-1 duration-100 rounded-lg md:h-20 h-16 relative">

                <div className="-z-50 md:w-36 w-32 absolute md:h-20 h-16 -bottom-2 -right-2 bg-black rounded-lg"></div>
                <span className="bg-white md:w-20 w-16 md:h-20 h-16 border-t-2 border-l-2 border-b-2 border-black rounded-l-lg grid place-content-center font-oxanium-bold md:text-2xl text-lg">
                    {(user.items || []).reduce((total, item) => total + (item?.quantity ?? 0), 0)}
                </span>
                <span className="bg-green-pixel md:w-20 w-16 md:h-20 h-16 border-t-2 border-r-2 border-b-2 border-black rounded-r-lg grid place-content-center font-oxanium-bold md:text-xl text-lg">
                    <BsFillBasket3Fill className="font-oxanium-semibold bg-green-pixel text-white md:text-3xl text-2xl" />
                </span>

            </div>

        </Link>
    )
}
