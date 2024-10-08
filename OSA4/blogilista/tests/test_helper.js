const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {

    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,

    },
    {

    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,

    },
    {

    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,

    },
    {

    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,

    },
    {

    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
 
    },
    {

    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2

    }  
]

const initialUsers = [
  {

  username: "testing1",
  password: "testing1",

  },
  {

  username: "testing2",
  password: "testing2",
  
    },
  {

  username: "testing3",
  password: "testing3",

  },

]

const nonExistingId = async () => {
  const blog = new Blog({     title: "Dummy data",
  author: "Dummy data",
  url: "http://blog.html",
  likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const user = await User.find({})
  return user.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,initialUsers ,nonExistingId, blogsInDb,usersInDb
}