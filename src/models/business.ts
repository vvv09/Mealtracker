import type { UUID, DATE, TIME } from './common'

// profile

export enum Sex {
    MALE = 'Male',
    FEMALE = 'Female'
}

export enum Activity {
    K_1 = 1.2, // Минимальные нагрузки (сидячая работа)
    K_2 = 1.375, // Небольшая дневная активность, легкие тренировки 1-3 раза в неделю
    K_3 = 1.4625, // Работа средней тяжести или тренировки 3-5 раз в неделю
    K_4 = 1.55, // Повышенная активность: интенсивные нагрузки или занятия 4-5 раз в неделю	
    K_5 = 1.6375, // Высокая активность: ежедневные тренировки
    K_6 = 1.725, // Очень высокая активность: ежедневные интенсивные тренировки или тренировки 2 раза в день
    K_7 = 1.9, // Тяжелая физическая работа или интенсивные тренировки 2 раза в день
}

// weight

export interface WeightMeasurement {
    date: DATE,
    weight: number | null,
}

// food & meal

// product - еда как она лежит в магазине, в холодильнике. Или же рецепт конкретного блюда, например "борщ" или "салат"
// food - строится на основе данных съеденного product и посути представляет этот продукт но уже фактически съеденный, у него есть exactPortion вместо portion ???
// meal - прием пищи, например завтрак, в рамках которого съедается определенный набор продуктов в определенном количестве

export interface ProductForm { //TODO rename to ProductForm
    name: string,
    calories: number | null, // in 100 g
    protein: number | null,  // in 100 g
    fiber: number | null,  // in 100 g
    rate: number,  // if it is halthy or not for exact user
    portion: number, // in grams (напримаер для палена Коровки тут будет 400г)
} 

export interface Product extends ProductForm {
    id: UUID
}

export interface FoodForm {
    name: string;
    productId: UUID | null;
    productCalories: number | null;
    productProtein: number | null;
    productFiber: number | null;
    productPack: number | null;
    productRate: number;
    portion: number;
}

export class Food implements FoodForm {
    id: UUID;
    name: string;
    productId: UUID | null;
    productCalories: number | null;
    productProtein: number | null;
    productFiber: number | null;
    productPack: number | null;
    productRate: number;
    portion: number;

    constructor(
        id: UUID,
        name: string,
        productId: UUID | null,
        productCalories: number | null,
        productProtein: number | null,
        productFiber: number | null,
        productPack: number | null,
        productRate: number = 0,  // Добавлен параметр с дефолтом как пример
        portion: number,
    ) {
        this.id = id;
        this.name = name;
        this.productId = productId;
        this.productCalories = productCalories;
        this.productProtein = productProtein;
        this.productFiber = productFiber;
        this.productPack = productPack;
        this.productRate = productRate;
        this.portion = portion;
    }

    static create(id: UUID, foodForm: FoodForm): Food {
        return new Food(
            id,                                    // id: id,
            foodForm.name,                         // name: foodForm.name,
            foodForm.productId,                    // productId: foodForm.productId,
            foodForm.productCalories,              // productCalories: foodForm.productCalories,
            foodForm.productProtein,               // productProtein: foodForm.productProtein,
            foodForm.productFiber,                 // productFiber: foodForm.productFiber,
            foodForm.productPack,                  // productPack: foodForm.productPack,
            foodForm.productRate,                  // rate: foodForm.productRate,
            foodForm.portion,                      // portion: foodForm.portion,
        );
    }
}


export enum MealReason {
    HUNGER = 'hunger',
    APPETITE = 'appetite',
}

export enum MealType {
    CLEAN = 'cleanMeal',
    CHEAT = 'cheatMeal',
}

export interface MealForm {
    date: DATE,
    time: TIME,
    comment: string | null,
    reason: MealReason,
    type: MealType,
    foods: Food[],
}

export interface Meal extends MealForm{
    id: UUID,
}

export interface ProductNurishmentCount {
    productId: UUID,
    productName: string,
    count: number // количество потреблений этого продукта
    percent: number // процент потреблений этого продукта от общего количества потреблений
}

export interface Report {
    id: UUID,
    startDate: DATE, // текущее значение "дата начала ведения дневника" из профайла на момент создания отчета
    endDate: DATE, // текущее значение CurentDate на момент создания отчета
    numberOfDays: number // количество дней в отчете. По идее лучше получать из дат для консистентности, но поскольку обновлять все эти поля не планируется, то норм
    rate: number, // средний рейтинг за период
    averageCalories: number, // среднее количество калорий в день за период
    averageCheatMealCalories: number, // среднее количество калорий полученных от clean в день за период
    averageCleanMealCalories: number, // среднее количество калорий полученных от cheat в день за период
    averageProtein: number, // среднее количество белков в день за период
    averageFiber: number, // среднее количество клечатки в день за период
    averageMeals: number, // среднее количество приемов пищи в день за период
    mealsRatio: number, // отношение clean к cheat
    caloriesLimit: number, // лимит калорий установленный для периода - текущее значение из профайла на момент создания отчета
    cheatMeals: number, // количество cheat за период
    cleanMeals: number, // количество clean cheat за период
    //вес - в перспективе нужно хранить в отчетах вес начала и вес конца, для этого ввести измерение веса. пока что можно просто писать в комментах
    comment: string | null,
    nurishment: ProductNurishmentCount[],
    grade: number, // оценка за период 1-5
}


