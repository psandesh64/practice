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
app.get('/contact/:id',(request,response) => {
    const id = Number(request.params.id)
    const singleContact = contact.find(data => data.id === id)
    if (singleContact) {response.json(singleContact)}
    else (response.status(404).end())
})
app.delete('/contact/:id',(request,response) => {
    const id = Number(request.params.id)
    contact  = contact.filter(data => data.id !== id)
    response.status(204).end()
})
app.post('/contact/',(request,response) => {
    const newcontact = request.body
    contact.push(newcontact)
    response.json(contact)})

const unknownEndpoint = (request,response) => {
    response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)
const PORT = 3001
app.listen(PORT,() => console.log(`Server running on ${PORT}`))