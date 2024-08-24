import { useMemo, Dispatch } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ActivityActions } from "../reducers/activityReducer";

interface ActivityCardProps {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
}

export default function ActivityCard({ activities, dispatch }: ActivityCardProps) {
  

  const categoryName = useMemo(() => 
    (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '' )
, [activities])

  return (
    <>
    
    {activities.map( activity => (
    <div key={activity.id} className=" w-full relative p-4 rounded-lg shadow-lg bg-white">
      <div
        className={`absolute top-15 left-0 transform -translate-y-1/2 px-3 py-1 rounded-md text-l font-semibold ${
          activity.category === 1 ? "bg-orange-600 text-white" : "bg-green-600 text-white"
        }`}
      >
        {categoryName(+activity.category)}
      </div>
      <div
        className={`p-6 rounded-lg shadow-md flex items-center justify-between ${
          activity.category === 1 ? "bg-orange-100 border-l-4 border-orange-600" : "bg-green-100 border-l-4 border-green-600"
        }`}
      >
        <div>               
          <h3 className={`text-xl font-bold ${activity.category === 1 ? "text-orange-600" : "text-green-600"}`}>
            {activity.name}
          </h3>
          <p className="text-blue-900 font-bold text-xl">Calorías: {activity.calories}</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
            className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faEdit} size="lg" />
          </button>
          <button
            onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
            className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </button>
        </div>
      </div>
    </div>
    ))}
    </>
  );
}
