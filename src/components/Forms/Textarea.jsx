import React from 'react';
import './Form.css';

const Textarea = ({ name, label, attr }) => {
    return (
        <div className='form__row'>
            <label className='form__lbl' htmlFor={name}>
                {label}
                {attr?.required && (
                    <>
                        &nbsp;<span className='form__lbl_req'>*</span>
                    </>
                )}
            </label>
            <textarea rows={3} className='form__inp form__text' id={name} {...attr} />
        </div>
    );
};

export default Textarea;
