import React from 'react';
import Button from './Button.tsx';
import { useNavigate } from 'react-router';
import { TEXTS } from '../texts.ts';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className=" mx-auto bg-white rounded shadow p-8 mt-12">
      <h1 className="text-3xl font-bold mb-4">{TEXTS.aboutTitle}</h1>
      <p className="mb-4">
        <b>{TEXTS.author}</b>&nbsp;{TEXTS.authorName}
      </p>
      <p className="mb-4">{TEXTS.aboutText}</p>
      <p>
        {TEXTS.learnMore}&nbsp;
        <a
          href="https://rs.school/courses/reactjs"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {TEXTS.rsSchool}
        </a>
      </p>
      <p>
        {TEXTS.restApi}&nbsp;
        <a
          href="https://rickandmortyapi.com/"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {TEXTS.rickApi}
        </a>
      </p>
      <Button
        data-testid="about-page"
        text={TEXTS.backToHome}
        onClick={() => navigate('/')}
        className="mt-4"
      />
    </div>
  );
};

export default About;
