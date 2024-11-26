import styled from "styled-components";
import Logo from "../assets/Logo.png";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { ThreeDots } from "react-loader-spinner"; 
import Token from "../context/Token";

export default function Login() {
    const navigate = useNavigate();
    const { setEmail, setSenha, email, senha } = useContext(UserContext);
    const {token,setToken} = useContext(Token)

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    function validarCampos() {
        if (email === "") return "O campo EMAIL está vazio.";
        if (senha === "") return "O campo SENHA está vazio.";
        return null;
    }

    function Entrar(e) {
        e.preventDefault();
        setCarregando(true);
        setErro(null);

        const erroValidacao = validarCampos();
        if (erroValidacao) {
            setErro(erroValidacao);
            setCarregando(false);
            return;
        }

        const body = {
            email,
            password: senha,
        };

        axios
            .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
            .then((response) => {
                setCarregando(false);
                setToken(response.data.token)
                navigate("/habitos")
            })
            .catch((e) => {
                setErro(e.response.data.message || "Erro desconhecido.");
                setCarregando(false);
            });
    }

    return (
        <Container>
            <img src={Logo} alt="Logo" />
            <form onSubmit={Entrar}>
                <input
                    type="email"
                    disabled={carregando}
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    disabled={carregando}
                    placeholder="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                {erro && <ErrorMessage>{erro}</ErrorMessage>}
                <button type="submit" disabled={carregando}>
                    {carregando ? (
                        <ThreeDots 
                            height="30" 
                            width="30" 
                            color="#ffffff" 
                            visible={true} 
                        />
                    ) : (
                        "Entrar"
                    )}
                </button>
            </form>
            <LinkRota to="/cadastro">Não tem uma conta? Cadastre-se!</LinkRota>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        margin-bottom: 20px;
    }

    form {
        width: 305px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-family: "Lexend Deca", sans-serif;
    }

    input {
        width: 100%;
        height: 45px;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
        font-size: 20px;
        padding-left: 10px;

        &::placeholder {
            color: #d4d4d4;
        }

        &:disabled {
            background-color: #f2f2f2;
            cursor: not-allowed;
        }
    }

    button {
        width: 105%;
        height: 45px;
        background-color: #52b6ff;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    text-align: center;
    margin-top: -5px;
`;

const LinkRota = styled(Link)`
    color: #52b6ff;
    font-size: 14px;
    text-decoration: underline;
    margin-top: 20px;
`;