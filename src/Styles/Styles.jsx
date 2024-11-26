import styled from "styled-components";
import {Link} from "react-router"


export const Container = styled.div`
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

export const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    text-align: center;
    margin-top: -5px;
`;

export const LinkRota = styled(Link)`
    color: #52b6ff;
    font-size: 14px;
    text-decoration: underline;
    margin-top: 20px;
`;