import React from 'react';

import quotesList from '../assets/quotes.json';
import { randomItemFromArray } from '../helpers';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function PageFooter({nonRandomQuote}) {

    const quote = nonRandomQuote || randomItemFromArray(quotesList);

    return (
        <div className="page-footer">
            <div className="quote">
                <FaQuoteLeft className="quote__svg quote__svg--left"/>
                <p className="quote__text">{quote.quote}</p>
                <FaQuoteRight className="quote__svg quote__svg--right"/>
                {quote.by && <span className="quote__by">- {quote.by}</span>}
            </div>
        </div>
    )
}
