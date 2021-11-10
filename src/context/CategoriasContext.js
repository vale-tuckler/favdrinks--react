import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//CREANDO CONTEXT
export const CategoriasContext = createContext(); //Referencia al contexts


//CREANDO EL PROVIDER: Donde se encuentran las funciones y state. En general, se recomienda
//crear archivos separados para el Context y el Provider.
const CategoriasProvider = (props) => {
    
    //CREANDO EL STATE DEL CONTEXT
    const [categorias, guardarCategorias] = useState([]);

    //EJECUTAR EL LLAMADO A LA API 
    useEffect(()=>{
        const obtenerCategorias = async () =>{
            
            /* MY CODE */                
            const URL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";                            
                const misCategorias = await axios.get(URL);
                guardarCategorias(misCategorias.data.drinks); 
        }
        obtenerCategorias();
    },[]);

    return(                
        <CategoriasContext.Provider
            value={{
              categorias
            }}
        >
            {props.children} {/*Los diferentes componentes estarán dentro de "props.children"*/}
        </CategoriasContext.Provider>
    );

};

export default CategoriasProvider;