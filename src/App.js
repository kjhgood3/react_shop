/* eslint-disable */
import './App.css';
import { Button, Container, Jumbotron, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import Data from './data';
import Detail from './Detail';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home </Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season Off!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">
            <div className="row">
              {
                shoes.map((a, i) => {
                  return (
                    <Card key={i} shoes={a} i={i}></Card>
                  )
                })
              }
            </div>
            <button className="btn btn-primary" onClick={() => {
              //로딩중이라는 UI 띄움

              axios.post('서버URL', { id: 'codingapple', pw: 1234 });

              // 서버에 get요청함, axios는 JSON파일을 Object 형식으로 알아서 바꿔준다 ㅎ
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  //로딩중이라는 UI를 안보이게
                  console.log(result.data);
                  setShoes([...shoes, ...result.data]); //...은 연산자 벗겨줌
                })
                .catch(() => {
                  //로딩중이라는 UI를 안보이게
                  console.log('실패했습니다.')
                })
            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes}></Detail>
        </Route>

        <Route path="/:id">
          <div>아무거나 적었을 때 이거 보여주셈</div>
        </Route>

      </Switch>
    </div>

  );
}


function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
    </div>
  )
}

export default App;
