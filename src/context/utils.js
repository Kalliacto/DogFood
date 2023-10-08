import { createContext } from 'react';

class GoodsFilter {
    constructor(arr) {
        this.data = arr;
    }
    byTag(tag, flag = true) {
        this.data = this.data.filter((el) => {
            if (typeof tag === 'string') {
                return flag ? el.tags.includes(tag) : !el.tags.includes(tag);
            } else {
                if (flag) {
                    for (const val of el.tags) {
                        if (tag.includes(val)) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    let search = false;
                    for (const val of el.tags) {
                        if (tag.includes(val)) {
                            search = true;
                            break;
                        }
                    }
                    return !search;
                }
            }
        });
        return this;
    }
    byAuthor(id, flag = true) {
        this.data = this.data.filter((el) => (flag ? el.author._id === id : el.author._id !== id));
        return this;
    }
    byId(id, flag = true) {
        this.data = this.data.filter((el) => {
            if (typeof id === 'string') {
                return flag ? el._id === id : el._id !== id;
            }
            return flag ? id.includes(el._id) : !id.includes(el._id);
        });
        return this;
    }
    byReviews(flag = true) {
        this.data = this.data.filter((el) =>
            flag ? el.reviews.length > 0 : el.reviews.length === 0
        );
        return this;
    }
}

export const initialValue = {
    getNumber: (max = 11, min = 1) => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    filterProducts: (arr) => new GoodsFilter(arr),
    getUniqueTag: (arr) =>
        arr.reduce((acc, el) => {
            el.tags.forEach((tag) => {
                if (!acc.includes(tag)) {
                    acc.push(tag);
                }
            });
            return acc;
        }, []),
    getUniqueAuthors: (arr) =>
        arr.reduce((acc, el) => {
            if (!acc.includes(el.author._id)) {
                acc.push(el.author._id);
            }
            return acc;
        }, []),
};

const Utils = createContext(initialValue);
export default Utils;
