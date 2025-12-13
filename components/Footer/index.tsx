import { Button } from '../Button';
import { Linkedin, Mail, Github } from 'lucide-react';

export const Footer = () => {
  const socialLinkClass = `
    flex items-center justify-center p-3
    bg-white text-black
    border-2 border-black
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    transition-all duration-200
    hover:translate-x-[2px] hover:translate-y-[2px] 
    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
    active:translate-x-[4px] active:translate-y-[4px] 
    active:shadow-none
  `;

  return (
    <footer className="w-full bg-secondary border-t-2 border-black p-8 text-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-10">
        <form
          action=""
          className="w-full max-w-md bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3"
        >
          <h1 className="text-xl font-bold uppercase">Subscribe Newsletter</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-sm">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              className="w-full p-2 bg-gray-50 border-2 border-black outline-none 
              focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200"
            />
          </div>

          <Button className="w-full bg-secondary">Subscribe</Button>
        </form>

        <div className="flex flex-col items-center gap-4">
          <p className="font-bold uppercase tracking-widest">Connect with me</p>

          <div className="flex gap-4">
            <a
              href="https://github.com/Roniery-07"
              target="_blank"
              rel="noreferrer"
              className={socialLinkClass}
              aria-label="Visit GitHub"
            >
              <Github className="w-6 h-6" />
            </a>

            <a
              href="https://linkedin.com/in/roniery-abreu"
              target="_blank"
              rel="noreferrer"
              className={socialLinkClass}
              aria-label="Visit LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>

            <a
              href="mailto:seu-email@exemplo.com"
              className={socialLinkClass}
              aria-label="Send Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
