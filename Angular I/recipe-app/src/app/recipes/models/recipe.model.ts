import { IngredientModel } from "../../shared/models/ingredient.model";

export class RecipeModel {
    // public id: number;
    public name: string;
    public description: string;
    public imageUrl: string;
    public ingredients: IngredientModel[];

    constructor(name: string, desc: string, imageUrl: string, ingredients: IngredientModel[]) {
        // this.id = id;
        this.name = name;
        this.description = desc;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
    }
}