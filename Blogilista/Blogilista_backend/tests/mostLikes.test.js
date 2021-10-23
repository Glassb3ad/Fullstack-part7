const mostLikes = require('../utils/like_counter').mostLikes

const blogs = require('./testHelper.js').initialBlogs

describe('MostLikes test', ()=>{
    console.log(mostLikes(blogs))
    test('Author with most Likes is Edsger W. Dijkstra', ()=>{
        expect(mostLikes(blogs)).toEqual({author: 'Edsger W. Dijkstra',
                                          numberOfLikes: 17 })
    })
})