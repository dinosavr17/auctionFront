import React, {useEffect, useState} from "react";
import styled, {createGlobalStyle, css} from "styled-components";
import axios from "../api/axios";
import {mobile} from "../responsive";
import './adminAdd.css'
import { useForm } from 'react-hook-form';
import Navbar from "./Navbar";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
    margin: 0;
    color: #555;
  }
  label {
    cursor: pointer;
   color: #f7797d;
  }

  #upload-photo {
    padding: 5px;
    opacity: 25;
    z-index: 1;
  }
`;
const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;
const Container = styled.div`
  border-color: #222222;
  border-radius: 10px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Info = styled.div`
    display: flex;
  flex-direction: column;
  padding: 10px;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`;
const StyledInput = styled.input`
  display: flex;
  width: 100%;
  ${sharedStyles}
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
  
`;

export const AdminAddProduct = () => {
    const [product, setProduct] = useState({});
    const [image, setImage] = useState('');
    const [formInfo, setFormInfo] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [bodyFormData, setBodyFormData] = useState(null);

    // const changeHandler = (e) => {
    //     const file = e.target.files[0];
    //     if (!file.type.match(imageMimeType)) {
    //         alert("Image mime type is not valid");
    //         return;
    //     }
    //     setFile(file);
    // }


    const onSubmit = async (data) => {
        if (window.confirm('Вы уверены, что хотите добавить товар?')) {
            let bodyFormData;
            setFormInfo(data);
            // setFormInfo((prevState) => ({...prevState, image: data.image[0]}));
            // bodyFormData = new FormData();
            // console.log(data.image[0]);
            // // setFile(data.image[0]);
            // console.log(file);
            // bodyFormData.append('name', data.name);
            // bodyFormData.append('first_price', data.first_price);
            // bodyFormData.append('current_price', data.current_price);
            // bodyFormData.append('end_time', data.end_time);
            // bodyFormData.append('image', fileDataURL);
            // setBodyFormData(bodyFormData);
            // sendLot(bodyFormData);
            //
            // try {
            //     const response = await axios.post('http://130.193.40.81:8000/api/lots/', bodyFormData,
            //         {
            //             headers: {
            //                 'Content-Type': "multipart/form-data",
            //                 'Access-Control-Allow-Origin': 'http://localhost:3000',
            //                 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
            //             },
            //         },
            //     );
            //     console.log(response?.data);
            // } catch (err) {
            // }
        }
    };
    const sendLot = (bodyFormData) => {
        try {
            const response = axios.post('http://130.193.40.81:8000/api/lots/', bodyFormData,
                {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                    },
                },
            );
            console.log(response?.data);
        } catch (err) {
        }

    }
    useEffect(() => {
        if (formInfo !=null) {
            console.log(formInfo, 'formInfo');
            let fileReader;
            if (formInfo.image) {
                let bodyFormData = new FormData();
                function encodeImageFileAsURL(element) {
                    let file = element[0];
                    let reader = new FileReader();
                    reader.onloadend = function() {
                        console.log('RESULT', reader.result)
                        bodyFormData.append('image', reader.result);
                        bodyFormData.append('name', formInfo.name);
                        bodyFormData.append('first_price', formInfo.first_price);
                        bodyFormData.append('current_price', formInfo.current_price);
                        bodyFormData.append('end_time', formInfo.end_time);
                        sendLot(bodyFormData);
                    }
                    reader.readAsDataURL(file);
                }
                encodeImageFileAsURL(formInfo.image);
                // formInfo.image = encodeImageFileAsURL(formInfo.image);
                console.log(formInfo.image)
                console.log(file, 'lalalalalla');
                console.log(formInfo.image, ';;;;;');
            }
        }
    }, [formInfo]);
    useEffect(() => {
        let fileReader;
        if (file) {
            fileReader = new FileReader();
            console.log(file,'log')
            fileReader.onload = (e) => {
                const { result } = e.target;
                    setFileDataURL(result);
            }
            fileReader.readAsDataURL(file);
        }

    }, [file]);
    // useEffect(() => {
    //     if (fileDataURL !=null) {
    //         console.log('fileData', fileDataURL);
    //         console.log(bodyFormData.entries(), 'bfd')
    //         sendLot(bodyFormData);
    //     }
    //
    // }, [fileDataURL]);

    const onchange = (e) =>{
        let file =  e.target.files[0];
        function encodeImageFileAsURL(element) {
            var reader = new FileReader();
            reader.onloadend = function() {
                console.log('RESULT', reader.result)
                localStorage.setItem('image', reader.result.toString());
            }
            return reader.readAsDataURL(file);
        }
        encodeImageFileAsURL(file);
    }
    // const handleClick = async () => {
    //     try {
    //         console.log(bodyFormData);
    //         const response = await axios.post('http://localhost:3000/admin/product', bodyFormData,
    //             {
    //                 headers: {
    //                     'Content-Type':  "multipart/form-data",
    //                     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //                     'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
    //                 },
    //             },
    //         );
    //         console.log(response?.data);
    //     } catch (err) {}
    // };
    return (
                <Container className='order_section'>
                  <Navbar/>
                    <>
                        <GlobalStyle/>
                    <Wrapper >
                        <Title>Создать новый аукцион:
                        </Title>
                        <Info>
                            <StyledFormWrapper>
                            <StyledForm  class="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">

                                <StyledInput type="text" placeholder="Название лота" {...register("name", {required: true, maxLength: 80})} />
                                <StyledInput type="text" placeholder="Начальная Цена" {...register("first_price", {required: true, maxLength: 100})} />
                                <StyledInput  type="text" placeholder="Текущая цена" {...register("current_price", {required: true, maxLength: 1000})} />
                                <StyledInput  type="datetime-local" placeholder="Дата и время окончания аукциона" {...register("end_time", {})} />
                                <input type="file" placeholder="image" onChange={onchange} accept=".jpg,.jpeg,.png" {...register("image", {})} />

                                <input className='custom-btn' type="submit"  />
                                </div>
                            </StyledForm>
                            {/*<button onClick={handleClick}>Создать продукт</button>*/}
                            </StyledFormWrapper>
                        </Info>
                    </Wrapper>
                        </>
                </Container>
    )

}
export default AdminAddProduct
