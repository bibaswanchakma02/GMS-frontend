
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card.scss';

const Card = ({ color, onClick, children }) => {
    return (
        <div className={`card ${color}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
