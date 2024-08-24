import React, { useMemo } from 'react';
import { Activity } from '../types';

interface CalorieCounterProps {
  activities: Activity[];
}

const CalorieCounter: React.FC<CalorieCounterProps> = ({ activities }) => {
  const totalCalories = useMemo(() => {
    
    return activities.reduce(
    
      (totals, activity) => {
        if (activity.category === 1) {
          // Comida
          totals.foodCalories += activity.calories;
        } else {
          // Ejercicio
          totals.exerciseCalories += activity.calories;
        }
        return totals;
      },
      { foodCalories: 0, exerciseCalories: 0 }
    );
  }, [activities]);

  const netCalories = totalCalories.foodCalories - totalCalories.exerciseCalories;

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 lg:p-10 rounded-xl shadow-lg flex flex-col justify-center items-center mb-8 space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6">Resumen de Calorías</h1>
        <div className="flex flex-col md:flex-row justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 bg-orange-300 rounded-lg p-4 md:p-6 lg:p-8 shadow-md text-center">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 mb-2">Consumidas</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-900">{totalCalories.foodCalories}</p>
            </div>
            <div className="flex-1 bg-green-300 rounded-lg p-4 md:p-6 lg:p-8 shadow-md text-center">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-800 mb-2">Ejercicios</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-900">{totalCalories.exerciseCalories}</p>
            </div>
        </div>
        <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 shadow-lg w-full text-center border border-gray-300">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Calorías Totales</h3>
            <p className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold ${netCalories < 0 ? 'text-green-600' : 'text-orange-600'}`}>
                {netCalories}
            </p>
        </div>
    </div>
);


};

export default CalorieCounter;
