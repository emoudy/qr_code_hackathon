import React,  {useState, useEffect} from "react";
import styled from "styled-components";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showSubmissionMessage } from "../features/submission/submissionSlice";


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

const RegistrationForm = () => {
  const dispatch = useDispatch()
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
    dispatch(showSubmissionMessage());

    axios.post(process.env.REACT_APP_FAKE_URL, { payload })
    .then(res => {
      console.log("payload", payload);
      if(res.status === 200) {
        console.log(res);
        dispatch(showSubmissionMessage());
      } else {
        console.log("the call failed")
      };
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
    </form>
  );
};

export default RegistrationForm;