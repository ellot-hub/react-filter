import { styled } from "styled-components";

export const HeaderPos = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #75c2f6; /* dark: 1D5D9B */
    display: flex;
    flex: 1;
    align-items: center;
`;
export const HeaderTitle = styled.div`
    font-size: 18px;
    color: #28323c;
    flex-grow: 1;
    span {
        margin-left: 30px;
    }
`;