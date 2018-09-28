// StoreLogic is a helper library that holds the business logic of the application

exports.hello = () => {
  console.log('hello');
};

// return only the products
exports.filterName = (_list, _name) => {

  let filtered = [];
  let products = _list.slice(0);

  products.map( (p) =>{
    if (p.DesignerName==_name) {
      filtered.push(p);
    }
  })

  return filtered;

};

exports.filterPrice = (_list, _minPrice, _maxPrice) => {

  if (_minPrice>_maxPrice) {
    throw new RangeError('minPrice should be lower than maxPrice');
  }

  let filtered = [];
  let products = _list.slice(0);

  products.map( (p) =>{
    if (p.SchemaPrice>=_minPrice) {
      if (_maxPrice!==undefined){
        if (p.SchemaPrice<=_maxPrice) {
          filtered.push(p);
        }
      } else {
        filtered.push(p);
      }
      
    }
  })

  return filtered;
};