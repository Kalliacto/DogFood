import React, { useState } from 'react';
import './ForFaq.css';
import data from '../../assets/data/faq.json';

const ForFaq = () => {
    const [selected, setSelected] = useState(null);
    const toggle = (index) => {
        if (selected === index) {
            return setSelected(null);
        }
        return setSelected(index);
    };

    return (
        <div className='faq__accordion'>
            {data?.map((item, index) => {
                return (
                    <div className='faq__accordion_item' key={index}>
                        <div className='faq__accordion_title' onClick={() => toggle(index)}>
                            <span>{selected === index ? '-' : '+'}</span>
                            <h3>{item.title}</h3>
                        </div>
                        <div
                            className={
                                selected === index
                                    ? 'faq__accordion_content show'
                                    : 'faq__accordion_content'
                            }
                        >
                            {item.text}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ForFaq;
