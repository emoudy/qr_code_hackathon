import React from 'react';
import styled from "styled-components";

const SuccessMessage = styled.div `
  color: #025c82;
  text-align: center;
  font-weight: bold;
  margin-top: 15px;
`;

const SuccessfulRegistration = () => {
  return (
    <>
      <SuccessMessage style={{ marginTop: "30px" }}>Thank you for registering!</SuccessMessage>
      <SuccessMessage>We will send you an email with follow-up information!</SuccessMessage>
    </>
  );
};

export default SuccessfulRegistration;