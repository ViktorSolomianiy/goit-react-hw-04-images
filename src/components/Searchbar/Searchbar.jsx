import { useState } from 'react';
import './Searchbar.css';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast('Enter a search turn..');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          onChange={handleInputChange}
          className="input"
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.objectOf({
    query: PropTypes.string.isRequired,
  }),
};

// export class oldSearchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleInputChange = e => {
//     const inputValue = e.target.value.trim();

//     this.setState({ query: inputValue });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     this.props.onSubmit(this.state.query);

//     if (this.state.query.trim() === '') {
//       toast('Enter a search turn..');
//       return;
//     }

//     this.setState({ query: '' });
//   };

//   render() {
//     const { query } = this.state;

//     return (
//       <header className="searchbar">
//         <form className="form" onSubmit={this.handleSubmit}>
//           <button type="submit" className="button">
//             <span className="button-label">Search</span>
//           </button>

//           <input
//             onChange={this.handleInputChange}
//             className="input"
//             value={query}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
