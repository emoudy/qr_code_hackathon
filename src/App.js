import React from 'react';

const App = () => {
    return (
        <div>
            <form className='form'>
                <div className='form-control'>
                    <label htmlFor='name'>Name: </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
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
                <button type='submit' onSubmit={console.log("Submitting!")}>Add person</button>
            </form>
        </div>
  );
};

export default App;