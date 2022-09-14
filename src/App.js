import userEvent from '@testing-library/user-event';
import React,  {useState, useEffect} from 'react';

const App = () => {
  const [details, setDetails] = useState({ fullName: null, email: null, phone: null});
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('')

  const handleSubmit = event => {
    event.preventDefault();
    console.log("details", details)
    setDetails({ fullName: null, email: null, phone: null});
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
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name: </label>
                    <input
                        type='text'
                        id='name'
                        name='fullName'
                        onChange={handleChange}
                        value={details.fullName}
                    />
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        onChange={handleChange}
                        value={details.email}
                    />
                    <label htmlFor='phone'>Phone: </label>
                    <input
                        type='text'
                        id='phone'
                        name='phone'
                        onChange={event => setDetails({...details, phone: event.target.value=== '' ? null : event.target.value})}
                        value={details.phone}
                    />
                </div>
                <button type='submit' disabled={!isComplete}>Add person</button>
            </form>
        </div>
  );
};

export default App;