import React, { FC } from 'react';
import {debounce} from 'lodash';
import styled from 'styled-components';
const Content = styled('div')`
    box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    width: 794px;
    height: 1123px;
    background-color: #fff;
    font-size: 17px;
    padding: 10px;
`;
const CONTENT_DIV_ID = 'CONTENT'
const LOCAL_STORAGE_CONTENT_KEY = 'SHEET_CONTENT'
const getInitialState = () => {
    return localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY) || '';
}
const Sheet = () => {
    const setContentStateDebounce = debounce(() => {
        const contentElement = document.getElementById(CONTENT_DIV_ID);
        const innerHtml = contentElement?.innerHTML;
        if (innerHtml) {
            localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, innerHtml);
        }
    }, 300)
    return <Content
        id={CONTENT_DIV_ID}
        contentEditable='true'
        onDrop={setContentStateDebounce}
        onKeyUp={setContentStateDebounce}
        dangerouslySetInnerHTML={{ __html: getInitialState()}}
    />
}
export default Sheet as FC<any>;