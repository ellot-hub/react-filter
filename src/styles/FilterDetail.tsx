import { styled } from "styled-components";

export const DetailPos = styled.div`
    position: fixed;
    width: 420px;
    top: 110px;
    height: calc(100vh - 110px);
    background-color: rgba(0,0,0,.5);
`;
export const DetailBox = styled.div`
    width: 100vw;
    max-width: 420px;
    height: 200px;
    background-color: #fff;
    padding: 10px 30px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;
export const DetailBoxClose = styled.img`
    width: 30px;
    margin-left: auto;
`
export const DetailList = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    gap: 20px;
`
export const DetailItem = styled.li`
    flex-basis: 33.33%;
    border: 1px solid #c5c8ce;
    font-size: 14px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`