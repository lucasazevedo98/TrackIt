import Footer from "../components/Footer";
import Header from "../components/Header";
import confirmado from "../assets/confirmado.png"
import UserContext from "../context/UserContext";
import Token from "../context/Token";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'



export default function Today() {
    const { foto } = useContext(UserContext);
    const { token } = useContext(Token);
    const hoje = dayjs()
    dayjs.locale('pt-br');

    const [tarefas, setTarefas] = useState([])




    function atualizar() {
        const rota = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const headers = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        }
        axios.get(rota, headers)
            .then((e => {
                setTarefas(e.data)
            })).catch(e=>console.log(e.data.messege))

        }

        useEffect(() => {
            atualizar(); 
        }, []); 


    function concluir(id,done) {


        if(!done) {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{},headers).
            catch(e=>console.log(e.data.messege))

            atualizar()


        } else {
            const headers = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
            axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,{},headers).
            catch(e=>console.log(e.data.messege))

            atualizar()
        }


    }





    return (
        <>
            <Header foto={foto}/>
            <HabitsContainer>

                <Titulo>{hoje.format("dddd")} , {hoje.format('DD/MM')}</Titulo>


                {tarefas.map((e, i) => (
                    <Habitos key={i}>
                        <Esquerda>
                        <h2>{e.name}</h2>
                        <p>Sequência atual: {e.currentSequence} dias</p>
                        <p>Seu recorde: {e.highestSequence} dias</p>
                        </Esquerda>

                        <Direita confirmado={e.done}>
                            <img src={confirmado} onClick={()=>concluir(e.id,e.done)} />
                        </Direita>
                    </Habitos>

                ))}

            </HabitsContainer>


            <Footer />
        </>


    )
}

const Esquerda = styled.div`

    width:90%;
    height:100%;




`



const Direita = styled.div`

    background-color:${(props) => (props.confirmado ? "#8FC549" : "#EBEBEB") };
    border-radius:5px;
    display:flex;
    align-items:center;
    justify-content:center;

    width: 25%;
    height: 100%;


`



const HabitsContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top:50px;



`;


const Habitos = styled.div`
    width: 90%;
    height: 70px;
    background-color: #ffffff;
    margin-top:5px;
    display:flex;
    flex-direction:row;
    border-radius:5px;
    padding:10px;
    color:#666666;
    
    &:first-child   {
        margin-top:20px;
    }

    &:last-child {
        margin-bottom:90px;
    }

    h2{
        font-size:20px;
        font-family: "Lexend Deca";
        margin-bottom:10px;
    }

    p {
        font-family: "Lexend Deca";
        font-size: 12.98px;
        font-weight: 400;
        color:#666666;


    }




`

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

`