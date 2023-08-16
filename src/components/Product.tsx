import {
    ProductImage,
    ProductInfo,
    ProductInfoBottom,
    ProductInfoTop,
    ProductItem,
    ProductList,
    ProductName,
    ProductTag,
    ProductWrapper
} from "styles/Product";
import {ProductProps} from "interfaces/Interface";

const Product: React.FunctionComponent<ProductProps> = ({data, isLoading, isError}) => {
    if(isLoading) return <ProductWrapper>로딩중입니다.</ProductWrapper>
    if(isError) return <ProductWrapper>에러가 발생하였습니다.</ProductWrapper>
    if(!data) return <ProductWrapper>선택하신 조건에 맞는 여행정보가 없습니다.</ProductWrapper>
    return (
        <>
            <ProductWrapper>
                <ProductList>
                    {
                        data.map((travel) => (
                            <ProductItem key={travel.id}>
                                <ProductImage src={travel.image} />
                                <ProductInfo>
                                    <ProductInfoTop>
                                        <ProductName>{travel.name}</ProductName>
                                        <ProductTag>
                                            {
                                                travel.travelTypeTags.map((tag, index) => (
                                                    <span key={index}>{tag}</span>
                                                ))
                                            }
                                        </ProductTag>
                                    </ProductInfoTop>
                                    <ProductInfoBottom>
                                        <span>
                                            {travel.discountPercent > 0 ? (travel.price - (travel.price * (travel.discountPercent / 100))).toLocaleString() + "원 " : travel.price.toLocaleString() + "원 "}
                                            {travel.discountPercent > 0 ? `(-${travel.discountPercent}%)` : ``}
                                        </span>
                                        <span>
                                            {
                                                travel.included.map((info, index) => (
                                                    travel.included.length -1 === index ? info :`${info}, `
                                                ))
                                            }
                                        </span>
                                    </ProductInfoBottom>
                                </ProductInfo>
                            </ProductItem>
                        ))
                    }
                </ProductList>
            </ProductWrapper>
        </>
    );
}

export default Product;
