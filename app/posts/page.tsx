import fs from 'fs/promises'
import path from 'path'

export default async function Page() {
  try{
    const postsDir = path.join(process.cwd(), '/posts/')
    const files = await fs.readdir(postsDir)
    console.log(files)
  } catch(err) {
    console.error("error:" + err)
    throw err
  }
  return <div className="page"></div>
}