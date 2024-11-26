import { BrowserRouter, Routes, Route } from "react-router"

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import UserContext from "./context/UserContext"
import Token from "./context/Token"
import { useState } from "react"
import Habits from "./pages/Habits"
import Header from "./components/Header"


function App() {

  const [email,setEmail] = useState(localStorage.getItem("email"))
  const [senha,setSenha] = useState(localStorage.getItem("senha"))
  const [nome,setNome] = useState(localStorage.getItem("nome"))
  const [foto,setFoto] = useState(localStorage.getItem("imagem"))
  const [token,setToken] = useState(localStorage.getItem("token"))
  
  return (
    <UserContext.Provider value={{email,senha,nome,foto,setEmail,setSenha,setNome,setFoto}}>
      <Token.Provider value={{token,setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/habitos" element={<Habits />} />
        </Routes>
      </BrowserRouter>
      </Token.Provider>
      </UserContext.Provider>
  )
}

export default App
