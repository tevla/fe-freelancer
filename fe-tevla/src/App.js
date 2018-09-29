import React, { Component } from 'react';
import ProductCard from './components/ProductCard';

import './App.css';

const ROOT_URL = 'https://www.farfetch.com';

var StoreLogic  = require('./components/StoreLogic');

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      designerName: 'Gucci',
      minPrice: 500,
      maxPrice: 2000,
      products:[]
    }

    fetch('../items.json')
    .then( (response) => {
        return response.json()
    })
    .then( (json) => {
      // retrieve the filters
      let filters = json.Filters.List.find((f) => {
        return f.Type==='designer'
      })

      this.setState({
          designers: filters.Values,
          products: json.Products.List
      })
    });  

    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.onDesignerNameChange = this.onDesignerNameChange.bind(this);
  }

  handlePriceChange = (e) => {
    switch(e.target.name){
      case 'minPrice':
        this.setState({
          minPrice: e.target.value
        })
      break;
      case 'maxPrice':
        this.setState({
          maxPrice: e.target.value
        })
      break;  
      default:;    
    }
  }

  onDesignerNameChange = (e) => {
    this.setState({designerName: e.target.value});
  }

  render() {

    // retrieve every designer available
    let designers = this.state.designers;

    let options = [];

    if (designers){
      for (let d of designers) {
        options.push(
          <option key={d.Value} value={d.Name}>{d.Name}</option>
        )
      }      
    }


    let productsGucci = StoreLogic.filterName(this.state.products, this.state.designerName);
    let rangeProducts = StoreLogic.filterPrice(productsGucci, this.state.minPrice, this.state.maxPrice);

    let displayProducts = [];

    // if there are no products for the designer, show a message
    if (rangeProducts.length) {
      for (let p of rangeProducts){
        displayProducts.push(
          <ProductCard 
            id={p.Index} 
            key={p.Index} 
            href={ROOT_URL + p.ProductUrl}
            designer={p.DesignerName} 
            description={p.Description} 
            displayPrice={p.PriceDisplay} 
            schemaPrice={p.SchemaPrice} 
            image={p.ImageMain} 
            imageHover={p.ImageHover}
            />
        )
      }
    } else {
      displayProducts.push(
        <div key={1} className='col-md-3 product'>No products available</div>
      );
    }





    return (
      <div className="App">
        <div className='container'>
          <div className='search'>
            <select className='product__select' onChange={this.onDesignerNameChange} value={this.state.designerName}>
              {options}
            </select>
            <input name='minPrice' type="number" value={this.state.minPrice} onChange={this.handlePriceChange}/>
            <input name='maxPrice' type="number" value={this.state.maxPrice} onChange={this.handlePriceChange}/>
          </div>
          <div className='row'>
            {displayProducts}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
