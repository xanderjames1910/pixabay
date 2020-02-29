import React from 'react';
import PropTypes from 'prop-types';

const Imagen = ({ imagen }) => {
	// Extraer las variables
	const { largeImageURL, likes, previewURL, tags, views } = imagen;
	return (
		<div className='col-12 col-sm-6 col md-4 col-lg-3 mb-4'>
			<div className='card'>
				<img src={previewURL} alt={tags} className='card-img-top' />
				<div className='card-body'>
					<p className='cart-text'>{likes} Me gusta</p>
					<p className='cart-text'>{views} Visualizaciones</p>
				</div>
				<div className='card-footer'>
					<a
						href={largeImageURL}
						target='_blank'
						rel='noopener noreferrer'
						className='btn btn-primary btn-block text-white'>
						Ver Imagen
					</a>
				</div>
			</div>
		</div>
	);
};

Imagen.propTypes = {
	imagen: PropTypes.object.isRequired,
};

export default Imagen;
