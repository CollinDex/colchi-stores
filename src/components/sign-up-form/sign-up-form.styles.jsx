import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

  @media (max-width: 575.98px) { 
        padding-top: 2rem;
        width: 100%;
    }

    @media (min-width: 576px) and (max-width: 850px) { 
        padding-top: 2rem;
    }
`;
