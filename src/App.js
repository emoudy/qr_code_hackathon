import React,  {useState} from 'react';

const App = () => {
  const [name, setName] = useState('');

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault();
    console.log("name", name)
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
                        onChange={event => setName(event.target.value)}
                        value={name}
                    />
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                    />
                    <label htmlFor='phone'>Phone: </label>
                    <input
                        type='text'
                        id='phone'
                        name='phone'
                    />
                </div>
                <button type='submit' onSubmit={handleSubmit}>Add person</button>
            </form>
        </div>
  );
};

export default App;