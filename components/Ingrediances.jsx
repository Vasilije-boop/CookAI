import { useState } from "react";
import Recipe from "./Recipe.jsx"
import { getRecipeFromMistral } from "../src/ai.js";

export default function Ingrediances(){

    const [list, setList] = useState([]);
    const[recipe, setRecipe] = useState("");

    const ingredientsListItems = list.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient");

        if(newIngredient != "")
            setList(i => [...i,newIngredient])
    }

    async function callAPI(){
        console.log("Clicked!");
        const recipeIdea = await getRecipeFromMistral(list);
        console.log("Waiting finished");
        await setRecipe(recipeIdea);  
        console.log("Recipe from API:", recipe);
    }

    return(
        <>
            <main>
                <h1>Add your Ingrediances to get a recipe</h1>
                <form action={addIngredient}>
                    <input 
                        name="ingredient"
                        type="text"
                        placeholder="e.g. Oregano"
                        aria-label="Add ingredient"
                    />
                    <button>+ Add ingredient</button>
                </form>
            {
                list.length > 0 &&
                <div id="lista-div">
                    <h1>Ingredients on Hand:</h1>
                    <ul>
                        {ingredientsListItems}
                    </ul>
                </div>
            }
            {
                list.length > 1 &&
                <div id="get-recipe">
                    <div id="text-area">
                        <h2>Ready for a recipe?</h2>
                        <p>Generate a recipe from your list of Ingrediances!</p>
                    </div>
                    <button onClick={callAPI}>Get a Recipe!</button>
                </div>
            }
                <Recipe recipeIdea={recipe} />     
            </main>
        </>
    )
}