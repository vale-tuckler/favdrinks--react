import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';


export const ModalContext =  createContext();

//Crear el contexts
const ModalProvider = (props) => {

    //state del provider
    //Guardando el ID al que el usuario le de click
    const [idreceta, guardarIDReceta] = useState(null);
    const [inforeceta, guardarReceta] = useState({});

    //una vez que tenemos una receta, llamar la API
    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idreceta) return;

            const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resultado = await axios.get(URL);
            // console.log(resultado.data.drinks[0]);
            guardarReceta(resultado.data.drinks[0]);
        }
        
        obtenerReceta();
    }, [idreceta]);

    return(
        <ModalContext.Provider
        value = {{
            inforeceta,
            guardarIDReceta,
            guardarReceta
        }}
        >
            {props.children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;