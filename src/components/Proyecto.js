import React, { useContext, Fragment } from 'react';
import agendaContext from '../context/agenda/agendaContext';
import { Link } from 'react-router-dom';


const Proyecto = ({ proyecto }) => {

    //Extraigo el state de agenda
    const AgendaContext = useContext(agendaContext);
    const { eliminarProyecto, proyectoActual, asociadoPorId, managerPorId} = AgendaContext;

    let date = new Date(proyecto.fecha);
    let d = date.getDate();
    if (d < 10) { d = '0' + d; }
    let m = date.getMonth() + 1;
    if (m < 10) { m = '0' + m; }
    let y = date.getFullYear();
    let h = date.getHours();
    if (h < 10) { h = '0' + h; }
    let min = date.getMinutes();
    if (min < 10) { min = '0' + min; }

    let arregloAsociado = asociadoPorId(proyecto.asociado);
    let arregloManager = managerPorId(proyecto.manager);

    return (

        <Fragment>

        {arregloAsociado !== undefined  && arregloManager !== undefined  ? 

        
            <tr>
            <td><p>{proyecto.nombre}</p><p className="creation-date">{`Creation date: ` + d + "/" + m + "/" + y + " " + h + ":" + min}</p>
                <p className="asociado-responsive">{<img src={arregloAsociado.foto} className="avatar" alt="avatar"></img>}{`${arregloAsociado.nombre} ${arregloAsociado.apellido}`}</p>
            </td>

            <td className="manager">{<img src={arregloManager.foto} className="avatar" alt="avatar"></img>}{`${arregloManager.nombre} ${arregloManager.apellido}`}</td>

            <td className="asociado">{<img src={arregloAsociado.foto} className="avatar" alt="avatar"></img>}{`${arregloAsociado.nombre} ${arregloAsociado.apellido}`}</td>

            <td className="status"><p>{proyecto.estado}</p></td>

            <td>

                <div className="action">

                    <div className="btn-group">
                        <button type="button" className="btn dropdown-toggle shadow-none" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to={'/editar-proyecto'} className="btn btn-dropdown" onClick={() => proyectoActual(proyecto)}>
                            <i className="fas fa-edit"></i>
                                Edit  
                            </Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button
                                    type="button"
                                    className="btn btn-dropdown"
                                    onClick={() => eliminarProyecto(proyecto._id)}
                                ><i className="fas fa-trash"></i>Delete</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr> 
    
        : <p>cargando proyectos</p> }
        </Fragment>
        
    );
}

export default Proyecto;