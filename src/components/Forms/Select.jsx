import React from 'react';
import './Form.css';

const Select = ({ values }) => {
    return (
        <div className='form__row'>
            <label className='form__lbl' htmlFor='slc'>
                select&nbsp;<span className='form__lbl_req'>*</span>
            </label>
            <div className='form__select'>
                <select className='form__inp ' id='slc' required>
                    {values.map((el, i) => {
                        return <option key={i}>{el}</option>;
                    })}
                </select>
            </div>
        </div>
    );
};

export default Select;
