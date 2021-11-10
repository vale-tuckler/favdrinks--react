import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import CategoriasProvider from './context/CategoriasContext';//Se tiene que importar el nombre del provider
//no del context

import RecetasProvider from './context/RecetasContext'; //Se tiene que importar el nombre del provider
//no del context

import ModalProvider from './context/ModalContext';
import ListaRecetas from './components/ListaRecetas';

function App() {
  return (    
    <CategoriasProvider>
      <RecetasProvider> 
        <ModalProvider>
            <Header />
            <div className="container mt-5">
              <div className="row"> 
                  <Formulario />
              </div>

              <ListaRecetas />
            </div>         
          </ModalProvider>      
        </RecetasProvider>
    </CategoriasProvider>        
  );
}

export default App;
