import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";

const descriptionPageReducer = (state, action) => {
    switch (action.type) {
        case GET_REQUEST:{
            return {...state, loading: true};
        }
        case GET_FAIL:{
            return {...state, loading: false, error: action.payload};
        }
        case GET_SUCCESS:{
            return {...state, loading: false, data: action.payload};
        }
        default: return {...state};
    }
}
export default descriptionPageReducer;