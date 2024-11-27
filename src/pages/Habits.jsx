import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import UserContext from "../context/UserContext";
import styled from "styled-components";
import axios from "axios";
import Token from "../context/Token";

export default function Habits() {
    const { foto } = useContext(UserContext);
    const { token } = useContext(Token);

    const [dias, setDias] = useState([]);
    const [nomeHabito, setNomeHabito] = useState("");


    const [habitos, setHabitos] = useState([])

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
    }


    useEffect(() => {
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


    }, [])

    return (
        <>
            <Header foto={foto} />
            <HabitsContainer>
                <Titulo>
                    <h1>Meus Hábitos</h1>
                    <button>+</button>
                </Titulo>
                <InserirHabitos>
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
                    <BotaoSalvar onClick={salvarHabito}>Salvar</BotaoSalvar>
                </InserirHabitos>




                    {habitos !==0 ? 
                    
                    habitos.map((habito,i)=>(
                        <Habitos key={i}>
                            <h2>{habito.name}</h2>


                            {console.log(habito.days)}

                            <Dias>
                                {["D", "S", "T", "Q", "Q", "S", "S"].map((dias,i)=>(
                                    <button key={i} className={habito.days.includes(i) ? "selecionado" : ""}>{dias}</button>
                                ))}
                            </Dias>


                        </Habitos>
                    ))
                    
                    
                    
                    
                    
                    
                    : <p>não tem habitos</p>}





            </HabitsContainer>
        </>
    );
}

const Habitos = styled.div`
        width: 90%;
    height: 91px;
    background-color: #ffffff;
    margin-top:5px;
    display:flex;
    flex-direction:row




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
    height: 100vh;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Titulo = styled.div`
    color: #126ba5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
`;

const InserirHabitos = styled.div`
    width: 90%;
    height: 180px;
    background-color: #ffffff;
    position: relative;
    padding: 10px;

    input {
        width: 90%;
    }
`;

const BotaoSalvar = styled.button`
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 70px;
    height: 30px;
`;