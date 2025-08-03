import React from 'react';

type ExternalLinkProps = {
  href: string;
  text: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  text,
  ...props
}: ExternalLinkProps) => {
  return (
    <a
      href={href}
      className="text-blue-600 underline hover:text-blue-800 dark:text-red-900  dark:hover:text-red-700"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {text}
    </a>
  );
};

export default ExternalLink;
