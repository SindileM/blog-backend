const express = require('express')
const router = express.Router()
const blog = require('../models/blogs')
const verifyToken = require('../middleware/auth.jwt')

router.get('/', async (req, res) => {
   try {
    const blogs = await blog.find()
    res.json(blogs)
   } catch (err) {
    res.status(500).json({ message: err.message })
   }
})

router.get('/:id', getBlog , (req, res) => {
    res.json(res.blblog)
router.post('/',verifyToken, async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        img: req.body.img,
       price: req.body.price,
       created_by: req.userId
    })
    try{
        const newBlog = await blog.save()
        res.status(201).json(newBlog)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id',[getBlog,verifyToken], async (req, res) => {
    if( res.blog.created_by != req.userId){
        return res.status(401).send({ message: "Unauthorized!" });
    }
    if(req.body.title !=null){
        res.blog.title =  req.body.title
    }
    if(req.body.category !=null){
        res.blog.category =  req.body.category
    }
    if(req.body.description !=null){
        res.blog.description =  req.body.description
    }
    if(req.body.img !=null){
        res.blog.img =  req.body.img
    }
    if(req.body.price !=null){
        res.blog.price =  req.body.price
    }
    
    try{
        const updatedBlog = await res.blog.save()
        res.json(updatedBlog)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id',[getBlog,verifyToken], async (req, res) => {
    try{
        if( res.blog.created_by != req.userId){
            return res.status(401).send({ message: "Unauthorized!" });
        }
        await res.blog.remove()
        res.json({ message:'Deleted Blog'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}) 

async function getBlog  (req, res, next){
    let blog
   try{
       blog = await Blog.findById(req.params.id)
      if(blog == null){
          return res.status(404).json({ message:'Cannot find blog' })
      } 
   } catch (err) {
       return res.status(500).json({ message: err.message })
   }

   res.blog = blog
   next()
}

})


module.exports = router
