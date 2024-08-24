import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
};

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)
    

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.find(stateActivity => stateActivity.id === state.activeId);
            if (selectedActivity) {
                setActivity(selectedActivity);
            }
        } 
    }, [state.activeId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
    
        setActivity({
          ...activity,
          [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
      }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(activity);
        console.log(state.activities);
        
        
        
    
        dispatch({type: 'save-activity', payload: {newActivity: activity}}) 
        setActivity({
          ...initialState,
          id: uuidv4()
        })
      }

    const isFormValid = () => {
        const { name, calories } = activity;
        return name.trim() !== "" && calories > 0;
    };

    return (
        <section className="bg-white py-12 md:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="bg-gray-100 p-6 md:p-8 lg:p-10 rounded-lg shadow-lg">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6">
                        AÑADIR ACTIVIDAD
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="category" className="block text-3xl font-bold text-gray-700">
                                Categoría:
                            </label>
                            <select
                                id="category"
                                name="type"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-2xl"
                                value={activity.category}
                                onChange={handleChange}
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-3xl font-bold text-gray-700">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-2xl"
                                placeholder="Nombre de la comida o ejercicio"
                                value={activity.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="calories" className="block text-3xl font-bold text-gray-700">
                                Calorías
                            </label>
                            <input
                                type="number"
                                id="calories"
                                name="calories"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-2xl"
                                placeholder="Cantidad de calorías Ej. 300 o 500"
                                value={activity.calories}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={!isFormValid()}
                                className={`w-full inline-flex justify-center py-4 px-8 border border-transparent shadow-sm text-xl font-medium rounded-md text-white ${
                                    isFormValid()
                                        ? activity.category === 1
                                            ? "bg-orange-600 hover:bg-orange-700"
                                            : "bg-green-600 hover:bg-green-700"
                                        : activity.category === 1
                                            ? "bg-orange-600 opacity-50 cursor-not-allowed"
                                            : "bg-green-600 opacity-50 cursor-not-allowed"
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                            >
                                {activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
