import React,  {useState} from 'react';

const App = () => {
  const [details, setDetails] = useState({ name: '', email: '', phone: ''});

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault();
    console.log("details", details)
    setName('');
  }
  
    return (
        <div>
            <form className='form'>
                <div className='form-control'>
                    <label htmlFor='name'>Name: </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        onChange={event => setDetails({...details, name: event.target.value})}
                        value={details.name}
                    />
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        onChange={event => setDetails({...details, email: event.target.value})}
                        value={details.email}
                    />
                    <label htmlFor='phone'>Phone: </label>
                    <input
                        type='text'
                        id='phone'
                        name='phone'
                        onChange={event => setDetails({...details, phone: event.target.value})}
                        value={details.phone}
                    />
                </div>
                <button type='submit' onSubmit={handleSubmit}>Add person</button>
            </form>
        </div>
  );
};

export default App;