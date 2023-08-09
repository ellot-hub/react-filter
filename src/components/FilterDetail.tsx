import "styles/FilterDetail.css";
import close from "assets/btn_close.svg";
import {FilterDetailsProps, iFilterDetail} from "interfaces/Interface";

const FilterDetail: React.FunctionComponent<FilterDetailsProps> = ({data, onFilter, onPopupClose}) => {
    const activeKey = `active${data.parentIndex}` as keyof iFilterDetail;
    const activeData = data[activeKey] as string[];

    return (
        <>
            <div className="FilterDetail">
                <div className="FilterDetail__box">
                    <img
                        className="FilterDetail__box--close"
                        src={close}
                        onClick={onPopupClose}
                    />
                    <ul className="FilterDetail__list">
                        {
                            data.list.map((item, index) => (
                                <li
                                    className="FilterDetail__list--item"
                                    key={index}
                                    style={{
                                        backgroundColor:
                                            activeData[index] === "active"
                                                ? "#75c2f6"
                                                : "#fff",
                                        color:
                                            activeData[index] === "active"
                                                ? "#fff"
                                                : "#000"
                                    }}
                                    onClick={
                                        (e) => {
                                            onFilter(e, item, index)
                                        }
                                    }
                                >
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default FilterDetail;
