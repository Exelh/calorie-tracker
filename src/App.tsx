import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import ActivityCard from "./components/ActivityCard";
import CalorieCounter from "./components/CalorieCounter";
import { activityReducer, initialState } from "./reducers/activityReducer";

function App() {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    useEffect(() => {
      console.log(state.activities);
      
        localStorage.setItem("activities", JSON.stringify(state.activities));
    }, [state.activities]);

    const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

    return (
      <>
          <header className="relative bg-gradient-to-r from-gray-100 to-gray-200 p-6 text-green-900">
              <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-5xl font-bold">
                      Contador de Calorías Diarias
                  </h1>
                  <p className="text-2xl font-light">
                      Lleva un control de tu ingesta diaria de calorías de manera sencilla
                  </p>
                  <button
                      className="mt-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out disabled:opacity-15"
                      disabled={!canRestartApp()}
                      onClick={() => dispatch({ type: 'restart-app' })}
                  >
                      Reiniciar App
                  </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 pointer-events-none"></div>
          </header>

          <main className=" min-h-screen py-12">
              <div className="max-w-4xl mx-auto px-6 space-y-12">
                  
                  <Form dispatch={dispatch} state={state} />

                  <section className=" py-8 rounded-lg shadow-current ">
                      <CalorieCounter activities={state.activities} />
                  </section>

                  <section className=" py-8 rounded-lg w-full">
                      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                          Actividades Registradas
                      </h2>
                      <div className="space-y-6">
                          
                              <ActivityCard 
                                  
                                  activities={state.activities} 
                                  dispatch={dispatch} 
                              />
                         
                      </div>
                  </section>
              </div>
          </main>
      </>
  );
}

export default App;
