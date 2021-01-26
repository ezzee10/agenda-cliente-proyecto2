import React, { Fragment, useState, useContext } from 'react';
import agendaContext from '../context/agenda/agendaContext';
import alertaContext from '../context/alertas/alertaContext';
import Barra  from './Barra';

const NuevoProyecto = () => {

    const AgendaContext = useContext(agendaContext);
    const { agregarProyecto, managers, asignados } = AgendaContext;
    const AlertaContext = useContext(alertaContext);
    const { mostrarAlerta, alerta } = AlertaContext;

    //State para Proyecto
    const [proyectoNuevo, guardarProyecto] = useState({
        nombre: '',
        description: '',
        manager: '',
        asociado: '',
        estado: 'Enabled'
    });

    //Extraer datos del proyecto
    const { nombre, description, manager, asociado, estado } = proyectoNuevo;

    //Lee los contenidos del input
    const onChangeProyecto = e => {


        guardarProyecto({
            ...proyectoNuevo,
            [e.target.name]: e.target.value,

        })
    }

    const onChangeSelect = e => {

        guardarProyecto({
            ...proyectoNuevo,
            [e.target.name]: e.target.value
        })
    }

    const reiniciarFormulario = () => {

        guardarProyecto({
            nombre: '',
            description: '',
            manager: '',
            asociado: '',
            estado: ''
        })
    }

    // Cuando el usuario agrega un nuevo proyecto

    const onSubmitProyecto = e => {
        e.preventDefault();

        //validación

        if (nombre.trim() === '') {

            mostrarAlerta('Project name is required', 'danger');
            return;
        }

        if (description.trim() === '') {
            mostrarAlerta('Description is required', 'danger');
            return;
        }

        if (manager.trim() === '') {
            mostrarAlerta('Manager is required', 'danger');
            return;
        }

        if (asociado.trim() === '') {
            mostrarAlerta('Assigned is required', 'danger');
            return;
        }

        if (estado.trim() === '') {
            mostrarAlerta('Status is required', 'danger');
            return;
        }

        //agregar al state
        agregarProyecto(proyectoNuevo);

        mostrarAlerta('Project added successfully', 'success');

        //Reiniciar el form

        reiniciarFormulario();
    }

    return (
        <Fragment>

            <Barra
                titulo={"Add project"}
            />

            <form className="container formulario" onSubmit={onSubmitProyecto}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Project name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Description</label>
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={description}
                        onChange={onChangeProyecto}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Project manager</label>
                    <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeSelect} name="manager" >

                        <option disabled selected>Select a manager</option>

                        {
                            managers.map(item => (

                                <option name="manager" value={item._id} >{item.nombre + " " + item.apellido}</option>

                            ))
                        }

                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Assigned to</label>
                    <select className="form-control" id="exampleFormControlSelect2" onChange={onChangeSelect} name="asociado">

                        <option disabled selected>Select a person</option>

                        {
                            asignados.map(item => (

                                <option name="asociado" value={item._id} >{item.nombre + " " + item.apellido}</option>

                            ))
                        }

                    </select>
                </div>

                <label htmlFor="inputState">Status</label>
                <select id="inputState" className="form-control" onChange={onChangeSelect} name="estado">
                    <option selected value={"Enabled"}>Enabled</option>
                    <option value={"Disabled"}>Disabled</option>
                </select>


                <input type="submit" className="btn btn-danger btn-block mt-4" value="Create Project" />

                {alerta ?

                    <div className={`alert alert-${alerta.categoria}`} text-center role="alert">
                        {alerta.msg}
                    </div>

                    : null}



            </form>






        </Fragment>
    );
}

export default NuevoProyecto;