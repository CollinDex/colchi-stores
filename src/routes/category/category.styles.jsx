import styled from 'styled-components';

export const Title = styled.h2`
     font-size: 38px;
     margin-bottom: 25px;
     text-align: center;
     text-transform: uppercase;
`;

export const ProductContainer = styled.div`
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     column-gap: 10px;
     row-gap: 50px;

     @media (max-width: 575.98px) { 
               grid-template-columns: repeat(2, 1fr);
               column-gap: 20px;
          }
`;