import React, { useReducer } from 'react';

import agendaContext from './agendaContext';
import agendaReducer from './agendaReducer';
import clienteAxios from '../../config/axios';

import {
    OBTENER_PROYECTOS,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    AGREGAR_PROYECTO,
    EDITAR_PROYECTO,
    MOSTRAR_FORMULARIO,
    OBTENER_MANAGERS,
    OBTENER_ASIGNADOS,
    PAGINA_ACTUAL,
}from '../../types';

const AgendaState = props => {

    const initialState = {
        proyectos: [],
        proyectoSeleccionado: null,
        formulario: false,
        managers: [],
        asignados: [],
        cantidadPaginas: null,
        paginaActual: 1,
        asignadoActual: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(agendaReducer, initialState);

    //Mostrar todos los proyectos
    const mostrarProyectos = async () => {

        try{
            const resultado = await clienteAxios.get(`/api/proyectos/`);
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyecto
            })
        }catch(error){
            console.log('Ocurrio un error');
        }
    }

    //Mostrar proyectos por pagina

    const obtenerProyectosPorPagina = async () => {
        try {
            const resultado = await clienteAxios.get(`/api/proyectos/page/${state.paginaActual}`);
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data
            })
        } catch (error) {
            console.log("Error al traer los proyectos");
        }
    }


    const proyectoActual = proyecto => {

            dispatch({
                type: PROYECTO_ACTUAL,
                payload: proyecto
            })
    }

    const eliminarProyecto = async proyectoId => {

        try{
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        }catch(error){
            console.log('Error al eliminar un proyecto');
        }
    }

    const agregarProyecto = async proyecto => {
        try{
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            
            //Inserto el proyecto al state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data.proyecto
                
            })
        }catch(error){
            console.log('Error al agregar el proyecto');
        }
    }

    const editarProyecto = async proyecto => {
        try{
            await clienteAxios.put(`/api/proyectos/${proyecto._id}`, proyecto);
            dispatch({
                type: EDITAR_PROYECTO,
                payload: proyecto
            })
        }catch(error){
            console.log('Error al editar el proyecto');
        }
    }

    const mostrarFormulario = valor =>{
        dispatch({
            type: MOSTRAR_FORMULARIO,
            payload: valor
        })
    }


    const consultarManagers = async () => {

        try{
            const resultado = await clienteAxios.get('/api/managers');
            dispatch({
                type: OBTENER_MANAGERS,
                payload: resultado.data.manager
            })
        }catch(error){
            console.log('Ocurrio un error');
        }
    }

    const consultarAsignados = async () => {

        
        try{
            const resultado = await clienteAxios.get('/api/asignados');
            dispatch({
                type: OBTENER_ASIGNADOS,
                payload: resultado.data.asignado
            })
        }catch(error){
            console.log('Ocurrio un error');
        }
    }
 
    //modificar la paginaActual
    const changePaginaActual = async (numero) => {
        try {
            dispatch({
                type: PAGINA_ACTUAL,
                payload: numero
            })
        } catch (error) {
            console.log("Error al cambiar de página");
        }
    }

    const asociadoPorId = id => {
        
        const arreglo = state.asignados.filter(asignado => asignado._id === id)[0];

        return arreglo;
    }

    const managerPorId = id => {
        
        const arreglo = state.managers.filter(manager => manager._id === id)[0];

        return arreglo;
    }

    return (
        <agendaContext.Provider
            value={{
                proyectos: state.proyectos,
                proyectoSeleccionado: state.proyectoSeleccionado,
                formulario: state.formulario,
                managers: state.managers,
                asignados: state.asignados,
                cantidadPaginas: state.cantidadPaginas,
                paginaActual: state.paginaActual,
                mostrarProyectos,
                proyectoActual,
                eliminarProyecto,
                agregarProyecto,
                editarProyecto,
                mostrarFormulario,
                consultarManagers,
                consultarAsignados,
                changePaginaActual,
                obtenerProyectosPorPagina,
                asociadoPorId,
                managerPorId
            }}
        >
            {props.children}
        </agendaContext.Provider>
    )

}

export default AgendaState;