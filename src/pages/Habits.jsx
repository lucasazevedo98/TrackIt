import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import UserContext from "../context/UserContext";
import styled from "styled-components";
import axios from "axios";
import Token from "../context/Token";
import Footer from "../components/Footer";

export default function Habits() {
    const { foto } = useContext(UserContext);
    const { token } = useContext(Token);
    const [ocultar, setOcultar] = useState("none")

    const [dias, setDias] = useState([]);
    const [nomeHabito, setNomeHabito] = useState("");


    const [habitos, setHabitos] = useState([])

    function GravarHabito() {
            if(ocultar === "none") {
                setOcultar("flex")
            } else {
                setOcultar("none")
            }
    }

    function atualizarHabitos() {
            const rota = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
            const headers = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
            axios.get(rota, headers)
                .then((e => {
                    setHabitos(e.data)
                }))
    
    
        }
    

    atualizarHabitos()

    function selecionarDias(n) {
        if (dias.includes(n)) {
            setDias(dias.filter(dia => dia !== n));
        } else {
            setDias([...dias, n]);
        }
    }

    function salvarHabito() {
        if (!nomeHabito.trim() || dias.length === 0) {
            alert("Preencha o nome do hábito e selecione pelo menos um dia!");
            return;
        }
        const rota = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const novoHabito = { name: nomeHabito, days: dias }

        axios.post(rota, novoHabito, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((e) => (console.log(e)))
            .catch((e) => (console.log(e)))

            setOcultar("none")

            setDias([])
            setNomeHabito("")


            atualizarHabitos()




    }


    function Cancelar() {
        setOcultar("none")

    }

    return (
        <>
            <Header foto={foto} />
            <HabitsContainer>
                <Titulo>
                    <h1>Meus Hábitos</h1>
                    <button onClick={GravarHabito}>+</button>
                </Titulo>
                <InserirHabitos ocultar={ocultar}>
                    <input
                        placeholder="nome do hábito"
                        value={nomeHabito}
                        onChange={(e) => setNomeHabito(e.target.value)}
                    />
                    <Dias>
                        {["D", "S", "T", "Q", "Q", "S", "S"].map((dia, index) => (
                            <button
                                key={index}
                                onClick={() => selecionarDias(index)}
                                className={dias.includes(index) ? "selecionado" : ""}
                            >
                                {dia}
                            </button>
                        ))}
                    </Dias>
                    <BotaoCancelar onClick={Cancelar}>Cancelar</BotaoCancelar>
                    <BotaoSalvar onClick={salvarHabito}>Salvar</BotaoSalvar>
                </InserirHabitos>




                    {habitos.length !==0 ? habitos.map((habito,i)=>(
                        <Habitos key={i}>
                            <h2>{habito.name}</h2>

                            <Dias>
                                {["D", "S", "T", "Q", "Q", "S", "S"].map((dias,i)=>(
                                    <button key={i} className={habito.days.includes(i) ? "selecionado" : ""}>{dias}</button>
                                ))}
                            </Dias>


                        </Habitos>
                    )): <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}





            </HabitsContainer>

            <Footer />
        </>
    );
}

const BotaoCancelar = styled.button`

    color:#52B6FF;
    background-color:white;
    border:none;
    border-radius:0;
    width:70px;
    position:absolute;
    bottom:10px;
    right:90px;
    cursor:pointer;



`

const Habitos = styled.div`
    width: 90%;
    height: 70px;
    background-color: #ffffff;
    margin-top:5px;
    display:flex;
    flex-direction:column;
    border-radius:5px;
    padding:10px;
    color:#666666;

    &:last-child {
        margin-bottom:90px;
    }

    h2{
        font-size:20px;
        font-family: "Lexend Deca";
    }




`

const Dias = styled.div`
    display: flex;
    background-color: white;
    

    button {
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #fff;
        border: 1px solid #d5d5d5;
        color: #666;
        border-radius: 5px;
        cursor: pointer;

        &.selecionado {
            background-color: #cfcfcf;
            color: white;
        }
    }
`;

const HabitsContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top:50px;

    p {
        font-family: "Lexend Deca";
        font-size: 17.98px;
        font-weight: 400;
        color:#666666;
        margin:10px;


    }

`;

const Titulo = styled.div`
    color: #126ba5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    font-size:22.98px;
    font-weight:400;
    font-family: "Lexend Deca";

    margin:20px 5px;

    button {
        width:40px;
        height:40px;
        background-color:#52B6FF;
        border-radius:5px;
        border:none;
        color:white;
        font-size:27px;
        cursor:pointer;
    }
`;

const InserirHabitos = styled.div`
    width: 90%;
    height: 100px;
    background-color: #ffffff;
    display:${props =>(props.ocultar)};
    position: relative;
    padding: 14px;
    flex-direction:column;
    border-radius:5px;

    input {
        width: 90%;
        border:1px solid #D4D4D4;
        font-size:20px;
        border-radius:5px;
        border:1px solid #D4D4D4
    }
`;

const BotaoSalvar = styled.button`
    position: absolute;
    bottom: 4px;
    right: 3px;
    width: 70px;
    height: 30px;
    background-color:#52B6FF;
    color:white;
    border:none;
    border-radius:5px;
`;


