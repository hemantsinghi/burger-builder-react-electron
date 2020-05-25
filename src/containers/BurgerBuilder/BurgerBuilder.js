import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients =  {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = parseFloat((this.state.totalPrice + INGREDIENT_PRICES[type]).toFixed(3));
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount > 0) {
      const updatedCount = this.state.ingredients[type] - 1;
      const updatedIngredients =  {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const newPrice = (this.state.totalPrice - INGREDIENT_PRICES[type]);
      this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          disabled = {disabledInfo}
          ingredientRemoved = {this.removeIngredientHandler}
          ingredientAdded = {this.addIngredientHandler}
          price = {this.state.totalPrice}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;