import React, { useEffect, useState } from 'react';

import Formulario from './componets/Formulario';
import ListadoImagenes from './componets/ListadoImagenes';

function App() {
	// State de la app
	const [busqueda, setBusqueda] = useState('');
	const [imagenes, setImagenes] = useState([]);
	const [paginaActual, setPaginaActual] = useState(1);
	const [totalPaginas, setTotalPaginas] = useState(1);

	useEffect(() => {
		const consultarAPI = async () => {
			if (busqueda === '') return;

			const imagenesPorPagina = 30;
			const key = '15437645-6a079f5f0874b4c74c2fb0359';
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			setImagenes(resultado.hits);

			// Calcular el total de páginas
			const calcularTotalPaginas = Math.ceil(
				resultado.totalHits / imagenesPorPagina,
			);
			setTotalPaginas(calcularTotalPaginas);

			// Mover la pantalla hacia arriba
			const jumbotron = document.querySelector('.jumbotron');
			jumbotron.scrollIntoView({ behavior: 'smooth' });
		};
		consultarAPI();
	}, [busqueda, paginaActual]);

	// Definir la página anterior
	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaActual - 1;

		if (nuevaPaginaActual === 0) return;

		setPaginaActual(nuevaPaginaActual);
	};

	// Definir la página siguiente
	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaActual + 1;

		if (nuevaPaginaActual > totalPaginas) return;

		setPaginaActual(nuevaPaginaActual);
	};

	// const btnDisabled = paginaActual === totalPaginas ? 'true' : 'false';

	return (
		<div className='container'>
			<div className='jumbotron'>
				<p className='lead text-center'>Buscador de Imágenes</p>
				<Formulario setBusqueda={setBusqueda} />
			</div>
			<div className='row justify-content-center'>
				<ListadoImagenes imagenes={imagenes} />
				<button
					type='button'
					className='btn btn-info mr-1'
					onClick={paginaAnterior}
					disabled={paginaActual === 1}>
					&laquo; Anterior
				</button>
				<button
					type='button'
					className='btn btn-info'
					onClick={paginaSiguiente}
					disabled={paginaActual === totalPaginas}>
					Siguiente &raquo;
				</button>
			</div>
		</div>
	);
}

export default App;
