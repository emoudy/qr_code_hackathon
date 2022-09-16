import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import RegistrationForm from "./RegistrationForm";
import SuccessfulRegistration from "./SuccessfulRegistration";
import { displaySubmissionMessage } from "../features/submission/submissionSlice";

const Container = styled.div`
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
  margin: auto;
`;

const RegistrationPage = () => {
  const openSuccessfulRegistration = useSelector(displaySubmissionMessage);
  return (
      <Container>
          <img 
            src="./conversica-logo.png" 
            alt="Conversica Logo" 
            style={{ width: "300px", display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
          {!openSuccessfulRegistration ? <RegistrationForm displaySuccessfulRegistration/> : <SuccessfulRegistration/>}
      </Container>
  );
};

export default RegistrationPage;