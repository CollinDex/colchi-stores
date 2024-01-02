import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
    display:flex;
    max-width: 900px;
    justify-content: space-between;
    margin: 30px auto;

    @media (max-width: 575.98px) { 
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 0.5rem auto;
     }

    @media (min-width: 576px) and (max-width: 850px) { 
        flex-direction: column;
        align-items: center;
     }
`;
