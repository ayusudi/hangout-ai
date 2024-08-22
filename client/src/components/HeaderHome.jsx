import { Link } from "react-router-dom"
export default function Component({ loading, login }) {
  return (
    <header className="w-full py-4 flex justify-between items-center">
      <nav className="flex justify-center items-center gap-4 m-auto">
        <a href="#aboutus" className="hover:text-[#52EDF2] text-lg cursor-pointer">ABOUT US</a>
        <a href="#demo" className="hover:text-[#52EDF2] text-lg cursor-pointer">DEMO</a>
        {
          localStorage.getItem("email") && localStorage.getItem("access_token") ? <Link className="hover:text-[#52EDF2] text-lg cursor-pointer" to="/chats">CHAT</Link> :
            <p onClick={login} className={loading ? "text-[#52EDF2] text-lg cursor-pointer" : "hover:text-[#52EDF2] text-lg cursor-pointer"}>{loading ? 'PLEASE WAIT' : 'LOGIN/REGISTER'}</p>
        }
      </nav>
    </header>
  )
}