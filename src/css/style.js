import styled  from 'styled-components';

export const ProductsArea = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  margin-top: 30px;

  div {

    height: 300px;
    width: 230px;
    border: 1px solid rgb(194,193,193);
    display: flex;
    justfy-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    button {

      font-siza: 25px;
      background: transparent; 
      border: none;
      color: crimson;
      padding: 50px;

    }
 }
`;
