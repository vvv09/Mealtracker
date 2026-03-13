import { Food } from 'src/models/business'

class FoodCalculationUtils {

    calculatePortionCalories = (food: Food) => {
      return this.calc(food, food.productCalories)
    }

    calculatePortionProtein = (food: Food) => {
      return this.calc(food, food.productProtein)
    }

    calculatePortionFiber = (food: Food) => {
      return this.calc(food, food.productFiber)
    }

    private calc = (food: Food, productParam: number) => {
      return this.roundToOneDecimal(productParam/100 * food.portion)
    }
    
    private roundToOneDecimal = (num: number): number => parseFloat(num.toFixed(2))

}

export default new FoodCalculationUtils()