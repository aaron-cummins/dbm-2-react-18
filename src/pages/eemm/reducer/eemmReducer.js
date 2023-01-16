import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        eemmList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        eemmList: [...state.eemmList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        eemmActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        eemmList: state.eemmList.map((eemm) => (eemm.id === action.payload.id ? action.payload : eemm)),
      };
    case ELIMINAR:
      return {
        ...state,
        eemmList: state.eemmList.filter((eemm) => eemm.id !== action.payload),
      };
    default:
      return state;
  }
};
