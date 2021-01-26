import React, { useContext, useState, useEffect, Fragment } from 'react';
import agendaContext from '../context/agenda/agendaContext';
import alertaContext from '../context/alertas/alertaContext';
import Barra from '../components/Barra';

const EditarProyecto = () => {

    //Extraigo el state de agenda
    const AgendaContext = useContext(agendaContext);
    const { editarProyecto, proyectoSeleccionado, managers, asignados } = AgendaContext;
    const AlertaContext = useContext(alertaContext);
    const { mostrarAlerta, alerta } = AlertaContext;

    //Effect que detecta si hay un proyecto seleccionado
    useEffect(() => {
        if (proyectoSeleccionado !== null) {
            guardarProyecto(proyectoSeleccionado);
        } else {
            guardarProyecto({
                _id: '',
                nombre: '',
                description: '',
                manager: '',
                asociado: '',
                estado: ''
            });
        }
    }, [proyectoSeleccionado]);

    //State para editar proyecto
    const [proyectoEditado, guardarProyecto] = useState({
        _id: '',
        nombre: '',
        description: '',
        manager: '',
        asociado: '',
        estado: ''
    });

    //Extraer datos del proyecto
    const { nombre, description, manager, asociado, estado } = proyectoEditado;

    //Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyectoEditado,
            [e.target.name]: e.target.value,

        })
    }

    const onChangeSelect = e => {


        guardarProyecto({
            ...proyectoEditado,
            [e.target.name]: e.target.value
        })
    }


    const onSubmitProyecto = e => {
        e.preventDefault();


        // Validar el proyecto

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

        //agregar el edite
        editarProyecto(proyectoEditado);

        mostrarAlerta('Project edited successfully', 'success');

    }



    return (

        <Fragment>

            <Barra 
                titulo = {"Edit project"}
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
                    <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeSelect} name="manager" value={manager}>

                        <option disabled selected>Select a manager</option>

                        {
                            managers.map(item => (

                                <option name="manager" value={item._id} >{item.nombre + " " + item.apellido}</option>

                            ))
                        }

                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Assigned to</label>
                    <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeSelect} name="asociado" value={asociado}>

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
                    <option disabled selected>Select a status</option>
                    <option value={"Enabled"}>Enabled</option>
                    <option value={"Disabled"}>Disabled</option>
                </select>


                <input type="submit" className="btn btn-danger btn-block" value="Save changes" />



                {alerta ?

                    <div className={`alert alert-${alerta.categoria}`} text-center role="alert">
                        {alerta.msg}
                    </div>

                    : null}



            </form>






        </Fragment>
    );
}

export default EditarProyecto;