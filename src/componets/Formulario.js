import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Error from './Error';

const Formulario = ({ setBusqueda }) => {
	const [termino, setTermino] = useState('');
	const [error, setError] = useState(false);

	const buscarImagenes = e => {
		e.preventDefault();

		// Validar
		if (termino.trim() === '') {
			setError(true);
			return;
		}

		// Enviar el termino de busqueda hacia el componente principal
		setBusqueda(termino);
		setError(false);
	};

	return (
		<form onSubmit={buscarImagenes}>
			<div className='row'>
				<div className='form-group col-md-8'>
					<input
						type='text'
						className='form-control form-control-lg'
						placeholder='Buscar una imágen, ejemplo: futbol o café'
						onChange={e => setTermino(e.target.value)}
					/>
				</div>

				<div className='form-group col-md-4'>
					<button
						type='submit'
						className='btn btn-lg btn-danger btn-block'>
						Buscar
					</button>
				</div>
			</div>
			{error ? <Error msg='Agrega un término de búsqueda' /> : null}
		</form>
	);
};

Formulario.propTypes = {
	setBusqueda: PropTypes.func.isRequired,
};

export default Formulario;
