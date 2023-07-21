import React, {useEffect, useState} from "react";
import filter from "components/Filter";
import { saveLocal, loadLocal, loadOrigin } from "utils/Utils";
import axios from "axios";
import {Travel, iFilter, iFilterDetail, iFilterParams} from "interfaces/Interface";

const useFilter = () => {
    const [filters, setFilter] = useState<iFilter[]>(() => {
        return loadLocal<iFilter[]>("filters") ?? loadOrigin("filters");
    });
    const [filterDetails, setFilterDetail] = useState<iFilterDetail>(() => {
        return loadLocal<iFilterDetail>("filterDetails") ?? loadOrigin("filterDetails");
    });
    const [filterParams, setFilterParams] = useState<iFilterParams>(() => {
        return loadLocal<iFilterParams>("filterParams") ?? loadOrigin("filterParams");
    });
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showClearAll, setShowClearAll] = useState<boolean>(false);
    const [travels, setTravels] = useState<Travel[]>([]);
    const [travelsOrigin, setTravelsOrigin] = useState<Travel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(()=> {
        loadTravels().then(response => {
            setTravels(response);
        });
    },[])

    useEffect(() => {
        saveLocal<iFilter[]>("filters", filters);
    }, [filters]);

    useEffect(() => {
        saveLocal<iFilterDetail>("filterDetails", filterDetails);
    }, [filterDetails]);


    useEffect(()=> {
        saveLocal<iFilterParams>("filterParams", filterParams)
        const params = Object.entries(filterParams).sort();
        const origin = Object.entries(loadOrigin("filterParams")).sort();
        const isSame = JSON.stringify(params) === JSON.stringify(origin);

        if(isSame) {
            setShowClearAll(false)
            setTravels(travelsOrigin)
        }else {
            setShowClearAll(true)
            // 대륙/지역
            const continent: Travel[] = travelsOrigin.filter((car: Travel) =>
                filterParams.continent.some(model => car.continent.includes(model))
            );

            // 포함경비
            const included: Travel[] = travelsOrigin.filter((car: Travel) =>
                filterParams.included.some((info: string) => car.included.includes(info))
            );

            // 특별태그
            const travelTypeTags: Travel[] = travelsOrigin.filter((car: Travel) =>
                filterParams.travelTypeTags.some((tag: string) => car.travelTypeTags.includes(tag))
            )

            // 가격만 설정된 경우 계산
            const lenCount = continent.length + included.length + travelTypeTags.length;
            const arr = lenCount === 0 ? travelsOrigin : [...continent, ...included, ...travelTypeTags];
            const deduplication = [...new Set(arr)];

            // 보여줄 데이터 셋팅
            if(filterParams.price === "낮은 가격순") {
                setTravels(deduplication.sort((a: Travel, b: Travel) => a.price - b.price));
            } else if(filterParams.price === "높은 가격순") {
                setTravels(deduplication.sort((a: Travel, b: Travel) => b.price - a.price));
            } else {
                setTravels(deduplication.sort((a: Travel, b: Travel) => a.id - b.id));
            }
        }
    },[filterParams])

    // 리스트 조회
    const loadTravels = async () => {
        setError(false);
        setTravelsOrigin([]);
        setLoading(true);
        try {
            const response = await axios.get(
                'http://localhost:8080/travelInfo'
            );
            setLoading(false);
            setTravelsOrigin(response.data);
            return response.data;
        } catch (e) {
            setError(true);
        }
    }

    // 필터 UI 활성화 함수
    const activeFilter = (item: iFilter, index: number, updateValue: string): void => {
        const findIndex = filters.findIndex(filter => filter.name === item.name);
        const copiedFilters = [...filters];
        copiedFilters[findIndex].active = updateValue
        setFilter(copiedFilters);
    }

    // 상세필터 UI 활성화 함수
    const activeFilterDetail = (item: string, index: number): void => {
        const parentIndex = filterDetails.parentIndex;
        const parent = filters[parentIndex];
        const key = `active${parentIndex}` as keyof iFilterDetail;
        const store = filterDetails[key] as string[];
        /* 배열이 readonly 라 복사가 가능한 개체가 필요하므로 얕은복사 처리한다.
        * Typescript 는 인덱스 기반 속성 액세서를 사용할때 해당 속성의 타입을 ReadonlyArray 로 추론한다. */
        const sliced = store.slice(); //ex. active0 copy
        const copiedFilters: string[] = [...sliced];
        copiedFilters[index] = sliced[index] === "" ? "active" : ""

        // 어떤 속성을 수정할지 지정
        let paramKey :string;
        switch (parentIndex) {
            case 0: paramKey = "continent"; break;
            case 1: paramKey = "included"; break;
            case 2: paramKey = "price"; break;
        }

        // 가격은 하나만 활성화 또는 모두 비활성화만 가능
        if (parent.key === "price") {
            const otherIndex = index === 0 ? 1 : 0;
            if (sliced[otherIndex] === "active") {
                copiedFilters[otherIndex] = ""
            }

            // 부모필터 활성화
            const active = copiedFilters.some((active) => active === "active");
            const updateValue = active ? "active" : "";
            activeFilter(parent, parentIndex, updateValue);

            // 실제 조회 파라미터 추가, 제거
            setFilterParams(prevState => ({
                ...prevState,
                price: active ? item : ""
            }));
        } else {
            //continent or included case
            const paramStore: string[] = paramKey! === "continent" ? filterParams.continent : filterParams.included;

            // 부모필터 활성화
            const inactive = copiedFilters.every((inactive) => inactive === "");
            const updateValue = inactive ? "" : "active";
            activeFilter(parent, parentIndex, updateValue);

            // 실제 조회 파라미터 추가, 제거
            const updated = sliced[index] === "active" ? paramStore.filter((el) => el !== item) : [...paramStore, item];

            setFilterParams(prevState => ({
                ...prevState,
                [paramKey!]: updated,
            }));
        }
        setFilterDetail(prevState => ({
            ...prevState,
            [key]: copiedFilters
        }));
    };

    // "filter" 타입 필터 추가
    const addTypeFilter = (item: iFilter, index: number): void => {
        setShowDetail(true);
        filters.some(({name, values}: iFilter) => {
            if(name === item.name) {
                setFilterDetail(prevState => ({
                    ...prevState,
                    parentIndex: index,
                    list: values as string[],
                }));
                return true;
            }
            return false;
        })
    }

    // "filter" 타입 필터 제거
    const removeTypeFilter = (item: iFilter, index: number): void => {
        // 어떤 속성을 수정할지 지정
        let paramKey :string;
        switch (index) {
            case 0: paramKey = "continent"; break;
            case 1: paramKey = "included"; break;
            case 2: paramKey = "price"; break;
        }

        filters.some(({name, values}: iFilter) => {
            if(name === item.name) {
                setFilterDetail(prevState => ({
                    ...prevState,
                    parentIndex: -1,
                    list: [],
                    [`active${index}`]: Array((values as string[]).length).fill("")
                }));
                // 실제 조회 파라미터 제거
                setFilterParams(prevState => ({
                    ...prevState,
                    [paramKey]: paramKey === "price" ? "" : []
                }));
                activeFilter(item, index, "");
                return true;
            }
            return false;
        })
        setShowDetail(false);
    }

    // "tag" 타입 필터 추가
    const addTypeTag = (item: iFilter, index: number): void => {
        const { travelTypeTags } = filterParams;

        if (travelTypeTags.length === 0 || !travelTypeTags.includes(item.name)) {
            activeFilter(item, index, "active");
            setFilterParams(prevState => ({
                ...prevState,
                travelTypeTags: [...prevState.travelTypeTags, item.name]
            }));
        }
    }

    // "tag" 타입 필터 제거
    const removeTypeTag = (item: iFilter, index: number): void => {
        const tags: string[] = [...(filterParams as iFilterParams).travelTypeTags];
        const findIndex = tags.findIndex(tag => tag === item.name);
        tags.splice(findIndex, 1);

        setFilterParams(prevState => ({
            ...prevState,
            travelTypeTags: tags
        }));
        activeFilter(item, index, "");
    }

    // 상세필터 팝업에 따른 스크롤 제어
    useEffect(() => {
        document.body.style.overflow = showDetail === true ? "hidden" : "unset";
    },[showDetail]);

    // 필터 추가 이벤트
    const handleAddFilter = (e :React.MouseEvent<HTMLElement>, item: iFilter, index: number): void => {
        e.stopPropagation();
        item.type === "filter" ? addTypeFilter(item, index) : addTypeTag(item, index);
    }

    // 필터 제거 이벤트
    const handleRemoveFilter = (e :React.MouseEvent<HTMLElement>, item: iFilter, index: number): void => {
        e.stopPropagation();
        item.type === "filter" ? removeTypeFilter(item, index) : removeTypeTag(item, index);
    }

    // 상세필터 선택 이벤트
    const handleFilterDetail = (e :React.MouseEvent<HTMLElement>, item: string, index: number): void => {
        e.stopPropagation();
        activeFilterDetail(item, index);
    }

    // 상세필터 닫기 이벤트
    const handleFilterDetailClose = (e: React.MouseEvent<HTMLElement>): void => {
        e.stopPropagation();
        setShowDetail(!showDetail);
    }

    // 적용된 모든 필터 초기화 이벤트
    const handleClearAll = (e: React.MouseEvent<HTMLElement>): void => {
        e.stopPropagation();
        setFilter(loadOrigin("filters") as iFilter[]);
        setFilterDetail(loadOrigin("filterDetails") as iFilterDetail);
        setFilterParams(loadOrigin("filterParams") as iFilterParams);
        setShowClearAll(false);
        setShowDetail(false);
        setTravels(travelsOrigin as Travel[]);
    }

    return {
        filters,
        filterDetails,
        showDetail,
        showClearAll,
        travels,
        loading,
        error,
        handleAddFilter,
        handleRemoveFilter,
        handleFilterDetail,
        handleFilterDetailClose,
        handleClearAll
    };
}

export default useFilter;
