import React from 'react';
import { fetchCharacters, type Character } from '../api/apiClient';
import Header from './Header';
import SearchBar from './SearchBar.tsx';
import Results from './Results';
import ErrorButton from './ErrorButton.tsx';

interface AppProps {}

interface AppState {
  searchQuery: string;
  loading: boolean;
  error: string | null;
  characters: Character[];
}

const defaultState = {
  searchQuery: '',
  loading: false,
  error: null,
  characters: [],
};

export default class App extends React.Component<AppProps, AppState> {
  state: AppState = defaultState;
  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.setState({ searchQuery: savedQuery }, () => {
      this.loadCharacters(savedQuery);
    });
  }

  loadCharacters = async (searchQuery: string) => {
    this.setState({ loading: true, error: null });

    try {
      const data = await fetchCharacters(searchQuery.trim());
      this.setState({
        characters: data.results,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching characters:', error);
      this.setState(defaultState);
    }
  };

  handleSearch = (newSearchQuery: string) => {
    this.setState({ searchQuery: newSearchQuery }, () => {
      this.loadCharacters(newSearchQuery);
    });
  };

  render() {
    const { searchQuery, loading, error, characters } = this.state;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-3xl p-4 space-y-4">
          <Header />
          <SearchBar initialValue={searchQuery} onSearch={this.handleSearch} />
          <Results characters={characters} loading={loading} error={error} />
          <ErrorButton />
        </div>
      </div>
    );
  }
}
