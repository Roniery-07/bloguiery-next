{
  "title": "Building my own blog",
  "date": "2025-12-16T10:00:00-03:00",
  "description": "tldr: just do it yourself", 
  "tags": ["javascript", "react"],
  "categories": ["dev"]
}
---

## Motivations

The first thought when talking about creating a blog is that it is a thing for "old school" thing , for people that grow up when technology win its infancy. And indeed, its a thing for "old school" thing, but after reading `AkitaOnRails's` blog my mind changed, the way he sees a blog is different. He sees his blog as a personal library for the content that he is learning.

So from now on everything I learn I will log here.

---
## Initial Idea

My first approach to this project was to build a clone of [Tabnews](https://tabnews.com.br). However, for this I would need a database to store the comments and posts, which meant the nedd for a VPS. But I didn't want to spend money on this project so the solution I found was to make my blog be rendered on the server using a free hosting plataform like [vercel](https://vercel.com) or [netlify](https://netlify.com), so that is what I did.

---
## How the posts are being stored?

As I said previously, my first idea was to use a VPS and host the blog frontend and the backend + database on it. However, this idea was replaced with another solution, use Next.js and saving the blog posts as files. Next.js is important because I can use `server components` to search the files stored inside the project folder.

If you are wondering if Next.js is the only solution and if you can do it with any other frontend framework: I know that you are right. I only did it in Next.js because it is a framework I have used before.

So the way I'm listing all the posts is with this function below:

```javascript
async function getAllPosts() {
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
```

And with that I return the posts info, like title, description, slug(essential for posts navigation) 

---
## Styling

The most satisfying thing was finding a good style to the blog. After searching through Pinterest I found a good looking design called `Neo-Brutalism`, it was perfect, so I went with it. This styles is characterized by the black borders around elements, as if they were floating above the background.

Another thing to style is how the post itself looks. For the render conversion, `markdown -> html` I used a react library called `react-markdown`. What it does is transform markdown syntax into html tags. So if your `.md` file contains:

```md
# Hello World
```

the `react-markdown` library will convert it to"
```html
<h1>Hello World</h1>
```

And now we stylize the tags with css.

---
## Final thoughts 
The main lesson of this project isn't the technical things, like **saving** posts as files or styling the **posts** using React libraries and CSS. The main lesson is that if you want to build something, **go ahead** and build it yourself. If you like **someone's** project, build it yourself **in your own way**, make it yours(do not copy or steal, please). If you are struggling with software development, the main advice I can give you is this: if someone built a good project that you like, you can do it too. How will you do it? I don't know, **you'll have to figure it out** or how we say in Portuguese **give your jumps**..