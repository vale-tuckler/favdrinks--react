import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Receta = ({receta}) => {
    
    //Configurando el modal
    const [open, setOpen] = React.useState(false);
          const handleOpen = () => setOpen(true);
          const handleClose = () => setOpen(false);         
          
          //Extrayendo los valores del context
    const {inforeceta, guardarIDReceta, guardarReceta} = useContext(ModalContext);   
    //console.log(inforeceta);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height:'90vh',
        overflow:'scroll',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };        

      //Muestra y formatea los ingredientes
      const muestraIngredientes = informacion => {
        let ingredientes  = [];
        for(let i = 0; i < 16; i++){
            if(informacion[`strIngredient${i}`]){ //Si el ingrediente no es 'null' entonces ejecutar
                ingredientes.push(
                    <li>
                        { informacion[`strIngredient${i}`] }
                        { informacion[`strMeasure${i}`] }
                    </li>
                );
            }
        }

        return ingredientes;
      };


    return(
       <div className="col-md-4 mb-3">
           <div className = "card">
               <h2 className="card-header">{receta.strDrink}</h2>

               <img 
                    className="img-top" 
                    src={receta.strDrinkThumb}
                    alt = {`Imagen de ${receta.strDrink}`}
               />

               <div className="card-body">
                   <button
                        type="button"
                        className="btn btn-block btn-info"
                        onClick={() => {
                            guardarIDReceta(receta.idDrink);
                            handleOpen();
                        }}
                   >
                       Ver receta
                    </button>
                    <Modal
                        open={open}
                        onClose = { () => {
                            guardarIDReceta(null); //Esto regresa la variable "idreceta" a null.           
                            guardarReceta({}); //Esto regresa la variable "inforeceta" a su estado original.
                             handleClose();
                        }}
                        aria-labelledby = "modal-modal-title"
                        aria-describedby = "modal-modal-description"
                    >       
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-title"
                                variant="h4"
                                component="h2"                             
                            >
                               {receta.strDrink}
                            </Typography>
                            <Typography
                                id="modal-modal-description"
                                variant="h6"
                                component="h2"
                                sx={{ mt:2 }}
                            >
                                <h3>Instrucciones de preparacion</h3>
                                <p>{inforeceta.strInstructions}</p>                                                                    
                                <img 
                                    src={inforeceta.strDrinkThumb} 
                                    alt={`Imagen de ${receta.strDrink}`} 
                                    className="img-fluid my-4"
                                />
                                <h3>Ingredientes y cantidades</h3>                       
                                <ul>
                                    {muestraIngredientes(inforeceta)}
                                </ul>
                            </Typography>                                                        
                        </Box>
                    </Modal>
               </div>
           </div>
        </div>  
    );
};

export default Receta;