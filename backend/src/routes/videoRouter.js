const express = require("express");
const videoController = require('../controllers/videoController')
const isAuth = require("../utils/is-auth");
const {checkEmpty,checkLinkFormat, checkVideoIfExist, checkVideoIfExistForComment} = require('../utils/videoValidator')
const router = express.Router();



router.post('/video',isAuth,[
        checkEmpty('title'),
        checkLinkFormat(),
        checkVideoIfExist("link")
        ],videoController.addVideo)

router.post(
        "/video/edit",
        isAuth,
        [checkEmpty("title"), checkVideoIfExist("id_video")],
        videoController.editVideo
);
router.post(
        "/video/delete",
        isAuth,
        [checkVideoIfExist("id_video")],
        videoController.deleteVideo
);
router.get('/videos',isAuth,videoController.getAllMyVideos)
router.get("/videos/search/", videoController.getSearchedVideos);
router.post("/video/comments/",checkVideoIfExistForComment(), videoController.getVideoWithComments);
router.get("/", videoController.getSuggestionVideos);
module.exports = router;