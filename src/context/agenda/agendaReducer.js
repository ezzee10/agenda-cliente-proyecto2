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
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload.proyectos,
                paginaActual: action.payload.current,
                cantidadPaginas: action.payload.pages
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyectoSeleccionado: action.payload
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyectoSeleccionado: null
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload]
            }
        case EDITAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.map(proyecto => proyecto._id === action.payload._id ? action.payload : proyecto),
                
            }
        case MOSTRAR_FORMULARIO:
            return {
                ...state,
                formulario: action.payload
            }
        case OBTENER_MANAGERS:
            return {
                ...state,
                managers: action.payload
            }
        case OBTENER_ASIGNADOS:
            return {
                ...state,
                asignados: action.payload
            }
        case PAGINA_ACTUAL:
            return {
                ...state,
                paginaActual: action.payload
            }
        default:
            return state;
    }
}
