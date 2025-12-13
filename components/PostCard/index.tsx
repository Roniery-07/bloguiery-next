import Link  from 'next/link';

interface PostCardProps {
  title: string;
  body: string;
  createdAt: Date | string;
  slug?: string;
}

export const PostCard = ({
  title,
  body,
  createdAt,
  slug = '#',
}: PostCardProps) => {
  const dateObj = new Date(createdAt);

  const formattedDate = dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="relative inline-block group w-full">
      <div
        aria-hidden="true"
        className={`
          absolute inset-0 
          bg-black border-2 border-black
          translate-x-[6px] translate-y-[6px] 
          -z-10  /* IMPORTANTE: Garante que fica atrás do cartão */
        `}
      ></div>

      <Link
        href={`/posts/${slug}`}
        className={`
          block h-full cursor-pointer
          relative z-10
          border-2 border-black bg-background
          px-6 py-5 
          text-text 
          transition-transform duration-150 ease-out
          
          hover:translate-x-[5px] hover:translate-y-[5px]
          active:translate-x-[6px] active:translate-y-[6px]
        `}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start border-b border-black/10 pb-2 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
              {formattedDate}
            </span>
          </div>

          <h1 className="text-xl font-bold font-mono leading-tight">{title}</h1>

          <p className="text-sm opacity-80 line-clamp-3 font-sans">{body}</p>
        </div>
      </Link>
    </div>
  );
};
