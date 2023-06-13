import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import axios from "../api/axios";
import {OrderDetails} from "./OrderDetails";
import shortid from 'shortid';
import {Modal} from "./Modal";
import Navbar from "./Navbar";
const Container = styled.div`
  border-color: #222222;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Info = styled.div`
  flex: 3;
`;
const Order = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
  background-color: #ffffff;
  color: black;
  border-color: black;
  border-style: solid;
  margin: 1em;
  border-radius: 10px;
`;
const OrderDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CreationDate = styled.span`
`;


const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductPrice = styled.div`
  font-size: 10px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const InnerImage = styled.img `
width: 200px;
  margin: 15px 0;
  height: 150px;
`
export const OrderHistory = () => {
    const [modalActive, setModalActive] = useState(false);
    const [orderRecords, setOrderRecords] = useState([]);
    useEffect(async ()=>{
        const response=await axios.get(
            'http://130.193.40.81:8000/api/buyerslots/',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setOrderRecords(response.data);
        console.log(response.data, 'kfkfkkfkfkfkfkf');
        console.log(orderRecords, 'rec');
        // console.log(response.data);
        // console.log(orderRecords);
    },[])
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
    if (orderRecords==[]) {return(<Container><Title>История Заказов</Title></Container>)}
    return (
       <Container>
           <Wrapper>
               <Navbar/>

               <Title>
                <div>История моих ставок:</div>
               </Title>
               <Info>
                   {orderRecords.map((order) => (
                       <Order key={order.id}>
                           <OrderDetail>
                               {/*<Image src={product.imageUrl} />*/}
                               <Details>
                                   <ProductId key={shortid.generate()}>
                                       <b>Лот:</b> {order.name}
                                   </ProductId>
                                   <CreationDate key={shortid.generate()}>
                                       <b>Дата Создания аукциона:</b> {getDate(order.creation_time)}<br/>
                                   </CreationDate>
                                   <CreationDate>
                                       <b>Дата Окончания аукциона:</b> {getDate(order.end_time)}<br/>
                                   </CreationDate>
                                   <ProductSize key={shortid.generate()}>
                                       <b>Текущая стоимость:</b> {order.current_price}🪙
                                   </ProductSize>
                               </Details>
                           </OrderDetail>
                           <PriceDetail>
                               <ProductPrice>
                                <InnerImage src={order.image}/>
                               </ProductPrice>
                               <ProductAmountContainer>
                               </ProductAmountContainer>
                           </PriceDetail>
                       </Order>
                   ))}
               </Info>
           </Wrapper>
       </Container>
    )
}
