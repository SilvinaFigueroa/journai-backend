
const express = require('express')

const app = express()
const PORT = 3000 || 4000

app.get('/', (res, req)=>{
    res.send("Express route working")
})



app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})