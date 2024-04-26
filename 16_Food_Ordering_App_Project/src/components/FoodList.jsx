import useHttp from "../hooks/useHttp";
import FoodItem from "./FoodItem";
import Error from "./Error";

const requestConfig = {};

export default function FoodList() {

    const { data: fetchedMeals, isLoading, error } = useHttp("http://localhost:3000/meals", requestConfig, []);

    console.log(fetchedMeals);

    if (isLoading) {
        return <p className="center">Loading meals...</p>
    }

    if (error) {
        return <Error
            title="Failed to fetch meals"
            message={error}
        />
    }
    return (
        <>
            <main id="meals">
                {fetchedMeals.map((meal) => {
                    return (
                        <FoodItem
                            key={meal.id}
                            id={meal.id}
                            name={meal.name}
                            price={meal.price}
                            description={meal.description}
                            image={meal.image}
                            meal={meal}
                        />
                    )
                })}
            </main>
        </>
    )
}