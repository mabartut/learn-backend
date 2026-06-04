import {Video} from "../models/GetAllVideosOut";
import {CreateVideoInput} from "../models/CreateVideoInput";

const videos: Video[] = []

export function getAllVideos(): Video[] {
    return videos;
}

export function postVideo(videoData: CreateVideoInput): Video {
    let {
        title,
        author,
        availableResolutions,
        canBeDownloaded = false,
        minAgeRestriction = null,
        publicationDate
    } = videoData;
    const createdAt = new Date().toISOString();

    if (!publicationDate) {
        const tomorrow = new Date(createdAt);
        tomorrow.setDate(tomorrow.getDate() + 1);
        publicationDate = tomorrow.toISOString();
    }
    minAgeRestriction = ((minAgeRestriction) && (minAgeRestriction >= 1) && (minAgeRestriction <= 18)) ? minAgeRestriction : null;

    const newVideo: Video = {
        id: videos.length + 1,
        title,
        author,
        canBeDownloaded,
        minAgeRestriction,
        createdAt,
        publicationDate,
        availableResolutions
    };

    videos.push(newVideo)
    return newVideo;
}




