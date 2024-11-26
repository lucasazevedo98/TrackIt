import styled from "styled-components"
import Logo from "../assets/Logo.png"
import { useContext } from "react"
import UserContext from "../context/UserContext"
import axios from "axios"
import { useNavigate } from "react-router";



export default function SingnUp() {
    let navigate = useNavigate();

    const { email, senha, nome, foto, setEmail, setSenha, setNome, setFoto } = useContext(UserContext)

    function Cadastrar(e) {
        e.preventDefault()

        const body = {
            email: email,
            name: nome,
            image: foto,
            password: senha
        }

        let promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)

        promisse.then(()=>navigate("/"))
        
        promisse.catch(e => (alert(e.response.data.message)))
}

return (
    <Container>
        <img src={Logo}></img>

        <form onSubmit={Cadastrar}>
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <input type="text" placeholder="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="text" placeholder="foto" value={foto} onChange={(e) => setFoto(e.target.value)} />

            <button>Cadastrar</button>
        </form>

    </Container>
)
}


const Container = styled.div`
    width:100vw;
    height:100vh;
    background-color:#FFFFFF;
    display: flex;
    
    align-items:center;
    justify-content:center;
    flex-direction:column;


    form {
        width:305px;
        height:300px;
        font-family: "Lexend Deca";
        font-weight: 400;
    }

    input {
        width: 100%;
        height: 45px;
        border:1px solid #D4D4D4;
        border-radius:5px;

        font-size: 19.98px;

        text-decoration-skip-ink: none;
        
        margin-top:5px;
        padding-left:5px;

        &::placeholder {
            color:#D4D4D4;
        }
}

button {
        width: 103%;
        height: 45px;
        
        margin-top:5px;
        border-radius:5px;
        background-color:#52B6FF;
        border:1px solid #52B6FF;
        color:white;
        font-size: 19.98px;
    }
`