import React from 'react';

import quotesList from '../assets/quotes.json';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function QuoteFooter() {
    function randomItemFromArray(arr, not) {
        const item = arr[Math.floor(Math.random() * arr.length)];
        if(item === not) return randomItemFromArray(arr, not);
        return item;
    }

    const { quote, by } = randomItemFromArray(quotesList);

    return (
        <div className="page-footer">
            <div className="quote">
                <FaQuoteLeft className="quote__svg--left"/>
                <p className="quote__text">{quote}</p>
                <FaQuoteRight className="quote__svg--right"/>
                {by && <span className="quote__by">- {by}</span>}
            </div>
        </div>
    )
}
