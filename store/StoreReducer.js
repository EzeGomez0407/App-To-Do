const initialState = {
  tasksArray: [
    {
      name: "Leer 'Kimetsu no Yaiba'",
      description:
        "Leer el capitulo 5 de la 2 temporada del manga de Kimetsu No Yaiba",
      timeLimit: "0:40:00",
      id: "1233eca354",
    },
  ],
  tasksFinished: [
    {
      name: "Hacer la tarea de fisica",
      description: "buscar informacion sobre movimiento palanca",
      timeLimit: null,
      id: "848hjsbhja6367",
    },
  ],
};

const types = {
  ADD_TASK: "ADD_TASK",
  FINISHED_TASK: "FINISHED_TASK",
  DELETE_TASK: "DELETE_TASK",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_TASK:
      const propsCheckResult =
        action.payload.hasOwnProperty("name") && action.payload["name"] !== "";
      if (!propsCheckResult) return state;
      return {
        ...state,
        tasksArray: [...state.tasksArray, action.payload],
      };

    case types.FINISHED_TASK:
      // console.log("finalizado");
      return {
        ...state,
        tasksArray: state.tasksArray.filter(
          (task) => task.name !== action.payload.name
        ),
        tasksFinished: [...state.tasksFinished, action.payload],
      };
    case types.DELETE_TASK:
      return {
        ...state,
        tasksArray: state.tasksArray.filter(
          (task) => task.name !== action.payload
        ),
      };

    default:
      state;
  }
};

export default reducer;
export { initialState, types };
