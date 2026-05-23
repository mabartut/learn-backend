import request from 'supertest';
import {app, HTTP} from "../../src";

describe('/', () => {
    it(`should return 200 and string 'Projects API is up'`,
        async () => {
            await request(app)
                .get('/')
                .expect(HTTP.OK)
                .expect({message: 'Projects API is up'});
        }
    )
    it(`should return 200 and array of projects`,
        async () => {
            const response = await request(app).get('/projects');

            expect(response.status).toBe(HTTP.OK);
            expect(Array.isArray(response.body)).toBeTruthy();

            console.log('response.body=', response.body);
            console.log('Full response:', JSON.stringify(response.body, null, 2));
        }
    )
})
