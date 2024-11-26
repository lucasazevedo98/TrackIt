import { BrowserRouter, Routes, Route } from "react-router"

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import UserContext from "./context/UserContext"
import { useState } from "react"


function App() {

  const [email,setEmail] = useState("")
  const [senha,setSenha] = useState("")
  const [nome,setNome] = useState("")
  const [foto,setFoto] = useState("")
  
  return (
    <UserContext.Provider value={{email,senha,nome,foto,setEmail,setSenha,setNome,setFoto}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
  )
}

export default App
