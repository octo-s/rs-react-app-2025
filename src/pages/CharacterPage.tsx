import { useParams, useNavigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchCharacterById } from '../api/apiClient';
import type { Character } from '../__utils__/characters.ts';
import { TEXTS } from '../texts.ts';
import Spinner from '../components/Spinner.tsx';
import CharacterDetails from '../components/CharacterDetails.tsx';

const CharacterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCharacterById(id)
      .then((result) =>
        result.data ? setCharacter(result.data) : setLoading(false)
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleClose = () => navigate(`/${location.search}`);

  return (
    <div className="w-[35%] min-h-full relative">
      <div className="sticky top-0">
        <button
          className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-black shadow transition"
          onClick={handleClose}
          aria-label="Close details"
          type="button"
        >
          <span className="text-2xl leading-none font-bold">×</span>
        </button>
        {loading && <Spinner />}
        {!character && !loading && (
          <div className="p-4 text-red-600">{TEXTS.noCharacter}</div>
        )}
        {character && !loading && <CharacterDetails character={character} />}
      </div>
    </div>
  );
};

export default CharacterPage;
