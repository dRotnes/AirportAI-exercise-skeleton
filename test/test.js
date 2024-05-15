const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const url = 'http://localhost:3000';

chai.use(chaiHttp);

/*
    Scenario:

    User reports a loss of his passport and searches for it. Later, passport gets found and agent adds it to database.
    Receiving feedback from possible matches, agent notifies the user its passport was found and user retrieves it.
    Agent closes report and deletes product from database. 
*/
describe(`Scenario 1`, () => {

    let username = "airportai_admin7";
    let password = "123456789";
    let email = "airportai_admin7@airportai.com";
    let jwt_token;
    let report_id;
    let product_id;

    let loss_description = "I lost my Sunglasses yesterday. Last time I saw it was close to arrivals";

    it('Register new Agent', (done) => {
        chai.request(url)
        .post('/auth/register')
        .set('Content-Type', 'application/json')
        .send({
            "username": username,
            "password": password,
            "email":email,
            "role":"admin"
        })
        .end((err, res) => {
            expect(res).to.have.status(201);
            done();
        });
    });

    it('User reports a loss', (done) => {
        chai.request(url)
        .post('/user/report_loss')
        .send({
            "name":"Dante",
            "last_name":"Rotnes",
            "nationality":"Brazil",
            "document_number":"G123124",
            "contact":"12091283123",
            "email":"danterotnes@gmail.com",
            "address":"Rua A apto B",
            "loss_description":loss_description,
            "loss_time":"2024-05-10"
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("report");
            report_id = res.body.report._id;
            done();
        });
    });

    it('User searches by the description for possible matches', (done) => {
        chai.request(url)
        .get('/user/search_by_description')
        .set('Content-Type', 'application/json')
        .send({
            "description": loss_description
        })
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        });
    });

    it('Agent logs in', (done) => {
        chai.request(url)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            "username": username,
            "password": password,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            jwt_token = res.body.token;
            done();
        });
    });

    it('Agent create a new product', (done) => {
        chai.request(url)
        .post('/agent/add_product')
        .set('Content-Type', 'application/json')
        .auth(jwt_token, { type: 'bearer' })
        .send({
            "product_name": "Sunglasses",
            "product_category": "Clothing",
            "product_brand": "Armani",
            "product_color":"Silver"
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("possible_matching_reports");
            expect(res.body).to.have.property("product_id");
            product_id = res.body.product_id;
            done();
        });
    });

    // Agent notifies user (not implemented)
    // User retrieves item and gives agent report id and product id

    it('Agent updates report status', (done) => {
        chai.request(url)
        .post('/agent/update_report_status')
        .set('Content-Type', 'application/json')
        .auth(jwt_token, { type: 'bearer' })
        .send({
            "report_id": report_id,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });

    
    it('Agent deletes product', (done) => {
        chai.request(url)
        .delete('/agent/delete_product')
        .set('Content-Type', 'application/json')
        .auth(jwt_token, { type: 'bearer' })
        .send({
            "product_id": product_id,
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });


});