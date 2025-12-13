import fs from "fs/promises";
import path from "path";
import Markdown from "react-markdown";
import { CodeBlock } from "@/components/CodeBlock"; 
import remarkGfm from "remark-gfm";

interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  categoria: string[]
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let postContent = "";
  let metadata: PostMetadata | null = null;

  try {
    const filePath = path.join(process.cwd(), 'posts', slug + ".md");
    const fileRaw = await fs.readFile(filePath, 'utf-8');

    const separatorIndex = fileRaw.indexOf('---');

    if (separatorIndex !== -1) {
      const jsonString = fileRaw.slice(0, separatorIndex).trim();
      metadata = JSON.parse(jsonString);

      postContent = fileRaw.slice(separatorIndex + 3).trim();
    } else {
      postContent = fileRaw;
    }

  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((err as any).code === 'ENOENT') {
      return <div className="page mt-20 text-center">Post não encontrado (404)</div>;
    }
    console.error("Erro ao ler JSON:", err);
    throw err;
  }

  const dateFormatted = metadata?.date 
    ? new Date(metadata.date).toLocaleDateString('pt-BR') 
    : '';

  return (
    <div className="page w-full flex flex-col items-center mt-20 mb-20 px-4">
      
      {metadata && (
        <div className="w-full max-w-[800px] mb-8 text-left">
          <div className="flex gap-2 mb-4">
            {metadata.tags.map(tag => (
              <span key={tag} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs uppercase font-bold">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold mb-2 text-text">{metadata.title}</h1>
          
          <p className="text-gray-400 font-mono text-sm">
            {dateFormatted}
          </p>
          
          <hr className="border-gray-700 mt-8" />
        </div>
      )}

      <div className="content prose max-w-none dark:prose-invert">
        <Markdown
          components={{
            code: CodeBlock,
          }}
          remarkPlugins={[remarkGfm]}
        >
          {postContent}
        </Markdown>
      </div>
    </div>
  );
}