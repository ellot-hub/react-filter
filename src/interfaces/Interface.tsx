import React from 'react';

export interface iFilter {
    name: string,
    type: "filter" | "tag",
    key?: string,
    values?: string[],
    active: string
}
export interface iFilterDetail {
    parentIndex: number,
    list: string[],
    active0: string[],
    active1: string[],
    active2: string[],
}
export interface iFilterParams {
    continent: string[],
    included: string[],
    price: string,
    travelTypeTags: string[]
}
export interface Travel {
    id: number,
    name: string,
    image: string,
    discountPercent: number,
    continent: string[],
    included: string[],
    price: number,
    travelTypeTags: string[]
}
export interface FilterProps {
    list: iFilter[],
    showClear: boolean,
    onAddFilter: (e: React.MouseEvent<HTMLElement>, item: iFilter, index: number) => void,
    onRemoveFilter: (e: React.MouseEvent<HTMLElement>, item: iFilter, index: number) => void,
    onClearAll: (e: React.MouseEvent<HTMLElement>) => void,
}
export interface FilterDetailsProps {
    data: iFilterDetail,
    onFilter: (e: React.MouseEvent<HTMLElement>, item: string, index: number) => void,
    onPopupClose: (e: React.MouseEvent<HTMLElement>) => void,
}
export interface ProductProps {
    data: Travel[],
    isLoading: boolean,
    isError: boolean,
}