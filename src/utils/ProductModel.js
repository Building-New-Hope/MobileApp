class Product {
  constructor(name, size, grind, price) {
    this.name = name;
    this.id = name + size + grind; // i have it inside the React component so it has access to the state variables
    this.size = size; // could have just passed them too for less clustered code
    this.grind = grind;
    this.quantity = 1;
    this.price = price;
  }

  increment() {
    this.quantity++;
  }
}

export default Product;
