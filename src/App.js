import userEvent from '@testing-library/user-event';
import React,  {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
  margin: auto;
`;

// const StyledImage = styled.img`
//   max-width="450";
// `;

const Button = styled.button `
  width: 100%;
  background-color: #009fe0;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #025c82;
  }
`;

const StyledInput = styled.input `
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const RequiredMessage = styled.div `
  color: red;
`;

const SuccessMessage = styled.div `
  color: #025c82;
  text-align: center;
  font-weight: bold; 
`;

const App = () => {
  const [details, setDetails] = useState({ firstName: '', lastName: '', email: '', phone: ''});
  const [error, setError] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = event => {
    checkValidation();
    event.preventDefault();
    const urlString = new URLSearchParams(window.location.search).get('token');
    const payload = {...details, token: urlString};
    console.log("payload", payload);

    console.log("error", error);
  
    !error && setSubmitSuccess(true);
    isComplete && (
      axios.post(`https://yii-client-uriel-mendoza.dev-conversica.com/dashboard/scandalous/savelead`, { payload })
      .then(res => {
        console.log(res);
      })
    );
    !error && setDetails({ firstName: '', lastName: '', email: '', phone: ''});
  }

  const checkValidation = () => {
    (details.firstName === '' || details.email === '') 
      ? setError(true)
      : setError(false)
    console.log("error", error);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setDetails({ ...details, firstName: value === '' ? '' : value });
        break;
      case 'lastName':
          setDetails({ ...details, lastName: value === '' ? '' : value });
          break;
      case 'email':
        setDetails({ ...details, email: value === '' ? '' : value});
        break;
      case 'phone':
        setDetails({ ...details, phone: value === '' ? '' : value});
        break;
      default:
        break;
    }
  }
    return (
        <Container>
            <img src="./conversica-logo.png" alt="Conversica Logo" width="350" />
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='firstName'>First Name: </label>
                    <StyledInput
                        type='text'
                        id='firstName'
                        name='firstName'
                        onChange={handleChange}
                        value={details.firstName}
                    />
                    {error && <RequiredMessage>*Required</RequiredMessage>}
                    <label htmlFor='lastName'>Last Name: </label>
                    <StyledInput
                        type='text'
                        id='lastName'
                        name='lastName'
                        onChange={handleChange}
                        value={details.lastName}
                    />
                    <label htmlFor='email'>Email: </label>
                    <StyledInput
                        type='text'
                        id='email'
                        name='email'
                        onChange={handleChange}
                        value={details.email}
                    />
                    {error && <RequiredMessage>*Required</RequiredMessage>}
                    <label htmlFor='phone'>Phone: </label>
                    <StyledInput
                        type='text'
                        id='phone'
                        name='phone'
                        onChange={event => setDetails({...details, phone: event.target.value=== '' ? null : event.target.value})}
                        value={details.phone}
                    />
                </div>
                <Button type='submit'>Register</Button>
                {(submitSuccess && !error) && <SuccessMessage>Thank you for registering!</SuccessMessage>}
            </form>
        </Container>
  );
};

export default App;