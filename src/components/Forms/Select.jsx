import React from 'react';
import './Form.css';

const Select = ({ name, label, attr, option }) => {
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
            <div className='form__select'>
                <select className='form__inp ' id={name} {...attr}>
                    {option.map((el, i) => {
                        return (
                            <option key={i.val} value={el.val}>
                                {el.text}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default Select;
