// Assuming you have a file named 'server.js' that contains your express server code
const app = require('../src/index'); // Import your express app
const supertest = require('supertest');
const { expect } = require('chai');

const request = supertest(app);

describe('Database Connection Test', () => {
    it('should connect to the database successfully', (done) => {
        request.get('/')
            .end((err, res) => {
                // Here, you can check for a specific status code or message that indicates a successful connection
                // For this example, I'm assuming a 200 status code indicates a successful connection
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

// TODO: Write tests for POST REGISTER and POST LOGIN endpoints