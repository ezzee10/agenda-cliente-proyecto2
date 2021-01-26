import React, { Fragment } from 'react';
import TablaProyectos from './TablaProyectos';
import { Link } from 'react-router-dom';
import Paginador from './Paginador';

const Agenda = () => {

    return (
        <Fragment>

            < header className="header">
                <div className="container barra">

                    <div className="campo">
                        <h1>My projects</h1>
                    </div>

                    <div className="campo">
                        <Link to={'/nuevo-proyecto'} className="btn btn-danger text-right">
                            + Add project
                </Link>
                    </div>
                </div>

            </header >

            <div className="container">
                <TablaProyectos />
                <Paginador />
            </div>





        </Fragment>
    );
}

export default Agenda;