import React, {useEffect, useCallback, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSuggestionVideosAction, getSearchedVideosAction , setCurrentVideo } from "../../../store/actions/videos";
import Card from "../../UI/Card/Card";
import "./SuggestionVideos";
const SuggestionVideos = props => {
  const dispatch = useDispatch()
  let classIndex = props.suggestionWatch ? "": "-index" ;
  const [redirect, setRedirect] = useState(false)
  const [videoId, setVideoId] = useState(false);
  const openVideo = async  (video) => {
    await dispatch(setCurrentVideo(video));
    setVideoId(video.id_video)
    setRedirect(true)
  };
    const {search} = props
    const loadVideos = useCallback(async () => {
      if (search) {
        await dispatch(getSearchedVideosAction(search));
      } else {
        await dispatch(getSuggestionVideosAction());
      }
    }, [dispatch, search]);

    useEffect(() => {
      loadVideos();
    }, [loadVideos]);


  const randomVideos = useSelector(state => state.videos.randomVideos);


  const getVideos =() => {
    if (randomVideos.length !== 0) {
      return randomVideos.map(video => {
        return <Card vidId={video.id_video} key={video.id_video} title={video.title} eventclick={()=>openVideo(video)} classIndex={classIndex} />;
      });
    }
    return <p>Loading...</p>;
  }
  if(redirect){
   return  <Redirect to={"/watch/" + videoId} />;
  }
  return (
    <div className={"suggestion-container" + classIndex}>
      {props.haveTitle && (
        <div className="suggestion-index-title">
          <p>Suggestion Videos:</p>
        </div>
      )}
      <div className={"suggestion" + classIndex}>
        {getVideos()}

      </div>
    </div>
  );
};

export default SuggestionVideos;
