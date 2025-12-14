import { PostCard } from '@/components/PostCard';
import { getAllPosts } from '@/lib/getAllPosts';

export default async function Page() {
  const posts = await getAllPosts()  

  if (!posts) {
    return (
      <div className="page">
        <div className="w-full p-4 md:max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-10 items-start m-auto">
          {posts && <div>No posts found</div>}
        </div>
      </div>
    );
  }

  return <div className="page">
    <div className="w-full p-4 md:max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 items-start m-auto">
        {posts.map((p) => (
          <PostCard
            key={p.title}
            title={p.title}
            createdAt={p.date}
            body={p.description}
            slug={p.slug}
          />
        ))}
      </div>
  </div>
}