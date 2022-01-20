import React, { useState } from 'react'

const Form = (props) => {

    const {children, initialValues, submit = () => {} } = props

    const [form, setForm] = useState(initialValues);

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form, 
            [name]: value 
        });
    };

    return (
        <form className="Form">
            <FormContext.Provider value={{ form, handleFormChange }}>

                {children}

            </FormContext.Provider>


            <button type="button" onClick={() => submit(form)}>
                Submit
            </button>
        </form>

        
    )
}

export default Form


export const FormContext =  React.createContext({
    form:{},
    handleFormChange: () => {}   
}) 