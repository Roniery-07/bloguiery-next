import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// eslint-disable-next-line
export const CodeBlock = ({ className, children, ...props }: any) => {

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : null;

  const handleCopy = async () => {
    const textToCopy = String(children).replace(/\n$/, '');
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!match) {
    return (
      <code
        className={`${className || ''} text-pink-500 rounded px-1 italic bg-stone-800`}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative group rounded-lg overflow-hidden my-4 bg-[#1E1E1E]">
      <div className="flex justify-between items-center bg-[#2d2d2d] px-4 py-2 text-xs text-gray-400 select-none">
        <span className="uppercase font-bold tracking-wider">{language}</span>
      </div>

      <SyntaxHighlighter
        {...props}
        PreTag="div"
        language={language}
        style={dracula}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          borderRadius: '0 0 8px 8px',
          fontSize: '0.9rem',
          backgroundColor: 'transparent',
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};
