import React from 'react';
import ReactDOM from 'react-dom';

import Snub from './snub.json';

var assert = require('chai').assert;
var expect = require('chai').expect;

var StoreLogic  = require('../components/StoreLogic');

describe('Store Logic', () => {

	it('Snub.filterName returns an array', () => {
		let result = StoreLogic.filterName(Snub.Products.List, 'Gucci');
		assert.typeOf(result, 'array');
	});	

	it('returns only 1 result for DesignerName Gucci [1 result expected]', () => {
		let result = StoreLogic.filterName(Snub.Products.List, 'Gucci');
		assert.lengthOf(result, 1);
	});

	it('Snub.filterPrice returns an array', () => {
		let result = StoreLogic.filterPrice(Snub.Products.List, 500, 2000);
		assert.typeOf(result, 'array');
	});		

	it('filterPrice can have a minPrice only [3 results expected]', () => {
		let result = StoreLogic.filterPrice(Snub.Products.List, 500);
		assert.lengthOf(result, 3);
	});	

	it('filterPrice minPrice is always lesser than maxPrice [array should be empty]', () => {
		let result = StoreLogic.filterPrice(Snub.Products.List, 1500, 500);
		assert.lengthOf(result, 0);
	});		

	it('returns only 2 products where price is between 500 and 2000 [2 results expected]', () => {
		let result = StoreLogic.filterPrice(Snub.Products.List, 500, 2000);
		assert.lengthOf(result, 2);
	});

});