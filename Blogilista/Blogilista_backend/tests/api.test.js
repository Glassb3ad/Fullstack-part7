
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/Blog')
const testHelper = require('./testHelper.js')
const app = require('../app')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const api = supertest(app)
let token = ''

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
    await User.deleteMany({})
    await User.insertMany(testHelper.initialUsers)
    /*await api.post('/api/login')
            .send({
                username: 'xp3000',
                password: '12345'
            })
            .end((error, response) =>{
                token = response.body.token
            })*/
})
describe('Testin api/blogs functionality', ()=>{
test('Amount of blogs is six', async () => {
    const response = await api.get("/api/blogs")
    expect(response.body.length).toBe(6)
})

test('blogs are JSON', async () => {
    await api.get("/api/blogs")
      .expect('Content-Type', /application\/json/)
})

test("id field is defined", async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})
test('A new blog is added', async () => {
    const newBlog = {
        title: "Pilates Problem",
        author: "T.fil",
        url: "https://fullstackopen.com/osa4/backendin_testaaminen#virheiden-kasittely-ja-async-await",
        likes: 12
    }
    await api.post('/api/blogs/')
        .send(newBlog)
        //.set('Authorization', token)
        .expect(201)
    const blogsAfterPost = await (await api.get('/api/blogs')).body
    expect(blogsAfterPost.length).toBe(7)
})

test('When a new blog with undefined likes is added, then its likes has value 0', async () => {
    const newBlog = {
        title: "Pilates Problem II",
        author: "T.fil",
        url: "https://fullstackopen.com/osa4/backendin_testaaminen#virheiden-kasittely-ja-async-await",
    }
    await api.post('/api/blogs/')
        .send(newBlog)
        //.set({Authorization: token })
        .expect(201)
    const blogsAfterPost = await (await api.get('/api/blogs')).body
    const addedBlog = blogsAfterPost.find(a => a.title === "Pilates Problem II")
    console.log(addedBlog)
    expect(addedBlog.likes).toBe(0)
})

test('When trying to add blog missing both title and url, http code 400 is returned', async () =>{
    const newBlog = {
        author: "T.fil",
        likes: 12
    }
    await api.post('/api/blogs')
      .send(newBlog)
      //.set({Authorization: token })
      .expect(400)
})
})

describe('testing funtcionality of users router', ()=>{
    test('When trying to add too short username, response is 418 and nothing is added to database', async()=>{
        const newUser = {
            username: 'lu',
            name: 'mikavaa',
            password: '1234'
        }
        await api.post('/api/users')
                 .send(newUser)
                 .expect(418)
        expect((await api.get('/api/users')).body.length).toBe(2)

    })
    test('When trying to add too short password, response is 418 and nothing is added to database', async()=>{
        const newUser = {
            username: 'lume',
            name: 'mikavaa',
            password: '12'
        }
        await api.post('/api/users')
                 .send(newUser)
                 .expect(418)
        expect((await api.get('/api/users')).body.length).toBe(2)

    })
    test('When trying to add previously added username, response is 400 and nothing is added to the database', async()=>{
        const newUser = {
            username: 'xp3000',
            name: 'mikavaa',
            password: '1234'
        }
        await api.post('/api/users')
                 .send(newUser)
                 .expect(400)
        expect((await api.get('/api/users')).body.length).toBe(2)

    })
})

afterAll(() => {
    mongoose.connection.close()
})