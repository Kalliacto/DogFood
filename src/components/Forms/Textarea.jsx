import React from 'react';
import './Form.css';

const Textarea = ({}) => {
    return (
        <div className='form__row'>
            <label className='form__lbl' htmlFor='slc'>
                textarea&nbsp;<span className='form__lbl_req'>*</span>
            </label>
            <textarea rows={3} className='form__inp form__text' id='slc' required />
        </div>
    );
};

export default Textarea;
