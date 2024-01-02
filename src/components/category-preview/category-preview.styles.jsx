import styled from 'styled-components';

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  @media (max-width: 575.98px) { 
    display: block;
    width: 100%;
    text-align: center;
 }
`;

export const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin: 25px 0;
  cursor: pointer;
`;

export const Preview = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;

    @media (max-width: 575.98px) { 
      grid-template-columns: repeat(2, 1fr);
      column-gap: 20px;
 }
`;
