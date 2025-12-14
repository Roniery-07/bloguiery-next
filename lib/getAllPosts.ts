import path from "path";
import fs from "fs/promises"

export interface PostMetadata{
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[]
}

export async function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), '/posts')

  const filenames = await fs.readdir(postsDirectory)

  const posts = await Promise.all(
    filenames
      .filter(filename => filename.endsWith('.md'))
      .map(async filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8')

        const separatorIndex = fileContent.indexOf('---')
        let metadata = {} as PostMetadata;

        if(separatorIndex !== -1){
          try{
            const jsonString = fileContent.slice(0, separatorIndex).trim()
            metadata = JSON.parse(jsonString)
          }
          catch(err){
            console.error(`Erro ao ler metadata de ${filename}`, err)
          }
        }

        return {
          slug: filename.replace('.md', ''),
          title: metadata.title || "Sem Título",
          date: metadata.date || new Date().toISOString(),
          description: metadata.description || '',
          tags: metadata.tags || []
        }
      })
  )
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

}