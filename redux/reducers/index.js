import { combineReducers } from "redux";
import {
ImageReducer,selectedImageReducer

} from "./Reducer";

const reducer = combineReducers({

    allImage: ImageReducer,
    Image: selectedImageReducer,

});
export default reducer;