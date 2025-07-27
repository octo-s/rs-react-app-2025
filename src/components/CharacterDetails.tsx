import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { type Character, fetchCharacterById } from '../api/apiClient';
import Spinner from './Spinner.tsx';

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleClose = () => navigate('/');

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
          <div className="p-4 text-red-600">Character not found</div>
        )}
        {character && !loading && (
          <div className="bg-white p-4 pt-14 rounded shadow min-h-[200px]">
            <h2 className="text-xl font-bold mb-3 text-gray-900">
              {character.name}
            </h2>
            <div className="w-full flex-1 flex items-center justify-center mb-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-full object-cover rounded-xl max-h-56 shadow"
              />
            </div>
            <div className="text-m space-y-1 mt-auto">
              <div>
                <span className="font-semibold text-gray-600 mr-1">
                  Status:
                </span>
                <span className="text-gray-800">{character.status}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600 mr-1">
                  Species:
                </span>
                <span className="text-gray-800">{character.species}</span>
              </div>
              {character.type && (
                <div>
                  <span className="font-semibold text-gray-600 mr-1">
                    Type:
                  </span>
                  <span className="text-gray-800">{character.type}</span>
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-600 mr-1">
                  Gender:
                </span>
                <span className="text-gray-800">{character.gender}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600  mr-1">
                  Origin:
                </span>
                <span className="text-gray-800">{character.origin.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600 mr-1">
                  Location:
                </span>
                <span className="text-gray-800">{character.location.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600 mr-1">
                  Created:
                </span>
                <span className="text-gray-800">
                  {new Date(character.created).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetails;
