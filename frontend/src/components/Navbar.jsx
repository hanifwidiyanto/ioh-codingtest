import axios from "axios"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import { TbFileInvoice } from "react-icons/tb";

export default function Navbar() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const logout = () => {
    axios.post('http://localhost:5000/api/users/logout')
    setUser({ loggedIn: false })
    navigate('/')
  }
  return (
    <nav className="w-full items-center justify-between px-6 flex h-20 border-black border-b-2">
      <Link to="/" className="font-oxanium-semibold uppercase text-xl">NFT App</Link>
      <div className="flex gap-2">
        <Link to="/invoice" className="px-6 py-2  bg-gradient-to-br rounded-lg from-red-pixel to-red-400">
          <TbFileInvoice className="text-2xl text-white" />
        </Link>
        <button className="bg-gradient-to-br from-blue-pixel to-blue-400 px-6 rounded-md grid place-content-center py-2 uppercase font-oxanium-semibold text-white" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
