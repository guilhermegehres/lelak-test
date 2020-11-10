import { Card, Col, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
const Droppable = styled('div')`
    width: 100%;
    height: 5px;
    background-color: transparent;
    &.dragover{
        background-color: #ef4a2d;
    }
`;
interface DraggableItens {
    type: 'img'; // Can implements another types like an custom element
    url?: string; // 
    metadata: any; // an object to define metadata to dragabble element and get o droppable area
}
const LOCAL_STORAGE_LIB_ITENS_KEY = 'LIB_ITENS_KEY'
const getInitialState = (): DraggableItens[] => {
    const itens = localStorage.getItem(LOCAL_STORAGE_LIB_ITENS_KEY) || '';
    if (itens) {
        try {
            return JSON.parse(itens) as DraggableItens[];
        } catch {}
    }
    return initialItens;
}
const initialItens: DraggableItens[] = [
    { type: 'img', url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', metadata: { item: 1 } },
    { type: 'img', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png', metadata: { item: 2 } },
    { type: 'img', url: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png', metadata: { item: 3 } },
    { type: 'img', url: 'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png', metadata: { item: 4 } },
]
let isDraggingIndex = -1
const Lib = () => {
    const [itens, setItens] = useState<DraggableItens[]>(getInitialState())
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_LIB_ITENS_KEY, JSON.stringify(itens))
    }, [itens]);
    return <Row>
        <Col span={24}>
            <Card style={{width: 'auto'}}>
                <h2>Assets library</h2>
            </Card>
        </Col>
        {
            itens.map((item, index) => {
                const DROPPABLE_ID = `DROPPABLE_${index}`;
                return <Col span={24}>
                    <Droppable id={DROPPABLE_ID}
                        onDragOver={(ev) => {
                            if (isDraggingIndex === 0 && index === 0) { return }
                            if (isDraggingIndex > -1 ) {
                                ev.preventDefault();
                                const el = document.getElementById(DROPPABLE_ID)
                                el?.classList.add('dragover')
                            }
                        }}
                        onDragLeave={() => {
                            setTimeout(() => {
                                const el = document.getElementById(DROPPABLE_ID)
                                el?.classList.remove('dragover')
                            }, 200)
                        }}
                        onDrop={(ev) => {
                            if (isDraggingIndex === 0 && index === 0) { return }
                            ev.preventDefault();
                            const el = document.getElementById(DROPPABLE_ID)
                            el?.classList.remove('dragover')
                            let originIndex = parseInt(ev.dataTransfer.getData('text/plain'));
                            if(originIndex === index) {
                                originIndex = originIndex - 1;
                            }
                            const originItem = itens[originIndex];
                            const droppedItem = itens[index];
                            const newItens = [...itens];
                            newItens[originIndex] = droppedItem;
                            newItens[index] = originItem;
                            setItens(newItens);
                        }}
                    />
                    <Card style={{
                        width: 'auto',
                        height: '80px'
                    }}
                    >
                        <img
                            alt=''
                            draggable='true'
                            style={{
                                width: 'auto',
                                height: '100%',
                                maxWidth: '100%',
                                maxHeight: '50px'
                            }}
                            onDragStart={(ev) => {
                                isDraggingIndex = index
                                ev.dataTransfer.setData('text/plain', `${index}`)
                            }}
                            onDragEndCapture={(ev) => {
                                isDraggingIndex = -1
                            }}
                            src={item.url}
                        />
                    </Card>
                </Col>
            })
        }
    </Row>
}
export default Lib as FC<any>;