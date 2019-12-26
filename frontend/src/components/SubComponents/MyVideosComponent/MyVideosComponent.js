import React, {useEffect, useState, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyVideosAction,setCurrentVideo  } from "../../../store/actions/videos";
import Card from "../../UI/Card/Card";
import Backdrop from "../../Backdrop/Backdrop";
import FormEditTitle from "../FormEditTitle/EditTitleVideo";
import "./MyVideosComponent.css";
const MyVideosComponent = props => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  //const myVideos = useSelector(state => state.videos.myVideos)
  const [open, setOpen] = useState(false);
  //const [currentVideo, setCurrentVideo] = useState({})
  const openBackDropCrud = async id_video => {
    await dispatch(setCurrentVideo(id_video));
    setOpen(true);
  };
  const closeBackDropCrud = () => {
    setOpen(false);
  };
    const loadVideos = useCallback(async () => {
      await dispatch(getMyVideosAction(token));
    }, [dispatch, token]);

    useEffect(() => {
      loadVideos();
    }, [loadVideos]);


  const myVideos = useSelector(state => state.videos.myVideos)


  const getVideos =() => {
    if (myVideos.length !== 0) {
      return myVideos.map(video => {
        return <Card vidId={video.id_video} key={video.id_video} title={video.title} eventclick={()=>openBackDropCrud(video._id)} cardAdmin />;
      });
    }
    return <p>Loading...</p>;
  }

  //console.log("myVideos:eeeee", myVideos.videos);
  let BackDropComponent ;
  if(open){
    BackDropComponent = (
      <Backdrop backdrop={open} onclosemenu={closeBackDropCrud}>
        <FormEditTitle onedit={closeBackDropCrud} />
      </Backdrop>
    );
  }
  return (
    <div className="my-videos-container">
      <div className="myVideos-title">
        <p>My Videos:</p>
      </div>
      <div className="container-cards">
        {getVideos()}
      </div>
      {BackDropComponent}
    </div>
  );
};

export default MyVideosComponent;
