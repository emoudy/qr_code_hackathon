import React,  {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
  margin: auto;
`;

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

const RequiredMessage = styled.span `
  color: red;
  font-size: .8em;
`;

const SuccessMessage = styled.div `
  color: #025c82;
  text-align: center;
  font-weight: bold; 
`;

const App = () => {
  const [details, setDetails] = useState({ firstName: '', lastName: '', email: '', phone: ''});
  const [error, setError] = useState({ firstName: true, email: true})
  const [showErrors, setShowErrors] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if(error.firstName || error.email) {
      setShowErrors(true);
    } else {
      setShowErrors(false);
      setSubmitSuccess(true);
      sendRequest();
    }
  }

  const sendRequest = () => {
    const urlString = new URLSearchParams(window.location.search).get('token');
    const payload = {...details, token: urlString};
    console.log("payload error", payload, error);

    axios.post(process.env.REACT_APP_FAKE_URL, { payload })
    .then(res => {
      console.log(res);
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value === '' ? '' : value });
    setError({ ...error, [name]: value === '' ?? false})
  }

  useEffect(() => {
    submitSuccess && setDetails({ firstName: '', lastName: '', email: '', phone: ''});
  }, [submitSuccess]);

  return (
      <Container>
          <img src="./conversica-logo.png" alt="Conversica Logo" style={{ width: "350px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
          <form className='form' onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <div className='form-control'>
                  <label htmlFor='firstName'>
                    <div>First Name: {(error.firstName && showErrors) && <RequiredMessage>*Required</RequiredMessage>}</div>
                  </label>
                  <StyledInput
                      type='text'
                      id='firstName'
                      name='firstName'
                      onChange={handleChange}
                      value={details.firstName}
                  />
                  <label htmlFor='lastName'>Last Name: </label>
                  <StyledInput
                      type='text'
                      id='lastName'
                      name='lastName'
                      onChange={handleChange}
                      value={details.lastName}
                  />
                  <label htmlFor='email'>
                    <div>Email: {(error.email && showErrors) && <RequiredMessage>*Required</RequiredMessage>}</div>
                  </label>
                  <StyledInput
                      type='text'
                      id='email'
                      name='email'
                      onChange={handleChange}
                      value={details.email}
                  />
                  <label htmlFor='phone'>Phone: </label>
                  <StyledInput
                      type='text'
                      id='phone'
                      name='phone'
                      onChange={handleChange}
                      value={details.phone}
                  />
              </div>
              <Button type='submit'>Register</Button>
              {(submitSuccess) && <SuccessMessage>Thank you for registering!</SuccessMessage>}
          </form>
      </Container>
  );
};

export default App;