import { Sex } from "src/models/business"

class CalculationUtils {

    calculateBasicMetabolicRate = (params: any) => {
      const sex = params.sex
      const genderСoefficient = sex === Sex.MALE ? 66.473 : 655.096
      const weightСoefficient = sex === Sex.MALE ? 13.752 : 9.563
      const heightСoefficient = sex === Sex.MALE ? 5.003 : 1.85
      const ageСoefficient = sex === Sex.MALE ? 6.755 : 4.679
      return parseInt((genderСoefficient 
      + (weightСoefficient * params.weight!!) 
      + (heightСoefficient * params.height) 
      - (ageСoefficient * params.age)).toFixed(0))
    }

    calculateDailyCalorieRequirement = (params: any) => {
      return parseInt((params.bmr * params.activity).toFixed(0))
    }

    //TODO заменить это на два - максимальный и минимальный и использовать их в карточке калорий вместо местных
    calculateAverageCalorieDeficit = (params: any) => {
      return parseInt((params.dcr/100 * 85).toFixed(0))
    }

    calcPercentInTotal = (part: number, total: number) => Math.round((part / total) * 100) / 100

}

export default new CalculationUtils()