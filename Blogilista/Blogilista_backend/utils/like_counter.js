const totalLikes = (blogs) => {
    return blogs.reduce(((a,b) => a + b.likes),0) 
}

const favoriteBlog = (blogs) => {
    let result;
    let highestNumberOfLikes = -1;
    blogs.forEach(blog =>{
        if(blog.likes > highestNumberOfLikes){
            result = blog
            highestNumberOfLikes = blog.likes
            console.log(result)
        } 
    })
    return result
}
const mostBlogs = (blogs) =>{
    const authors = blogs.map(a => a.author)
    const uniqueAuthors = [... new Set(authors)]
    let result = null
    let max = 0
    uniqueAuthors.forEach(author =>{
        let count = blogs.reduce((a,b) => {
            if (b.author === author) return a+1
            else return a 
        },0)
        if (count > max){
            result = author
            max = count
        } 
    })
    if(result !== null){
     return {
        author: result,
        numberOfBlogs: max
     }
    }
}

const mostLikes = (blogs) =>{
    const authors = blogs.map(a => a.author)
    const uniqueAuthors = [... new Set(authors)]
    let result = null
    let max = 0
    uniqueAuthors.forEach(author =>{
        let count = blogs.reduce((a,b) => {
            if (b.author === author) return a+b.likes
            else return a 
        },0)
        if (count > max){
            result = author
            max = count
        } 
    })
    if(result !== null){
     return {
        author: result,
        numberOfLikes: max
     }
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}