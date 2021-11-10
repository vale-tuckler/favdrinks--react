import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre:'',
        categoria:''
    });

    const [ consultar, guardarConsultar] = useState(false);
    const {nombre, categoria} = busqueda; //destructuring

    useEffect(() => {

        if(consultar){ //si consultar === true
            const obtenerRecetas = async () => {
                const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                
                const resultado = await axios.get(URL);
                //console.log(resultado.data.drinks); Verifica si la información está llegando desde el endpoint.
                guardarRecetas(resultado.data.drinks);
            }

            obtenerRecetas();
        }        
    }, [busqueda]); //la dependencia se llama "busqueda". Es decir, el código se ejecutará cuando la variable
    //que se rastrea cambie

    return(
        <RecetasContext.Provider
            value = {{
                recetas,
                buscarRecetas, 
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
};

export default RecetasProvider;