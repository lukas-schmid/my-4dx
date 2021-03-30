import React from 'react';

import quotesList from '../assets/quotes.json';
import { randomItemFromArray } from '../helpers';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function PageFooter() {

    const { quote, by } = randomItemFromArray(quotesList);

    return (
        <div className="page-footer">
            <div className="quote">
                <FaQuoteLeft className="quote__svg quote__svg--left"/>
                <p className="quote__text">{quote}</p>
                <FaQuoteRight className="quote__svg quote__svg--right"/>
                {by && <span className="quote__by">- {by}</span>}
            </div>
        </div>
    )
}
