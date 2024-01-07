const express = require('express')

const app =express()
app.use(express.json())

let contact =[
    {
        id : 1,
        name : "Ram",
        number : 9856326
    },
    {
        id : 2,
        name : "Sita",
        number : 985621
    },
]
const requestLogger = (request,response,next) => {
    console.log('Method',request.method);
    console.log('Path',request.path);
    console.log('Body',request.body);
    console.log('----------------------');
    next();
}
app.use(requestLogger)



app.get('/contact/',(request,response) => {
    response.json(contact)
})

const unknownEndpoint = (request,response) => {
    response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)
const PORT = 3001
app.listen(PORT,() => console.log(`Server running on ${PORT}`))