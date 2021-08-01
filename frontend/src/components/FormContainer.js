import React from 'react'

const FormContainer = ({children}) => {
    return (
        <div className='form-container'>
            <div className='form-container-row'>
                <div className='form-container-coulmn'>
                   {children}
                </div>
            </div>
        </div>
    )
}

export default FormContainer
