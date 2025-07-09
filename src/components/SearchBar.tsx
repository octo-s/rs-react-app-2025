import React from 'react';

interface SearchProps {
  onSearch: (searchQuery: string) => void;
  initialValue: string;
}

interface SearchState {
  value: string;
}

export default class SearchBar extends React.Component<
  SearchProps,
  SearchState
> {
  state: SearchState = {
    value: this.props.initialValue || '',
  };

  componentDidUpdate(prevProps: SearchProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ value: this.props.initialValue });
    }
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.value.trim();
    localStorage.setItem('searchQuery', trimmed);
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div className="bg-white p-4 rounded shadow">
        <div className="flex space-x-2  flex items-center justify-center">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            className="flex-1 px-4 py-2 border rounded"
            placeholder="Search characters by name..."
          />
          <button
            onClick={this.handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
