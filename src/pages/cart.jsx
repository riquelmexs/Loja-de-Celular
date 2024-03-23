import React, { useState } from "react";
import { BsFillCartDashFill } from 'react-icons/bs'; 
import styled from 'styled-components';
import { ProductsArea } from '../css/style';
import Header from '../components/Header'; 
import { getItem, setItem } from './services/LocalStorageFuncs';

export const Cart = () => {
    const [data, setData] = useState(getItem('carrinho') || [])

    const removeItem = (obj) => {
        const arrFilter = data.filter((e) => e.id !== obj.id)
        setData(arrFilter);  
        setItem('carrinho', arrFilter);
    };

    const subTotal = data.reduce((acc,cur) => acc + cur.price ,0 )

    return (
        <div>
            <Header />
            <h3>{`subTotal: R$  ${subTotal}`}</h3>
            <ProductsArea>
                {
                data.map((e) => (
                    <div key={e.id}>
                        <h4>{e.title}</h4> 
                        <img src={e.thumbnail} alt={e.title} /> 
                        <h4>{`R$ ${e.price}`}</h4>
                        <button
                         onClick={() => removeItem(e)}
                        >
                            <BsFillCartDashFill />
                        </button>
                    </div>
                ))
                }
            </ProductsArea>
        </div>
    )
}