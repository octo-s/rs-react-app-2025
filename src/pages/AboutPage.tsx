import React from 'react';
import { useNavigate } from 'react-router';
import { TEXTS } from '../texts.ts';
import Button from '../components/Button.tsx';
import ExternalLink from '../components/ExternalLink.tsx';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className=" mx-auto bg-white rounded shadow p-8 mt-12 dark:bg-gray-300">
      <h1 className="text-3xl font-bold mb-4 dark:text-red-900">
        {TEXTS.aboutTitle}
      </h1>
      <p className="mb-4">
        <b className="dark:text-red-900">{TEXTS.author}</b>&nbsp;
        {TEXTS.authorName}
      </p>
      <p className="mb-4">{TEXTS.aboutText}</p>
      <p>
        {TEXTS.learnMore}&nbsp;
        <ExternalLink
          text={TEXTS.rsSchool}
          href="https://rs.school/courses/reactjs"
        />
      </p>
      <p>
        {TEXTS.restApi}&nbsp;
        <ExternalLink
          text={TEXTS.rickApi}
          href="https://rickandmortyapi.com/"
        />
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

export default AboutPage;
