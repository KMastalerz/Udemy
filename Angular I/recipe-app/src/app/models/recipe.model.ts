import { IngredientModel } from "./ingredient.model";

export class RecipeModel {
    public name: string;
    public description: string;
    public imageUrl: string;
    public ingredients: IngredientModel[];

    constructor(name: string, desc: string, imageUrl: string) {
        this.name = name;
        this.description = desc;
        this.imageUrl = imageUrl;
    }
}