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
        this.data = this.data.filter((el) => {
            if (typeof id === 'string') {
                return flag ? el.author._id === id : el.author._id !== id;
            }
            return flag ? id.includes(el.author._id) : !id.includes(el.author._id);
        });
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
    byText(text, withDescription = false) {
        this.data = this.data.filter((el) => {
            const exp = new RegExp(text, 'i');
            return exp.test(el.name) || (withDescription && exp.test(el.description));
        });
        return this;
    }
    byPrice(min = 1, max = min) {
        this.data = this.data.filter((el) => {
            const price = +(el.price * (1 - el.discount / 100)).toFixed(2);
            return price >= min && price <= max;
        });
        return this;
    }
    byQuantityInStock(min = 1, max = min) {
        this.data = this.data.filter((el) => el.stock >= min && el.stock <= max);
        return this;
    }
    isAvailable(flag = true) {
        this.data = this.data.filter((el) =>
            el.available === flag || flag ? el.stock !== 0 : el.stock === 0
        );
        return this;
    }
    isFavorite(id) {
        this.data = this.data.filter((el) => el.likes.includes(id));
        return this;
    }
    isPublished(flag = true) {
        this.data = this.data.filter((el) => (flag ? el.isPublished : !el.isPublished));
        return this;
    }
    withDiscount(flag = true) {
        this.data = this.data.filter((el) => (flag ? el.discount > 0 : el.discount === 0));
        return this;
    }
    withReviews(flag = true) {
        this.data = this.data.filter((el) =>
            flag ? el.reviews.length > 0 : el.reviews.length < 0
        );
        return this;
    }
    withLikes(flag = true) {
        this.data = this.data.filter((el) => (flag ? el.likes.length > 0 : el.likes.length < 0));
        return this;
    }
}

class GoodsSort {
    constructor(arr) {
        this.data = arr;
    }
    byPrice(direction = 'up') {
        this.data.sort((a, b) => {
            const aResult = a.price * (1 - a.discount / 100);
            const bResult = b.price * (1 - b.discount / 100);
            return direction === 'up' ? aResult - bResult : bResult - aResult;
        });
        return this;
    }
    byDate(direction = 'down') {
        this.data.sort((a, b) => {
            const aResult = new Date(a.created_at).getTime();
            const bResult = new Date(b.created_at).getTime();
            return direction === 'up' ? aResult - bResult : bResult - aResult;
        });
        return this;
    }
    byDiscount(direction = 'down') {
        this.data.sort((a, b) => {
            return direction === 'up' ? a.discount - b.discount : b.discount - a.discount;
        });
        return this;
    }
    byStock(direction = 'down') {
        this.data.sort((a, b) => {
            return direction === 'up' ? a.stock - b.stock : b.stock - a.stock;
        });
        return this;
    }
    byName(direction = 'up') {
        this.data.sort((a, b) => {
            const result = a.name.trim().toLowerCase() > b.name.trim().toLowerCase() ? 1 : -1;
            return direction === 'up' ? result : result * -1;
        });
        return this;
    }
    byLikes(direction = 'down') {
        this.data.sort((a, b) => {
            return direction === 'up'
                ? a.likes.length - b.likes.length
                : b.likes.length - a.likes.length;
        });
        return this;
    }
    byReviews(direction = 'down') {
        this.data.sort((a, b) => {
            return direction === 'up'
                ? a.reviews.length - b.reviews.length
                : b.reviews.length - a.reviews.length;
        });
        return this;
    }
    byRating(direction = 'down') {
        this.data.sort((a, b) => {
            const aSum = a.reviews.reduce((acc, el) => acc + el.rating, 0);
            const bSum = b.reviews.reduce((acc, el) => acc + el.rating, 0);
            const aResult = aSum ? aSum / a.reviews.length : aSum;
            const bResult = bSum ? bSum / b.reviews.length : bSum;
            return direction === 'up' ? aResult - bResult : bResult - aResult;
        });
        return this;
    }
    byPopular(direction = 'down', withLikes = false) {
        this.byReviews(direction);
        if (withLikes) {
            this.byLikes(direction);
        }
        this.byRating(direction);
        return this;
    }
}

export const initialValue = {
    getNumber: (max = 11, min = 0) => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    setPrice: (el) => {
        return +(el.price * (1 - el.discount / 100)).toFixed(2);
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
    sortProducts: (arr) => new GoodsSort(arr),
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
