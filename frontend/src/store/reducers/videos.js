import { ADD_VIDEO, MY_VIDEOS, CURRENT_VIDEO, EDIT_VIDEO, DELETE_VIDEO, SUGGESTION_VIDEOS, SEARCH_VIDEOS, ADD_COMMENT } from '../actions/videos';
import { Video } from "../../models/Video";
const initialState = {
  currentVideo:{},
  myVideos: [],
  randomVideos: [],
  videosErrors: [],
  hasErrors: false
};
const videosReducer = (state = initialState, action) => {
  let hasErrors = false;
  let newVideosErrors;
  let randomVideos = [];
    switch (action.type) {
        case ADD_VIDEO:
          if (action.status !== 200) {
            newVideosErrors = [action.resData];
            hasErrors = true;
          }
          let newVideo = {};
          if (action.status === 200) {
              newVideo =  new Video(action.resData.title, action.resData.link, action.resData.id_video, action.resData.user)
            }
            return {
              ...state,
              myVideos: state.myVideos.concat(newVideo),
              videosErrors:newVideosErrors,
              hasErrors: hasErrors
            };
        case MY_VIDEOS:
          if (action.status !== 200) {
            newVideosErrors = [action.resData];
            hasErrors = true;
          }
          let myVideos = []
          if (action.status === 200) {
              myVideos = action.resData.videos;
            }
          return {
            ...state,
            hasErrors: hasErrors,
            videosErrors: newVideosErrors,
            myVideos: myVideos
          };
          case SUGGESTION_VIDEOS:
          if (action.status !== 200) {
            newVideosErrors = [action.resData];
            hasErrors = true;
          }
          if (action.status === 200) {
              randomVideos = action.resData.videos;
            }
          return {
            ...state,
            hasErrors: hasErrors,
            videosErrors: newVideosErrors,
            randomVideos: randomVideos
          };
          case SEARCH_VIDEOS:
          if (action.status !== 200) {
            newVideosErrors = [action.resData];
            hasErrors = true;
          }
          if (action.status === 200) {
              randomVideos = action.resData.videos;
            }
          return {
            ...state,
            hasErrors: hasErrors,
            videosErrors: newVideosErrors,
            randomVideos: randomVideos
          };
        case CURRENT_VIDEO:
          return {
            ...state,
            currentVideo: action.currentVideo
          };
        case EDIT_VIDEO:
          return {
            ...state
          };
        case DELETE_VIDEO:
          return {
            ...state
          };
          case ADD_COMMENT:
          return {
            ...state
          };
        default:
            return state;
    }
};
export default videosReducer;
