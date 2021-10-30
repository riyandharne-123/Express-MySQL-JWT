let chai = require('chai')
let chaiHttp = require('chai-http')
var assert = require('assert');
let server = require('../app')
let db = require('../models');

let Users = db.users;

chai.use(chaiHttp)

describe('USER API', () => {
    let token = ''

    //login
    describe("POST /login", () => {
        it('should login user', (done) => {
            const user = {
                email: 'test@test.com',
                password: 'test1234'
            }

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, response) => {
                    if(err) return done(err)
                    assert.equal(response.status, 200)
                    token = response.body.token
                    done()
                })
        })
    })

    //user crud
    describe("user crud", async () => {
        it('should get all users', async (done) => {     
            chai.request(server)
                .get('/get/users')
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    if(err) return done(err)
                    assert.equal(response.status, 200)
                    Users.findAndCountAll().then(function (res) {
                        chai.expect(response.body).to.have.lengthOf(res.count)
                    });
                })
                done()
        })

        it('should get single user', async (done) => {    
            chai.request(server)
                .get(`/get/users/1`)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    if(err) return done(err)
                    assert.equal(response.status, 200)
                    Users.findByPk(1).then(function (res) {
                        chai.expect(response.body.email).to.equal(res.email);
                    });
                })
                done()
        })

        it('should create a user', async (done) => {    
            const user = {
                name: 'test123',
                email: 'test123@test.com',
                password: 'test1234'
            }

            chai.request(server)
                .post(`/create/users`)
                .set({ Authorization: `Bearer ${token}` })
                .send(user)
                .end((err, response) => {
                    if(err) return done(err)
                    assert.equal(response.status, 200)
                    Users.findOne({ where : { email : user.email } }).then(function (res) {
                        chai.expect(response.body.email).to.equal(res.email)
                    });
                    Users.destroy({ where : { email : user.email } })
                })
                done()
        })

        it('should update a user', (done) => {    
            const updatedData = {
                name: 'updated name!',
                email: 'test@updated.com',
                password: 'twrhjefwiefbyi'
            }

            chai.request(server)
                .put(`/update/users/${1}`)
                .set({ Authorization: `Bearer ${token}` })
                .send(updatedData)
                .end((err, response) => {
                    if(err) return done(err)
                    assert.equal(response.status, 200)
                    chai.expect(response.body.name).to.equal(updatedData.name)
                })
                done()
        })
    })

})
