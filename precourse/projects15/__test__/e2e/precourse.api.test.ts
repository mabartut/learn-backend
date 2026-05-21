import request from 'supertest';
import {app} from "../../src";

describe('/', () => {
    it(`should return 200 and string 'Projects API is up'`,
        async () => {
            await request(app).get('/').expect(200).expect({message: 'Projects API is up'});
        })
})
