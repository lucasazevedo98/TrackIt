import styled from "styled-components";
import Logo from "../assets/Logo.png";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { ThreeDots } from "react-loader-spinner"; 
import Token from "../context/Token";
import {Container,ErrorMessage,LinkRota} from "../Styles/Styles"

export default function Login() {
    const navigate = useNavigate();
    const { setEmail, setSenha, setFoto, email, senha } = useContext(UserContext);
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
                localStorage.setItem("imagem",response.data.image)
                localStorage.setItem("senha",response.data.password)
                localStorage.setItem("email",response.data.email)
                localStorage.setItem("token",response.data.token)
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