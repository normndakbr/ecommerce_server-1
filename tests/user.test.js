const request = require("supertest");
const app = require("../app");
const { sequelize } = require('../models')
const { queryInterface } = sequelize

afterall(done => {
    queryInterface.bulkDelete("Users")
    .then(() => {
        done();
    })
    .catch(error => {
        console.log("Error from user.test.js >>>>", + error);
        done();
    })
})

describe('POST /register', () => {
    it('test register success', (done) => {
        request(app)
        .post('/register')
        .send({email: 'agumon@mail.com', password: 'qwerty'})
        .then(response => {
            const {body, status} = response
            expect(status).toBe(201);
            expect(body).toHaveProperty('id', expect.any(Number));
            expect(body).toHaveProperty('email', 'agumon@mail.com');
            done();
        })
        .catch(error => {
            console.log(error);
        })
    })

    it('test register email already exist', (done) => {
        request(app)
        .post('/register')
        .send({email: 'agumon@mail.com', password: 'qwerty'})
        .then(response => {
            const {body, status} = response
            expect(status).toBe(500);
            expect(body).toHaveProperty('message', 'Email already exist');
            done();
        })
        .catch(error => {
            console.log(error);
        })
    })
})

describe('POST /login', () => {
    it('test login success', () => {
        request(app)
        .post('/login')
        .send({email: 'agumon@mail.com', password: 'qwerty'})
        .then(response => {
            let {body, status} = response
            expect(status).toBe(200);
            expect(body).toHaveProperty('access_token', expect.any(String));
        });
    })

    it('test login invalid email/password', () => {
        request(app)
        .post('/login')
        .send({email: 'agumon@mail.com', password: 'qwerty'})
        .then(response => {
            let {body, status} = response
            expect(status).toBe(500);
            expect(body).toHaveProperty('message', 'Invalid email or password');
        });
    })
})