import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {

	constructor (props) {
		super(props);

		this.state = {
			image: this.props.image
		}

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
	}

	onMouseOver(e) {
		this.setState({
			image: this.props.imageHover
		})
	}

	onMouseOut(e) {
		this.setState({
			image: this.props.image
		})
	}	

	render() {

		return (
			<div className='col-md-3 product'>
				<div className='product__card'>
				  <span className='product__designer'>{this.props.designer}</span>
				  <br />
				  <span className='product__price'>{this.props.displayPrice}</span>
				  <div className='product__image' onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}><img src={this.state.image}/></div>
				  <div className='product__description'>{this.props.description}</div>
				</div>
			</div>
		);
	}
}

ProductCard.propTypes = {
	designer: PropTypes.string,
	displayPrice: PropTypes.string,
	schemaPrice: PropTypes.number,
	image: PropTypes.string,
	imageHover: PropTypes.string,
	description: PropTypes.string
};

export default ProductCard;
