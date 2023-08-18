import {FilterItem, FilterList, FilterPos} from "styles/Filter";
import close from "assets/btn_close.svg";
import {FilterProps} from "interfaces/Interface";

const Filter: React.FunctionComponent<FilterProps> = ({list, showClear, onAddFilter, onRemoveFilter, onClearAll}) => {
    return (
        <>
            <FilterPos>
                <FilterList>
                    <FilterItem
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
                    </FilterItem>
                    {
                        list && list.map((item, index) => (
                            <FilterItem
                                style={{
                                    backgroundColor:
                                        item.active === "active" ?
                                            "#75c2f6" : "#fff",
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
                            </FilterItem>
                        ))
                    }
                </FilterList>
            </FilterPos>
        </>
    );
}

export default Filter;
