import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #670D64;
  .logo {
    margin-bottom : 15px;
  }
  form {
    width: 35%;
    min-width: 350px;
  }
  span {
    color: red;
    font-weight: bold;
  }
`;
