import { BrowserRouter, Routes, Route } from "react-router"

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import UserContext from "./context/UserContext"
import Token from "./context/Token"
import { useState } from "react"


function App() {

  const [email,setEmail] = useState("")
  const [senha,setSenha] = useState("")
  const [nome,setNome] = useState("")
  const [foto,setFoto] = useState("")
  const [token,setToken] = useState("")
  
  return (
    <UserContext.Provider value={{email,senha,nome,foto,setEmail,setSenha,setNome,setFoto}}>
      <Token.Provider value={{token,setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </Token.Provider>
      </UserContext.Provider>
  )
}

export default App
