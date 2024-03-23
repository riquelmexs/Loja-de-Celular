import React, { useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getItem, setItem } from './services/LocalStorageFuncs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductsArea } from "../css/style";
import Header from "../components/Header";

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;

    h4 {
        margin: 0;
    }

    img {
        max-width: 100px;
        max-height: 100px;
        margin: 10px 0;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.5em;
        color: crimson;
    }
`;

export const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinho') || []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = "https://api.mercadolibre.com/sites/MLB/search?q=celular";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const objJson = await response.json();
                setData(objJson.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchApi();
    }, []);

    const handleClick = (obj) => {
        const findElement = cart.find((e) => e.id === obj.id);

        if (findElement) {
            const arrFilter = cart.filter((e) => e.id !== obj.id);
            setCart(arrFilter);
            setItem('carrinho', arrFilter);
        } else {
            setCart([...cart, obj]);
            setItem('carrinho', [...cart, obj]);
        }
    }

    return (
        <div>
            <Header />
            <ProductsArea>
                {data.map((e) => (
                    <ProductCard key={e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt="" />
                        <h4>{`R$ ${e.price}`}</h4>
                        <button 
                        onClick={() => handleClick(e)}>
                            {cart.some((itemCart) => itemCart.id === e.id) ? (
                                <BsFillCartCheckFill />
                            ) : (
                                <BsFillCartPlusFill />
                            )}
                        </button>
                    </ProductCard>
                ))}
            </ProductsArea>
        </div>
    );
};
