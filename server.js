import express from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


/* Criar api de Usuários
- Criar usuários
- Listar usuários
- Editar usuários
- Deletar usuários
*/

app.use(express.json())

app.post('/users', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201).json(req.body)
})

app.get('/users', async (req, res) => {

  let users = []

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
    return res.status(200).json(users)
  }

  users = await prisma.user.findMany()
  res.status(200).json(users)
})

app.put('/users/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })

  res.status(201).send(req.body)
})

app.delete('/users/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({ message: "Usuário deletado com sucesso!" })
})
