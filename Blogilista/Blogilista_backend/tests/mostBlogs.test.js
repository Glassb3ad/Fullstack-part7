const mostBlogs = require('../utils/like_counter').mostBlogs

const blogs = require('./testHelper.js').initialBlogs

describe('MostBlogs test', ()=>{
    console.log(mostBlogs(blogs))
    test('Author with most blogs is Robert C. Martin', ()=>{
        expect(mostBlogs(blogs)).toEqual({author: 'Robert C. Martin',
                                          numberOfBlogs: 3  })
    })
})