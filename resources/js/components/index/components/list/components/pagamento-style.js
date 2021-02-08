import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0px auto 0px auto;
  padding: 0px 5px;
  padding-bottom:25px; 
  position: relative;
  margin-top: 25px;
  border-left: 1px solid rgba(0,0,0,.2);

  .ball {
    height: 18px; 
    width: 18px; 
    border-radius: 50%;
    position:absolute;
    left: -9px;
  }

  .payment {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 16px;
  }

  .price {
    font-size: 13px;
    opacity: 0.7;
  }
  .date {
    font-size: 11px;
    opacity: 0.7;
  }


`;
