import express, { Application, Request, Response, NextFunction } from 'express'
import Database from './core/Database'
import initDB from './core/services/initDB'
import seedDB from './core/services/seedDB'
import User from './core/model/User'

const app: Application = express()

app.use(express.json())
app.use(async (req, res, next) => {
  initDB()
  await seedDB()
  next()
})
app.get('/', async (req: Request, res: Response): Promise<object> => {
    try {
      const ourUser = await User.findByPk(1, {
        rejectOnEmpty: false, // Specifying true here removes `null` from the return type!
      });
      return res.json({ status: 'success', message: ourUser })
    } catch (err) {
      console.log('error', err)
      return res.json({ status: 'error', message: err.message, full: err })
    }
  }
)

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Route Not found')
  next(error)
})

app.use((error: { message: string; status: number }, req: Request, res: Response, next: NextFunction
  ) => {
    res.status(error.status || 500)
    res.json({
      status: 'error',
      message: error.message
    })
    next()
  }
)

const PORT: any = process.env.PORT || 3000

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
