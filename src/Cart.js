import React, { useEffect, memo } from "react";
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from "react-redux"; //3번

function Cart(props) {

    let state = useSelector((state) => state.reducer);
    console.log(state);
    let dispatch = useDispatch();

    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.map((a, i) => {
                            return (
                                <tr key={i}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.quan}</td>
                                    <td>
                                        <button onClick={() => { dispatch({ type: '수량증가', payload: a.id }) }}>+</button>
                                        <button onClick={() => { dispatch({ type: '수량감소', payload: a.id }) }}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                props.alertA === true
                    ? (<div className="my-alert2">
                        <p>지금 구매하시면 신규할인 20%</p>
                        <button onClick={() => { props.dispatch({ type: 'close' }) }}>닫기</button>
                    </div>)
                    : null
            }
            <Parent 이름="존박" 나이="20"></Parent>
        </div>
    )
}

function Parent(props) {
    return (
        <div>
            <Child1 이름={props.이름}></Child1>
            <Child2 나이={props.나이}></Child2>
        </div>
    )
}

function Child1(props) {
    useEffect(() => { console.log('렌더링됨1') });
    return <div>1111</div>
}

let Child2 = memo(function () {
    useEffect(() => { console.log('렌더링됨2') });
    return <div>2222</div>
});





// function state를props화(state) {  //리덕스 실제로 사용할 컴포넌트 1번 함수만들기
//     return {
//         // 상품명: state[0].name
//         state: state.reducer,
//         alertA: state.reducer2
//     }
// }
// export default connect(state를props화)(Cart)  //2번

export default Cart;