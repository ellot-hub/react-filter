import "styles/Product.css";
import {ProductProps} from "interfaces/Interface";

const Product: React.FunctionComponent<ProductProps> = ({data, isLoading, isError}) => {
    if(isLoading) return <div className="Product">로딩중입니다.</div>
    if(isError) return <div className="Product">에러가 발생하였습니다.</div>
    if(!data) return <div className="Product">선택하신 조건에 맞는 여행정보가 없습니다.</div>
    return (
        <>
            <div className="Product">
                <ul className="Product__list">
                    {
                        data.map((travel) => (
                            <li className="Product__item" key={travel.id}>
                                <img src={travel.image}/>
                                <div className="Product__info">
                                    <div className="Product__info--top">
                                        <span className="Product__name">{travel.name}</span>
                                        <div className="Product__tag">
                                            {
                                                travel.travelTypeTags.map((tag, index) => (
                                                    <span key={index}>{tag}</span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="Product__info--bottom">
                                        <span className="Product__price">
                                            {travel.discountPercent > 0 ? (travel.price - (travel.price * (travel.discountPercent / 100))).toLocaleString() + "원 " : travel.price.toLocaleString() + "원 "}
                                            {travel.discountPercent > 0 ? `(-${travel.discountPercent}%)` : ``}
                                        </span>
                                        <span className="Product__etc">
                                            {
                                                travel.included.map((info, index) => (
                                                    travel.included.length -1 === index ? info :`${info}, `
                                                ))
                                            }
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default Product;
