import { useState } from 'react';

const useUserState = () => {
    const name = useState('');
    const about = useState('');
    const avatar = useState('');
    const email = useState('');
    const password = useState('');
    const passwordAccept = useState('');
    const token = useState('');

    return {
        name,
        about,
        avatar,
        email,
        password,
        passwordAccept,
        token,
    };
};

const useProductState = () => {
    const name = useState('');
    const price = useState(1);
    const discount = useState(0);
    const stock = useState(1);
    const isPublished = useState(false);
    const available = useState(false);
    const wight = useState('');
    const description = useState('Тут скоро появится описание');
    const pictures = useState('');
    const tags = useState(['df']);

    return {
        name,
        price,
        discount,
        stock,
        isPublished,
        wight,
        description,
        pictures,
        tags,
        available,
    };
};

const useReviewState = () => {
    const rating = useState(1);
    const text = useState('');
    const name = useState('Отзыв о товаре');
    const city = useState('DogLand');

    return {
        rating,
        text,
        name,
        city,
    };
};

const useUserInfoState = () => {
    const about = useState('');
    const avatar = useState('');
    const name = useState('');

    return {
        name,
        about,
        avatar,
    };
};

const useFormState = (type) => {
    switch (type) {
        case 'user':
            return useUserState;
        case 'product':
            return useProductState;
        case 'review':
            return useReviewState;
        case 'userInfo':
            return useUserInfoState;
        default:
            return {};
    }
};

export { useUserState, useProductState, useReviewState };
export default useFormState;
