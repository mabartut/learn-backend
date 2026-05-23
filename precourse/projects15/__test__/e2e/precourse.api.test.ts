import request from 'supertest';
import {app, HTTP} from "../../src";
import {NewProjectInput, ProjectRowDb} from "../../src/repositories/projects.repository";

describe('/', () => {
    it(`should return 200 and string 'Projects API is up'`,
        async () => {
            await request(app)
                .get('/')
                .expect(HTTP.OK, {message: 'Projects API is up'})
        }
    )

    it(`should return 200 and array of projects`,
        async () => {
            const response = await request(app).get('/projects');
            expect(response.status).toBe(HTTP.OK);
            expect(Array.isArray(response.body)).toBeTruthy();
        }
    )

    let createdProject: ProjectRowDb

    it(`project should be created`,
        async () => {

            const testProject: NewProjectInput = {
                name: 'testProjectName',
                description: 'test description',
                status: 'in_progress'
            };

            const response = await request(app).post('/projects').send(testProject)
            createdProject = response.body as ProjectRowDb;
            expect(response.status).toBe(HTTP.CREATED);
            expect(createdProject).toBeDefined();
            expect(createdProject.name).toBe('testProjectName');
        }
    )

    it(`project should be updated`,
        async () => {
            const testProject: NewProjectInput = {
                name: 'newTestProjectName',
                description: 'test description',
                status: 'todo'
            };

            await request(app)
                .put(`/projects/${createdProject.id}`)
                .send(testProject)
                .expect(HTTP.OK, {
                    ...createdProject,
                    ...testProject
                });
        }
    )

    it(`project shouldn't be deleted`,
        async () => {
            await request(app)
                .delete(`/projects/` + -100)
                .expect(HTTP.BAD_REQUEST, {error: 'Invalid project ID'})
        }
    )

    it(`project should be deleted`,
        async () => {
            await request(app)
                .delete(`/projects/${createdProject.id}`)
                .expect(HTTP.NO_CONTENT)
        }
    )

    it(`project shouldn't be created`,
        async () => {
            await request(app)
                .post('/projects').send({name: ''})
                .expect(HTTP.BAD_REQUEST, {error: 'Name is required'})
        }
    )
})
