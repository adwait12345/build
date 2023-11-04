import { ActionTypes } from "../Action-Types/action-types";



const initialState = {
image:[]

};



export const ImageReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case ActionTypes.SET_IMAGE:
            return { ...state, image: action.payload };

        default:
            return state;
    }

};

export const selectedImageReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SELECTED_IMAGE:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};