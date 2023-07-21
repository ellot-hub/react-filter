import "styles/Filter.css";
import close from "assets/btn_close.svg";
import {FilterProps} from "interfaces/Interface";

const Filter: React.FunctionComponent<FilterProps> = ({list, showClear, onAddFilter, onRemoveFilter, onClearAll}) => {
    return (
        <>
            <div className="Filter">
                <ul className="Filter__list">
                    <li
                        className="Filter__list--item"
                        style={{
                            display:
                                showClear ?
                                    "block": "none"
                        }}
                        onClick={
                            (e) => {
                                onClearAll(e)
                            }
                        }
                    >
                        초기화
                    </li>
                    {
                        list && list.map((item, index) => (
                            <li className="Filter__list--item"
                                style={{
                                    backgroundColor:
                                        item.active === "active" ?
                                            "#00b8ff" : "#fff",
                                    color:
                                        item.active === "active" ?
                                            "#fff" : "#000"
                                }}
                                key={index}
                                onClick={
                                    (e) => {
                                        onAddFilter(e, item, index)
                                    }
                                }
                            >
                                <span>{item.name}</span>
                                <img
                                    src={close}
                                    style={{
                                        display:
                                            item.active === "active" ?
                                                "block": "none"
                                    }}
                                    onClick={
                                        (e) => {
                                            onRemoveFilter(e, item, index)
                                        }
                                    }
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default Filter;
