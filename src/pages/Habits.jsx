import { useContext } from "react";
import Header from "../components/Header";
import UserContext from "../context/UserContext";
import styled from "styled-components";



export default function Habits() {
    const { foto } = useContext(UserContext)
    return (
        <>
            <Header foto={foto} />
                <HabitsContainer>
                    <Titulo>
                        <h1>Meus Hábitos</h1>
                        <button>+</button>
                    </Titulo>

                </HabitsContainer>
        </>

    )
}

const HabitsContainer = styled.div`
    width:100vw;
    height:100vh;
    background-color:#F2F2F2;
`

const Titulo = styled.div`
    
    color:#126BA5;
    display:flex;
    justify-content:space-between;
    align-items:center;

    
`