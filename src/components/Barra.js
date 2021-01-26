import React from 'react';
import { Link } from 'react-router-dom';

const Agenda = ({ titulo }) => {

    return (
        <header className="header container-fluid">
            <div className="container align-center">

                    <Link to={'/'} className="back">
                    <i className="fas fa-arrow-left">
                    </i>
                       <span>Back</span>
                                    </Link>
                    <h1 className="titulo">{titulo}</h1>
                    </div>
           
        </header>
    );
}

export default Agenda;