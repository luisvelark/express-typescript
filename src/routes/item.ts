import { Router, Request, Response } from 'express'

const router = Router()

router.get('/items', (_req: Request, res: Response) => {
  console.log('hola')
  res.send({ data: 'AQUI_VAN LOS DATOS' })
})

export { router }
