import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: #670D64;
  display: flex;
  align-items: center;
  position:fixed;
  z-index: 999;
  padding: 15px 0;
 
  div.logo {
    margin: 0 auto 0 auto;
    text-align: center;
    width: 20%;
    min-width: 200px;
    
    span {
        width: 85px;
    }
  }

  .search {
    position: absolute;
    right: 15px;
    cursor: pointer;
  }

  .user {
    position: absolute;
    left: 15px;
  }

  .score {
    margin-left: -20px;
    font-weight: bold;
    font-size: 10pt;
    color: white;

  }

  .search-box {
    margin-left: 0px;
  }

  .close {
    position: absolute;
    right: 20px;
    margin-top:7px;
    color: red;
    cursor: pointer;
  }

  
  

`;
