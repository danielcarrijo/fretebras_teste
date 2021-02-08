import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  div.main-text {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 58px auto 0 auto;
    color: white;

    h5 {
        fontsize: 17px;
        margin: auto;
        font-weight: bold;
    }

    .seta {
      width:7%;
      max-width: 50px;
      cursor: pointer;
    }

    .esquerda {
      margin-left: 15px;
    }
    
    .direita {
      margin-right: 15px;

      img {
        transform: rotate(180deg);
      }
    }
  }
`;
