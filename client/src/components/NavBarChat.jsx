import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

export default function Component() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    googleLogout();
    navigate("/")
  }
  return (
    <div className="flex flex-col md:flex-row justify-between w-full px-4 py-4 text-white">
      <h1 className="text-3xl md:text-4xl font-bold font-conthrax">
        HANGOUT AI
      </h1>
      <div className="flex mt-2 md:mt-0 space-x-4 md:space-x-8 font-myriad mb-3 md:mb-0">
        <Link to="/chats" className="cursor-pointer text-sm md:text-lg hover:text-[#52EDF2]">
          CHAT
        </Link>
        <Link to="/" className="cursor-pointer text-sm md:text-lg hover:text-[#52EDF2]">
          ABOUT US
        </Link>
        <p onClick={logout} className="text-sm md:text-lg hover:text-[#52EDF2] cursor-pointer">
          LOGOUT
        </p>
      </div>
    </div>

  )
}