import { createApp } from './create.app'

const app = createApp()

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
