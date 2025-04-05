const express = require('express')

const app = express()

const port =  3000 

app.use(express.json())


let teaData = []
let nextId = 1 


app.post('/teas',(req,res)=>{

    const {name , price} = req.body
    const newTea= {id: nextId++, name , price}
    teaData.push(newTea)
    return res.status(201).send(newTea)

})


app.get('/teas',(req,res)=>{
   return  res.status(200).send(teaData)
})


app.get('/teas/:id',(req,res)=>{
    const index =  teaData.find(t => t.id === parseInt(req.params.id))
    if (index === -1){
       return  res.status(404).send('Tea not found')
    }

    return res.status(200).send(index)
})


app.put('/teas/:id',(req,res)=>{
    const tea =  teaData.find(t => t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send('Tea not found')
    }

    const {name , price} = req.body 
    tea.name = name 
    tea.price = price 
    return res.status(200).send(tea)

})

app.delete('/teas/:id',(req,res)=>{
    const tea =  teaData.findIndex(t => t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send('Tea not found')
    }

    teaData.splice(tea,1)
    return res.status(200).send('Tea Deleted')

})



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}...`);
})


