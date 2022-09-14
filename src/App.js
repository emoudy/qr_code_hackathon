import userEvent from '@testing-library/user-event';
import React,  {useState, useEffect} from 'react';
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
`;

const Button = styled.button `
  cursor: pointer;
  border-radius: 4px;
  background: #e0e1e2 none;
  color: #999;
  &:hover {
    background-color: #025c82;
    color: #fff;
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

const App = () => {
  const [details, setDetails] = useState({ fullName: null, email: null, phone: null});
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('')

  const handleSubmit = event => {
    event.preventDefault();
    const urlString = new URLSearchParams(window.location.search).get('token');
    setDetails({ fullName: null, email: null, phone: null});
    console.log({...details, token: urlString})
  }

  const checkValidation = () => {
    const validation = details.fullName !== null && details.email !== null && details.phone !== null;
    setIsComplete(validation)
  }

  useEffect(() => {
    checkValidation();
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fullName':
        setDetails({ ...details, fullName: value === '' ? null : value });
        break;
      case 'email':
        setDetails({ ...details, email: value === '' ? null : value});
        break;
      case 'phone':
        setDetails({ ...details, phone: value === '' ? null : value});
        break;
      default:
        break;
    }
  }
    return (
        <Container>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name: </label>
                    <StyledInput
                        type='text'
                        id='name'
                        name='fullName'
                        onChange={handleChange}
                        value={details.fullName}
                    />
                    <label htmlFor='email'>Email: </label>
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
                        onChange={event => setDetails({...details, phone: event.target.value=== '' ? null : event.target.value})}
                        value={details.phone}
                    />
                </div>
                <Button type='submit' disabled={!isComplete}>Add person</Button>
            </form>
        </Container>
  );
};

export default App;