import styled from "styled-components";
import logo from "../assets/Logo-topo.png"

export default function Header({ foto }) {
    return (
        <Container>
            <h1>TrackIt</h1>
            <UserImage src={foto} alt="Foto do Usuário" />
        </Container>
    );
}

const Container = styled.header`
    width: 100%;
    height: 60px;
    background-color: #126ba5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-weight: bold;

    h1 {
        font-family: "Playball";
        font-weight: 400;
        color:#FFFFFF;
        font-size:40px;
        margin-left:5px;
    }
`;

const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right:5px;
`;

