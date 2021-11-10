import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext'; //Se abren llaves cuando no es 
//el 'default export' el que se importa.

import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {
   
    const [busqueda, guardarBusqueda] = useState({
        nombre:'',
        categoria:'',

    });
    const { categorias } = useContext(CategoriasContext);
    const {buscarRecetas, guardarConsultar} = useContext(RecetasContext);
    
    //Asignarle una funcion para leer los contenidos
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    return(
        <form 
            className="col-md-12"
            onSubmit = {
                e => {
                    e.preventDefault();
                    buscarRecetas(busqueda)
                    guardarConsultar(true);
                }
            } 
        >
            <fieldset className="text-center">
                <legend>
                    ¡Ingresa una categoría o ingrediente para hallar tu bebida favorita!
                </legend>
            </fieldset>

            <div className="row">
                <div className="col-md-4">
                    <input
                        name="nombre" /*nombre del ingrediente */
                        className="form-control"
                        type="text"
                        placeholder ="¿Qué ingrediente tienes en mente?"
                        onChange={obtenerDatosReceta}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">                            
                            Selecciona una categoría
                        </option> 
                        {categorias.map(c => (                                                            
                                    <option 
                                        key={c.strCategory}
                                        value={c.strCategory}                                        
                                    > 
                                        {c.strCategory}
                                    </option>              
                        ))}                                                          
                    </select>
                </div>

                <div className="col-md-4"> 
                    <input 
                        type="submit"
                        className="btn btn-block btn-outline-dark"
                        value="¡Busca tu bebida!"
                    />
                </div>            
            </div>
        </form>
    );    
};

export default Formulario;

