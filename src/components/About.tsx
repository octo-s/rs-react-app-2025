import React from 'react';
import Button from './Button.tsx';
import { useNavigate } from 'react-router';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className=" mx-auto bg-white rounded shadow p-8 mt-12">
      <h1 className="text-3xl font-bold mb-4">About this App</h1>
      <p className="mb-4">
        <b>Author:</b> Tati Lebedeva
      </p>
      <p className="mb-4">
        This project is a React SPA for exploring characters from the Rick and
        Morty universe.
      </p>
      <p>
        Learn more about&nbsp;
        <a
          href="https://rs.school/courses/reactjs"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          RS School React Course
        </a>
      </p>
      <p>
        REST API&nbsp;
        <a
          href="https://rickandmortyapi.com/"
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Rick and Morty API
        </a>
      </p>
      <Button
        data-testid="about-page"
        text={'Back to Home'}
        onClick={() => navigate('/')}
        className="mt-4"
      />
    </div>
  );
};

export default About;
