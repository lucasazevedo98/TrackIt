import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../context/UserContext";
import Token from "../context/Token";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";



export default function Today() {
    const { foto } = useContext(UserContext);
    const { token } = useContext(Token);

    const [tarefas, setTarefas] = useState([])




    useEffect(() => {
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
            }))


    }, [])




    return (
        <>
            <Header foto={foto} />

            { tarefas.map((e)=>(
                <div>{e.name}</div>
            ))}


            <Footer />

        </>


    )
}