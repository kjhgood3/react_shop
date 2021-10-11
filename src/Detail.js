import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import styled from 'styled-components';
import './Detail.scss';
import { stockContext } from './App.js';
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

// class Detail2 extends React.Component {
//     componentDidMount() {   //컴포넌트가 등장할때 실행해주는 코드, Ajax를 여기에 많이 사용

//     }

//     componentWillUnmount() {     //컴포넌트가 사라지기 직전에 실행해주는 코드

//     }
// }


function Detail(props) {

    let { id } = useParams();
    let history = useHistory();
    let findProduct = props.shoes.find(function (product) {
        return product.id == id
    });
    let [alert, setAlert] = useState(true);
    let [inputData, setInputData] = useState('');
    let [tab, setTab] = useState(0);
    let [swit, setSwit] = useState(false);

    let stock = useContext(stockContext);

    // 1.컴포넌트가 등장할 때, 2.컴포넌트가 update 될 때 실행된다
    // 3. 컴포넌트가 사라질때 실행될수도 있다 return 뒤에 씀
    useEffect(() => {
        let timer = setTimeout(() => { setAlert(false) }, 3000);
        console.log('안녕');
        return function unmount() { //컴포넌트가 사라질 때 실행되는 코드
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className="container">
            <div>
                <h4 className="red">Detail</h4>
            </div>
            {inputData}
            <input type="text" onChange={(e) => { setInputData(e.target.value) }} />
            {
                alert === true
                    ? (<div className="my-alert2" on>
                        <p>재고가 얼마 남지 않았습니다.</p>
                    </div>)
                    : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findProduct.title}</h4>
                    <p>{findProduct.content}</p>
                    <p>{findProduct.price}</p>
                    <Info stock={props.stock}></Info>
                    <button className="btn btn-danger" onClick={() => {
                        props.setStock([9, 11, 12]);
                        props.dispatch({ type: '항목추가', payload: { id: findProduct.id, name: findProduct.title, quan: 1 } });
                        history.push('/cart');
                    }}>주문하기</button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => { history.goBack(); }}>뒤로가기</button>
                    {/* history.push('/') 는 '/'경로로 간다는 함수임 */}
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => { setSwit(false); setTab(0) }}>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => { setSwit(false); setTab(1) }}>Option 1</Nav.Link>
                </Nav.Item>
            </Nav>
            <CSSTransition in={swit} classNames="wow" timeout={500}>
                <TabContent tab={tab} setSwit={setSwit} />
            </CSSTransition>
        </div>
    )
}

function TabContent(props) {

    useEffect(() => {
        props.setSwit(true);
    });

    if (props.tab === 0) {
        return <div>0번째 내용입니다.</div>
    } else if (props.tab === 1) {
        return <div>1번째 내용입니다.</div>
    } else {
        return null
    }
}

function Info(props) {
    return (
        <p>재고 : {props.stock[0]}</p>
    )
}

function state를props화(state) {
    return {
        state: state.reducer,
        alertA: state.reducer2
    }
}

export default connect(state를props화)(Detail);