import {DetailBox, DetailBoxClose, DetailItem, DetailList, DetailPos} from "styles/FilterDetail";
import close from "assets/btn_close.svg";
import {FilterDetailsProps, iFilterDetail} from "interfaces/Interface";

const FilterDetail: React.FunctionComponent<FilterDetailsProps> = ({data, onFilter, onPopupClose}) => {
    const activeKey = `active${data.parentIndex}` as keyof iFilterDetail;
    const activeData = data[activeKey] as string[];

    return (
        <>
            <DetailPos>
                <DetailBox>
                    <DetailBoxClose
                        src={close}
                        onClick={onPopupClose}
                    />
                    <DetailList>
                        {
                            data.list.map((item, index) => (
                                <DetailItem
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
                                </DetailItem>
                            ))
                        }
                    </DetailList>
                </DetailBox>
            </DetailPos>
        </>
    );
}

export default FilterDetail;
