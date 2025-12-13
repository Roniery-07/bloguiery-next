import { Button } from '@/components/Button';

export default async function Home() {
  return (
    <div className="page">
      <div className="w-full p-4 md:max-w-5xl grid grid-cols-1 md:grid-cols-3 min-h-full gap-4">
        <div className="col-span-1 md:col-span-2 card-retro flex flex-col gap-4 justify-center">
          <h1 className="text-xl font-bold uppercase">Title</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
            omnis eos necessitatibus aut magnam, iusto quisquam odit cupiditate,
            eum odio quod. Repudiandae eum fugit totam animi corporis deleniti
            saepe dolore?
          </span>
          <Button className="w-full bg-secondary">see more</Button>
        </div>
        <div className="col-span-1 card-retro">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
          omnis eos necessitatibus aut magnam, iusto quisquam odit cupiditate,
          eum odio quod. Repudiandae eum fugit totam animi corporis deleniti
          saepe dolore?
        </div>
      </div>
    </div>
  );
};
