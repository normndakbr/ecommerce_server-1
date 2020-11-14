const request = require("supertest");
const app = require("../app");

describe('POST /products', () => {
    it('test create product success', () => {
        request(app)
        .post('/products')
        .send({
            name: 'Poke Ball', 
            images_url: 'https://cdn.bulbagarden.net/upload/d/dc/GO_Pok%C3%A9_Ball.png',
            price: '150000',
            stock: '2'
        })
        .then(response => {
            let {body, status} = response
            expect(status).toBe(201);
            expect(body).toHaveProperty('id', expect.any(Number));
            expect(body).toHaveProperty('name', 'Poke Ball');
            expect(body).toHaveProperty('images_url', 'https://cdn.bulbagarden.net/upload/d/dc/GO_Pok%C3%A9_Ball.png');
            expect(body).toHaveProperty('price', '150000');
            expect(body).toHaveProperty('stock', '2');
        })
    })

    it('test create product failed', () => {
        request(app)
        .post('/products')
        .send({
            name: 'Poke Ball', 
            images_url: 'https://cdn.bulbagarden.net/upload/d/dc/GO_Pok%C3%A9_Ball.png',
            price: '150000',
            stock: '2'
        })
        .then(response => {
            let {body, status} = response
            expect(status).toBe(500);
            expect(body).toHaveProperty('message', 'Internal Server Error');
        });
    })
})

describe('GET /products', () => {
    it('test read product success', () => {
        request(app)
        .get('/products')
        .then(response => {
            let {body, status} = response
            expect(status).toBe(200);
            expect(body).toHaveProperty('name', );
            expect(body).toHaveProperty('email', 'agumon@mail.com');
        });
    })
})

describe('PUT /products/:id', () => {
    
})

describe('DELETE /products/:id', () => {
    
})