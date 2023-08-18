import { styled } from "styled-components";

export const ProductWrapper = styled.div`
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
`;
export const ProductList = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
`
export const ProductItem = styled.li`
    display: flex;
    flex-wrap: wrap;
    max-width: 420px;
    border: 1px solid #c5c8ce;
    box-sizing: border-box;
    font-size: 14px;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
`
export const ProductImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
`
export const ProductInfo = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`
export const ProductInfoTop = styled.div`
    display: flex;
`
export const ProductName = styled.div`
    flex-shrink: 0;
`
export const ProductTag = styled.div`
   flex-grow: 1;
   text-align: right;
   span {
        border: 1px solid red;
        border-radius: 3px;
        color: red;
        &:not(:last-child) {
            margin-right: 7px;
        }
   }
`
export const ProductInfoBottom = styled.div`
    display: flex;
    flex-direction: column;
    span {
        text-align: left;
    }
`