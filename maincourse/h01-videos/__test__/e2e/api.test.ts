import request from 'supertest';
import {app, HTTP} from "../../src";

describe('/', () => {
    it(`should return 200 and string 'Projects API for videos is up'`,
        async () => {
            await request(app)
                .get('/')
                .expect(HTTP.OK, {message: 'Projects API for videos is up'})
        }
    )
})