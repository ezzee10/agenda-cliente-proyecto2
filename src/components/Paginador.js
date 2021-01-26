import React, { useContext, Fragment } from 'react';
import agendaContext from '../context/agenda/agendaContext';
import ReactPaginate from 'react-paginate';

const Paginador = () => {

    //Extraigo los proyectos del state inicial
    const AgendaContext = useContext(agendaContext);
    const { cantidadPaginas, changePaginaActual, proyectos } = AgendaContext;


    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        changePaginaActual(selectedPage);
    };

    return (
        <Fragment>
            {proyectos.length !== 0 ?
                <div className="d-flex">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={cantidadPaginas}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </div>
                : null}
        </Fragment>
    );
}

export default Paginador;