import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0px auto 0px auto;
  padding: 25px 5px;
  position: relative;
  border-left: 1px solid rgba(0,0,0,.2);
 
  .date {
      font-size: 11px;
      opacity: 0.7;
  }
  .price {
      font-size: 13px;
      opacity: 0.7;
  }
  .store {
      font-size: 16px;
      margin-bottom: 5px;
  }
  .green-ball {
    background: #3AEA63; 
    height: 13px; 
    width: 13px; 
    border-radius: 50%;
    position:absolute;
    left: -6.5px;
    margin-top: 5px;
  }

  .ball {
    background: #3AEA63; 
    height: 18px; 
    width: 18px; 
    border-radius: 50%;
    position:absolute;
    left: -9px;
    margin-top: 2px;
  }


  .chargeback  {
    position:absolute;
    left: -12px;
    img {
        width 25px;
    }
  }

  .chargeback-message {
      color:  #F8B600;
      font-size: 12px;
  }
  
  

`;
