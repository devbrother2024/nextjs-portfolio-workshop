import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { defaultUrlTransform } from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  p({ children }) {
    return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
  },
  ul({ children }) {
    return <ul className="mb-2 list-disc pl-4 last:mb-0">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="mb-2 list-decimal pl-4 last:mb-0">{children}</ol>;
  },
  li({ children }) {
    return <li className="mb-0.5">{children}</li>;
  },
  code({ className, children, ...props }) {
    const isBlock = className?.startsWith("language-");
    if (isBlock) {
      return (
        <code
          className="block overflow-x-auto rounded-md bg-foreground/10 px-3 py-2 font-mono text-xs"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-foreground/10 px-1 py-0.5 font-mono text-xs"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre({ children }) {
    return <pre className="mb-2 last:mb-0">{children}</pre>;
  },
  a({ href, children }) {
    const safe = defaultUrlTransform(href ?? "");
    if (!safe) return <>{children}</>;
    return (
      <a
        href={safe}
        target="_blank"
        rel="noreferrer noopener"
        className="underline underline-offset-2 hover:opacity-75"
      >
        {children}
      </a>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="mb-2 border-l-2 border-foreground/30 pl-3 text-foreground/70 last:mb-0">
        {children}
      </blockquote>
    );
  },
  strong({ children }) {
    return <strong className="font-semibold">{children}</strong>;
  },
  img() {
    return null;
  },
};

interface ChatbotMarkdownProps {
  children: string;
}

export function ChatbotMarkdown({ children }: ChatbotMarkdownProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      components={components}
      urlTransform={(url) => defaultUrlTransform(url)}
    >
      {children}
    </Markdown>
  );
}
