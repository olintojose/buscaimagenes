import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';



function App() {

  // State de la app

  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaActual, guardarPaginaActual ] = useState(1);

const [ totalPaginas, guardarTotalPaginas ] = useState(1);
  

useEffect(() => {
  const consultarApi = async() => {
    if (busqueda==='') return;

    const imagenesPorPagina= 28;
    const key =  '15415977-61d338d1a8b7e488207dd4b87'
    const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarImagenes(resultado.hits);
    //Calcular el total de paginas

    const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
    
    guardarTotalPaginas(calcularTotalPaginas);

    //Mover la pagina hacia arriba
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView( { behavior: 'smooth' })
  }

  consultarApi();

}, [busqueda, paginaActual])

// Definir la pagina anterior

  const paginaAnterior = () => {

    
    const nuevaPaginaActual = paginaActual - 1;


    if (nuevaPaginaActual === 0 ) return ;
    guardarPaginaActual(nuevaPaginaActual);

  }

  //DEfinir la pagina Siguiente


  const paginaSiguiente = () => {

    
    const nuevaPaginaActual = paginaActual + 1;
    console.log(nuevaPaginaActual);

    if (nuevaPaginaActual > totalPaginas ) return ;
    guardarPaginaActual(nuevaPaginaActual);

  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className= "lead text-center">Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className = "row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

       { (paginaActual===1)? null : (
          <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaAnterior}
        >&laquo; Anterior </button>
       )}

        { (paginaActual=== totalPaginas ? null : (
          
<button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaSiguiente}
        > Siguiente &raquo; </button>
        ))}
      </div>

    </div>
  );
}

export default App;
