import React, { useContext, useEffect, Fragment } from 'react';
import agendaContext from '../context/agenda/agendaContext';
import Proyecto from './Proyecto';

const TablaProyectos = () => {

    //Extraigo los proyectos del state inicial
    const AgendaContext = useContext(agendaContext);
    const { proyectos, consultarManagers, consultarAsignados, obtenerProyectosPorPagina, paginaActual } = AgendaContext;


    //Obtengo todos los proyectos al cargar el componente
    useEffect(() => {
        obtenerProyectosPorPagina();
        consultarManagers();
        consultarAsignados();
        //eslint-disable-next-line
    }, [paginaActual]);

    return (

        <Fragment>

            {proyectos.length === 0 ? <div className="no-projects"><p>There are no projects, press add project to create one</p></div> :

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Project info</th>
                                <th scope="col">Project Manager</th>
                                <th scope="col">Assigned to</th>
                                <th scope="col" className="text-center">Status</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {proyectos.map(proyecto => (

                                <Proyecto
                                    key={proyecto._id}
                                    proyecto={proyecto}
                                />

                            ))}

                        </tbody>
                    </table>

            }
        </Fragment>


    );
}

export default TablaProyectos;