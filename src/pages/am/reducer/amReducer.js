import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        amList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        amList: [...state.amList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        amActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        amList: state.amList.map((am) => (am.id === action.payload.id ? action.payload : am)),
      };
    case ELIMINAR:
      return {
        ...state,
        amList: state.amList.filter((am) => am.id !== action.payload),
      };
    default:
      return state;
  }
};
