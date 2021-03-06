/* eslint-disable */
import './App.css';
import React, { useContext, useState, lazy, Suspense } from 'react';
import { Button, Container, Jumbotron, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Data from './data';
// import Detail from './Detail';
let Detail = lazy(() => { return import('./Detail.js') });
import { useHistory } from "react-router";
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Cart from './Cart';

export let stockContext = React.createContext();

function App() {

  let [shoes, setShoes] = useState(Data);
  let [stock, setStock] = useState([10, 11, 12]);

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
              <Nav.Link as={Link} to="/cart">Cart </Nav.Link>
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
            <stockContext.Provider value={stock}>
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return (
                      <Card key={i} shoes={a} i={i}></Card>
                    )
                  })
                }
              </div>
            </stockContext.Provider>

            <button className="btn btn-primary" onClick={() => {
              //?????????????????? UI ??????

              axios.post('??????URL', { id: 'codingapple', pw: 1234 });

              // ????????? get?????????, axios??? JSON????????? Object ???????????? ????????? ???????????? ???
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  //?????????????????? UI??? ????????????
                  console.log(result.data);
                  setShoes([...shoes, ...result.data]); //...??? ????????? ?????????
                })
                .catch(() => {
                  //?????????????????? UI??? ????????????
                  console.log('??????????????????.')
                })
            }}>?????????</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <stockContext.Provider value={stock}>
            <Suspense fallback={<div>??????????????????</div>}>
              <Detail shoes={shoes} stock={stock} setStock={setStock}></Detail>
            </Suspense>
          </stockContext.Provider>
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>

        <Route path="/:id">
          <div>???????????? ????????? ??? ?????? ????????????</div>
        </Route>

      </Switch>
    </div>

  );
}


function Card(props) {

  let stock = useContext(stockContext);
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={() => { history.push('/detail/' + props.i) }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      <Test></Test>
    </div>
  )
}

function Test() {

  let stock = useContext(stockContext);
  return (
    <p>?????? : {stock[1]}</p>
  )
}

export default App;
