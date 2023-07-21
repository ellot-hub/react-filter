import {iFilter, iFilterDetail, iFilterParams} from "interfaces/Interface";

export function saveLocal<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocal<T>(key: string): T {
    const jsonString = localStorage.getItem(key) || "null";
    return JSON.parse(jsonString);
}

export function loadOrigin(key: string): iFilter[] | iFilterDetail | iFilterParams {
    if(key === "filters") {
        return [
            {
                name: "대륙/지역",
                type: "filter",
                key: "continent",
                values: [
                    "아시아", "유럽", "오세아니아", "아메리카", "아프리카"
                ],
                active: "",
            },
            {
                name: "포함경비",
                type: "filter",
                key: "included",
                values: [
                    "가이드비", "운전기사", "팁", "여행지 입장료", "식대", "대중교통비"
                ],
                active: "",
            },
            {
                name: "가격",
                type: "filter",
                key: "price",
                values: [
                    "낮은 가격순", "높은 가격순"
                ],
                active: "",
            },
            {
                name: "그룹 투어",
                type: "tag",
                active: "",
            },
            {
                name: "야간 투어",
                type: "tag",
                active: "",
            },
            {
                name: "인기",
                type: "tag",
                active: "",
            },
            {
                name: "특가",
                type: "tag",
                active: "",
            },
            {
                name: "프리미엄",
                type: "tag",
                active: "",
            }
        ]
    } else if(key === "filterDetails") {
        return {
            parentIndex: -1,
            list: [],
            active0: ["", "", "", "", ""],
            active1: ["", "", "", "", "", ""],
            active2: ["", ""],
        }
    } else {
        return {
            continent: [],
            included: [],
            price: "",
            travelTypeTags: [],
        }
    }
}
