/// <reference types="react" />
import React from 'react';
export interface T {
    title: string;
    key: number | '';
    capital?: string[];
}
export interface MyProps {
    data: any[];
    className?: string;
    style?: React.CSSProperties;
    filter?: boolean;
    callBack?: (item: T) => void;
    setFields?: {
        key: string;
        title: string;
    };
    prePend?: object;
    title?: string;
}
export interface MyStates {
    visible: boolean;
    data: T[];
    dataTmp: T[];
    title?: string;
    selectedIndex: number;
    filterVal: string;
}
export default class  extends React.Component<MyProps, MyStates> {
    pageNum: number;
    t: any;
    allData: T[];
    defaultCls: string;
    defaultPage: number;
    selectedIndex: number;
    seleted: boolean;
    event: any;
    filterVal: string;
    constructor(props: MyProps);
    componentWillReceiveProps(props: MyProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onKeyDown(event: any): void;
    handleAllData(data: any[]): void;
    scrollToSelectedPos(): void;
    handleEnter(): void;
    onItemScroll(): void;
    handleLeave(): void;
    handleClick(item: {
        key: number;
        title: string;
    }, index: number): void;
    filterData(): T[];
    handleChange(e: any): void;
    onMouseEnter(key: number): void;
    render(): JSX.Element;
}
