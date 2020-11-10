import React from 'react';
import Lib from './components/Lib';
import Sheet from './components/Sheet';
import { Row, Col, Layout } from 'antd';
import { Container, Page } from './components/Styled';
function App() {
    return (
        <Layout>
            <Page>
                <Container>
                    <Row>
                        <Col span={3}>
                            <Lib />
                        </Col>
                        <Col span={1}>
                            &nbsp;
                        </Col>
                        <Col span={20}>
                            <Sheet />
                        </Col>
                    </Row>
                </Container>
            </Page>
        </Layout>
    );
}

export default App;
