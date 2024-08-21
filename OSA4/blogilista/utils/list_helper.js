const b = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

const dummy = (blogs) => {
    return 1    
}
//style of first create and then pass 
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
  }

//style of first pass and then create
const favoritBlog = (blogs) => {
    return blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max;
    }, blogs[0])
}

const lodash = require('lodash');

const mostBlogs = (blogs) => {
  
  const authorCounts = lodash.countBy(blogs, 'author')  
  const mostBlogsAuthor = lodash.maxBy(Object.keys(authorCounts), author => authorCounts[author])

  return {
    author: mostBlogsAuthor,
    blogs: authorCounts[mostBlogsAuthor]
  }
}

const mostLikes = (blogs) => {

    const groupedByAuthor = lodash.groupBy(blogs,'author')
    console.log(groupedByAuthor)
    const likesByAuthor = lodash.mapValues(groupedByAuthor,(authorBlogs) => {return lodash.sumBy(authorBlogs, 'likes')})
    const mostLikedAuthor = lodash.maxBy(Object.keys(likesByAuthor),author => likesByAuthor[author])
    console.log('i am alive')
    return {
        author: mostLikedAuthor,
        likes: likesByAuthor[mostLikedAuthor]
      }
}

console.log(mostLikes(b))

module.exports = {
    dummy,totalLikes,favoritBlog,mostBlogs,mostLikes
}   