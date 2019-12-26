export const ADD_VIDEO = "ADD_VIDEO";
export const MY_VIDEOS = "MY_VIDEOS";
export const SUGGESTION_VIDEOS = "SUGGESTION_VIDEOS";
export const CURRENT_VIDEO = "CURRENT_VIDEO";
export const EDIT_VIDEO = "EDIT_VIDEO";
export const DELETE_VIDEO = "DELETE_VIDEO";
export const SEARCH_VIDEOS = "SEARCH_VIDEOS";
export const ADD_COMMENT = "ADD_COMMENT";

const HOST = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT_SERVER}`;

export const addCommentAction = (video,comment,token) => {
  return async dispatch => {
    await fetch(`${HOST}/video/add/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        video,
        comment
      })
    });
    //let resData = await response.json();
    //console.log("resData::::", resData);
    dispatch(setCurrentVideo(video));
    dispatch({
      type: ADD_COMMENT,
    });
  };
};
export const setCurrentVideo = (video) => {
  return async dispatch => {
    const response = await fetch(`${HOST}/video/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        video
      })
    });
    let resData = await response.json();
    //console.log("resData::::", resData);
    dispatch ({
      type: CURRENT_VIDEO,
      currentVideo: resData
    });
  }
}

export const deleteVideoAction = (id_video, token) => {
         return async dispatch => {
           const response = await fetch(`${HOST}/video/delete`, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + token
             },
             body: JSON.stringify({
               id_video
             })
           });
           let resData = await response.json();
           dispatch(getMyVideosAction(token));
           dispatch({
             type: DELETE_VIDEO,
             status: response.status,
             resData: resData
           });
         };
       };
export const editVideoAction = (title, id_video, token) => {
         return async dispatch => {
           const response = await fetch(`${HOST}/video/edit`, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + token
             },
             body: JSON.stringify({
               title,
               id_video,
             })
           });
           let resData = await response.json();

          // console.log(resData);
           dispatch(getMyVideosAction(token));
           dispatch({
             type: EDIT_VIDEO,
             status: response.status,
             resData: resData
           });
         };
       };
export const addVideoAction = (title, link,token ) => {
    return async dispatch => {
        const response = await fetch(`${HOST}/video`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token
          },
          body: JSON.stringify({
            title,
            link,
          })
        });
        let resData = await response.json();

       // console.log(resData);
        dispatch({
          type: ADD_VIDEO,
          status: response.status,
          resData: resData
        });
    }
}

export const  getMyVideosAction = (token) => {
  return async dispatch => {
    const response = await fetch(`${HOST}/videos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
    let resData = await response.json();

   // console.log(resData);
    dispatch({
      type: MY_VIDEOS,
      status: response.status,
      resData: resData
    });
  };
}
export const getSuggestionVideosAction = () => {
  return async dispatch => {
   // console.log("HOST::::", HOST);
    const response = await fetch(`${HOST}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    let resData = await response.json();

    dispatch({
      type: SUGGESTION_VIDEOS,
      status: response.status,
      resData: resData
    });
  };
};
export const getSearchedVideosAction = (searched_value) => {
  return async dispatch => {
    const response = await fetch(`${HOST}/videos/search/?v=${searched_value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let resData = await response.json();

    dispatch({
      type: SEARCH_VIDEOS,
      status: response.status,
      resData: resData
    });
  };
};