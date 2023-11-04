import { ActionTypes } from "../Action-Types/action-types";


export const setImage = (type) => {
    return {
        type: ActionTypes.SET_IMAGE,
        payload: type,
    };
};

export const selectedImage = (sType) => {
    return {
        type: ActionTypes.SELECTED_IMAGE,
        payload: sType,
    };
};