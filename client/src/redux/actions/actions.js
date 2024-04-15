import {
    GET_FEATURES_REQUEST,
    GET_FEATURES_SUCCESS,
    GET_FEATURES_FAILURE,
    POST_COMMENT,
} from "./types";

export const getFeaturesRequest = () => ({
    type: GET_FEATURES_REQUEST,
});

export const getFeaturesSuccess = (features) => ({
    type: GET_FEATURES_SUCCESS,
    payload: features,
});

export const getFeaturesFailure = (error) => ({
    type: GET_FEATURES_FAILURE,
    payload: error,
});

export function postComment(featureId, commentData) {
    return async function(dispatch) {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/features/${featureId}/comments`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: commentData }),
          });

          if (!response.ok) {
            throw new Error("No se pudo crear el comentario");
          }
        const apiData = await response.json();
        return {
            type: POST_COMMENT,
            payload: apiData,
        }
        } catch (error) {
        console.error(error);
        throw new Error("La actividad no se pudo crear");
    }
}
}