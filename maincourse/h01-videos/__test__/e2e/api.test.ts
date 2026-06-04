import request from 'supertest';
import {app, HTTP} from "../../src";
import {CreateVideoInput} from "../../src/models/CreateVideoInput";
import {Video} from "../../src/models/PostVideoOut";
import {APIErrorResult} from "../../src/types";

describe('/', () => {
    it(`should return 200 and string 'Projects API for videos is up'`,
        async () => {
            await request(app)
                .get('/')
                .expect(HTTP.OK, {message: 'Projects API for videos is up'})
        }
    )

    it(`video shouldn't be created`, async () => {
        const testVideo: CreateVideoInput = {
            title: 'Теория большого большого большого большого большого большого взрыва',
            author: 'Автор с очень длинным названием',
            availableResolutions: []
        }
        const response = await request(app).post('/videos').send(testVideo);
        const errorResult: APIErrorResult = response.body;

        expect(response.statusCode).toBe(HTTP.BAD_REQUEST);
        expect(errorResult.errorsMessages![0].field).toBe('title');
        expect(errorResult.errorsMessages![1].field).toBe('author');
        expect(errorResult.errorsMessages![2].field).toBe('availableResolutions');
    })

    const videos = []

    it('video should be created', async () => {
        const testVideo: CreateVideoInput = {
            title: 'Теория большого взрыва',
            author: 'Кураж Бомбей',
            availableResolutions: ['P720', 'P1080', "P1440"]
        }
        const response = await request(app).post('/videos').send(testVideo);
        const createdVideo: Video = response.body;

        videos.push(createdVideo);

        expect(response.statusCode).toBe(HTTP.CREATED);
        expect(createdVideo.title).toBe('Теория большого взрыва');
    })

    it('videos should be received', async () => {

        const response = await request(app).get('/videos');
        const videos: Video[] = response.body;

        expect(response.statusCode).toBe(HTTP.OK);
        expect(videos.length).toBe(1);
        expect(videos[0].title).toBe('Теория большого взрыва');
    })


})