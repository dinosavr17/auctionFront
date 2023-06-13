import {
    Add,
    FavoriteBorderOutlined, Remove,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import axios from "../api/axios";
import {Modal} from "./Modal";
import {addProduct, removeProduct} from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import {duration} from "@mui/material";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  border-radius: 10px;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  max-height: 200px;
  max-width: 100%;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Title = styled.h1`
  font-size: 16px;
  margin: 5px;
  font-weight: normal;
`;

const Desc = styled.p`
  font-size: 14px;
  text-align: center;
  margin: 10px;
`;

const Button = styled.button`
  
`;
const InfoContainer = styled.div`
  color: black;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  max-height: 40%;
 
`;
const ImgContainer = styled.div`
 justify-items: center;
  align-items: center;
display: flex;
  flex-direction: column;
  max-height: 60%;
  padding: 0.5em;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-weight: 700;
`;
const PriceBlock = styled.div`
display: flex;
  flex-direction: row;
  margin-top: 10px;
`
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Product = ({ item }) => {


    const [modalActive, setModalActive] = useState(false);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();


    useEffect(async ()=>{
        const response=await axios.get(`http://130.193.40.81:8000/api/lot/${item.id}`)
        console.log("Product",response.data)
        setProduct(response.data);
    },[item])
    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 0 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
        return quantity;
    };
    const handleAdd = async () => {
        try {

            const response = await axios.put(`http://127.0.0.1:8000/api/lot/${item.id}/bet/`,
                JSON.stringify({
                    bet: quantity,
                }),
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                        'Access-Control-Allow-Origin': 'http://localhost:3000'
                    },
                    withCredentials: false,
                    mode: 'no-cors',
                }
            );
            console.log(response.data);
        } catch (err) {}
        setModalActive(false);
    };
    const handleRemove = () => {
        if (quantity>0) {
            dispatch(
                removeProduct({...product, quantity})
            );
        }
        else {
            alert('Нечего удалять');
        }
    };
    const getDate = (date) => {
        console.log('ДАТА С БЭКА', date);
        let dateFormated = new Date(date);
        console.log('ДАТА КАК ОБЪЕКТ', typeof dateFormated);
        let dayFormated = dateFormated.getDate();
        let monthFormated = dateFormated.getMonth();
        let yearFormated = dateFormated.getFullYear();
        let timeFormated = dateFormated.getHours()+':'+dateFormated.getMinutes();
        console.log(dateFormated.getDate());
        console.log(dayFormated +'.'+monthFormated+'.'+yearFormated);
        console.log('Отформатированное время'+ timeFormated);
        let finalDate = dayFormated +'.'+monthFormated+'.'+yearFormated + ' ' +timeFormated;
        return finalDate
    }
    useEffect(async ()=>{
        const startTimer = (duration) => {

        }
    },[item])
    // function startTimer(duration, display) {
    //     var timer = duration, minutes, seconds;
    //     setInterval(function () {
    //         minutes = parseInt(timer / 60, 10);
    //         seconds = parseInt(timer % 60, 10);
    //
    //         minutes = minutes < 10 ? "0" + minutes : minutes;
    //         seconds = seconds < 10 ? "0" + seconds : seconds;
    //
    //         display.textContent = minutes + ":" + seconds;
    //
    //         if (--timer < 0) {
    //             timer = duration;
    //         }
    //     }, 1000);
    // }
    //
    // window.onload = function () {
    //     var fiveMinutes = 60 * 5,
    //         display = document.querySelector('#time');
    //     startTimer(fiveMinutes, display);
    // };

    return (
        <Container>
            <Wrapper>
                <ImgContainer>
                    <div><Image alt='товар' onClick={() => setModalActive(true)} src={item.image}/></div>
                </ImgContainer>
                <InfoContainer>
                    <div>
                        <Title>{item.name}</Title>
                        <Desc>Стартовая цена: {item.first_price}🪙</Desc>
                        <Desc>Текущая цена: {item.current_price}🪙</Desc>
                        <Desc>Время окончания аукциона: {getDate(item.end_time)}</Desc>
                    </div>
                    {/*<div>Registration closes in <span id="time">05:00</span> minutes!</div>*/}
                    <div>
                        <Button onClick={setModalActive} className='custom-btn'>Сделать ставку</Button>
                    </div>
                </InfoContainer>

                <Modal active={modalActive} setActive={setModalActive}>
                    <Container>
                        <Wrapper>
                            <ImgContainer>
                                <Image src={product.image}></Image>
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{product.name}</Title>
                                <AmountContainer>
                                    <label htmlFor='bet_input'>Сумма ставки</label>
                                    <PriceBlock>
                                    <Remove onClick={() => handleQuantity("dec")} />
                                    <input style={{borderStyle: 'solid', borderRadius: '10px'}} value={quantity} id='bet_input' onChange={(e) => setQuantity(e.target.value)}></input>
                                    <Add onClick={() => handleQuantity("inc")} />
                                    </PriceBlock>
                                </AmountContainer>
                                <Desc>
                                    <div>{product.description}</div>
                                    <div>{product.current_price}🪙</div>
                                    <div>Последний сделавший ставку: {product.current_buyer}</div>
                                </Desc>
                                <div>
                                    <Button onClick={handleAdd} className='custom-btn'>Купить</Button>
                                </div>
                            </InfoContainer>
                        </Wrapper>
                    </Container>
                </Modal>

            </Wrapper>
        </Container>
    );
};

export default Product;
