import React, { Component } from 'react';
import ProductCard from './components/ProductCard';

import './App.css';

var StoreLogic  = require('./components/StoreLogic');

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      products:[]
    }

    fetch('https://raw.githubusercontent.com/tevla/fe-freelancer/develop/items.json')
    .then( (response) => {
        return response.json()
    })
    .then( (json) => {
        this.setState({
            products: json.Products.List
        })
    });    
  }

  render() {

    let productsGucci = StoreLogic.filterName(this.state.products, 'Gucci');
    let rangeProducts = StoreLogic.filterPrice(productsGucci, 500, 2000);

    let displayProducts = [];

  // designer: PropTypes.string,
  // price: PropTypes.number,
  // schemaPrice: PropTypes.string,
  // image: PropTypes.string,
  // description: PropTypes.string    

    rangeProducts.map((p) => {
      displayProducts.push(
        <ProductCard 
          key={p.Index} 
          designer={p.DesignerName} 
          description={p.Description} 
          displayPrice={p.PriceDisplay} 
          schemaPrice={p.SchemaPrice} 
          image={p.ImageMain} 
          imageHover={p.ImageHover}
          />
      )
    })

    return (
      <div className="App">
        <div className='container'>
          <div className='row'>
            {displayProducts}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
