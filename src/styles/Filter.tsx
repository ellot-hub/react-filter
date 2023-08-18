import { styled } from "styled-components";

export const FilterPos = styled.div`
    position: sticky;
    top: 60px;
    width: 100%;
    background-color: #fff;
`;

export const FilterList = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    height: 50px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 10px;
    box-sizing: border-box;
    scroll-behavior: smooth;
    border-bottom: 1px solid #e9ebee;
    &::-webkit-scrollbar {
        height: 3px;
    }
    &::-webkit-scrollbar-track {
        background: #fff;
    }
    &::-webkit-scrollbar-thumb {
       background: #c5c8ce;
    }
`;
export const FilterItem = styled.li`
    border: 1px solid #c5c8ce;
    font-size: 14px;
    min-width: 50px;
    justify-content: center;
    padding: 3px 5px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    &:not(:last-child) {
        margin-right: 7px;
    }
`;
