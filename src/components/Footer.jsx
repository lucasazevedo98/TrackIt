import { Link,useLocation } from "react-router";
import styled from "styled-components";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export default function Footer() {
    const location = useLocation()
    return (
        <Rodape>
            <BotaoHabitos 
            to="/habitos"
            estaativo={location.pathname === "/habitos"}
            ><CalendarMonthIcon />Hábitos</BotaoHabitos>
            <BotaoHoje 
            to="/hoje"
            estaativo={location.pathname === "/hoje"}
            ><EventAvailableIcon />Hoje</BotaoHoje>
        </Rodape>
    );
}

const Rodape = styled.div`
    display: flex;
    font-family:"Lexand Deca";
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 65px;
    background-color: #ffffff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const BotaoHabitos = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 65px;
    text-decoration: none;
    background-color: ${(props) => (props.estaativo ? "#52B6FF" : "white")};
    color: ${(props) => (props.estaativo ? "white" : "#D4D4D4")};
    font-size: 18px;
    border: none;
    border-radius: 0;
`;

const BotaoHoje = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 65px;
    text-decoration: none;
    background-color: ${(props) => (props.estaativo ? "#52B6FF" : "white")};
    color: ${(props) => (props.estaativo ? "white" : "#D4D4D4")};
    font-size: 18px;
    border: none;   
    border-radius: 0;
    border-left: 2px solid #e5e5e5;
`;