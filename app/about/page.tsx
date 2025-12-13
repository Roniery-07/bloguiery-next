import { FaBriefcase } from 'react-icons/fa6';

export default function About(){
  return (
    <div className="page">
      <div className="w-full p-4 md:max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-10 items-start m-auto">
        <div className="md:col-span-3 flex flex-col">
          <h1 className="text-3xl font-bold mb-5 leading-none">Trainer Info</h1>

          <section className="card-retro flex bg-secondary p-0 overflow-hidden">
            <div className="w-52 bg-background shrink-0 border-r-2 border-black">
              <img
                src="https://placehold.co/200x240"
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>

            <div className="w-full p-6 flex flex-col justify-center gap-y-3">
              <div>
                <h1 className="text-2xl font-bold">Roniery Abreu</h1>
                <p className="text-sm opacity-80 ">heroniery007@gmail.com</p>
              </div>

              <div className="flex gap-3 mt-auto text-black">
                {/* <div className="p-2 border-2 border-black bg-white text-center w-20">
                  <span className="block font-bold ">2+</span>
                  <span className="text-xs">exper.</span>
                </div>
                <div className="p-2 border-2 border-black bg-white text-center w-20 flex justify-center items-center">
                  
                </div>
                <div className="flex-1 ml-2 flex gap-2">
                  <button className="bg-black text-white px-4 py-2 text-sm font-bold w-full">
                    Session
                  </button>
                </div> */}
                <img src="https://skillicons.dev/icons?i=ts,react,js,nodejs,postgres,mysql," />
              </div>
              <p className="text-sm">
                I&rsquo;m a fullstack developer with experience in typescript,
                react.js, node.js/express, .net/c#, relational databases like
                postgress, mssql and mysql.
              </p>
            </div>
          </section>
        </div>

        <div className="md:col-span-2 flex flex-col h-full">
          <div className="flex justify-between items-end mb-5">
            <h2 className="text-xl font-bold leading-none pt-1.5">
              Work experience
            </h2>
          </div>

          <section className="flex flex-col gap-4">
            <div className="w-full bg-white border-2 border-black p-4 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-2 border-black p-2 h-fit bg-gray-100">
                <FaBriefcase className="text-black" size={16} />
              </div>
              <div>
                <h1 className="text-black text-sm font-bold">
                  Intern JavaScript Developer
                </h1>
                <p className="text-xs font-bold mt-1 text-black">
                  Firecracker Inc.
                </p>
                <p className="text-xs text-gray-500 italic">
                  May 2022 - present
                </p>
              </div>
            </div>

            <div className="w-full bg-white border-2 border-black p-4 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-2 border-black p-2 h-fit bg-gray-100">
                <FaBriefcase className="text-black" size={16} />
              </div>
              <div>
                <h1 className="text-black text-sm font-bold">
                  Junior JavaScript Developer
                </h1>
                <p className="text-xs font-bold mt-1 text-black">
                  Pro Property Maint.
                </p>
                <p className="text-xs text-gray-500 italic">
                  May 2013 - Nov 2022
                </p>
              </div>
            </div>
            <div className="w-full bg-white border-2 border-black p-4 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-2 border-black p-2 h-fit bg-gray-100">
                <FaBriefcase className="text-black" size={16} />
              </div>
              <div>
                <h1 className="text-black text-sm font-bold">
                  Junior JavaScript Developer
                </h1>
                <p className="text-xs font-bold mt-1 text-black">
                  Pro Property Maint.
                </p>
                <p className="text-xs text-gray-500 italic">
                  May 2013 - Nov 2022
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className="col-span-full gap-y-4 flex flex-col">
          <h1 className="text-2xl font-bold ">Some Projects</h1>
          <div className="card-retro w-full h-20 p-4">
            <h1>Bag-Shop</h1>
          </div>
          <div className="card-retro w-full h-20 p-4">
            <h1>Bloguiery</h1>
          </div>
        </section>
      </div>
    </div>
  );
};
