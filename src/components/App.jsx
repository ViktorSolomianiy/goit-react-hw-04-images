import { useState, useEffect } from 'react';
import * as API from '../services/api';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      setStatus('pending');
      getImages(searchQuery, 1);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > 1) {
      getImages(searchQuery, currentPage);
    }
  }, [currentPage, searchQuery]);

  const getImages = (searchQuery, currentPage) => {
    API.fetchImage(searchQuery, currentPage)
      .then(response => {
        setImages(prevState => [...prevState, ...response.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
      });
  };

  const loadMoreBtn = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = query => {
    if (query === searchQuery) {
      return;
    }

    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
  };

  const openModal = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);

    setShowModal(!showModal);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} images={images} />

      <ImageGallery
        images={images}
        status={status}
        error={error}
        onLoadMore={loadMoreBtn}
        openModal={openModal}
      />

      {showModal && (
        <Modal
          onClose={() => setShowModal(!showModal)}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}

      <ToastContainer />
    </div>
  );
}

// const getImages = () => {
//   API.fetchImage(searchQuery, currentPage)
//     .then(response => {
//       setImages(prevState => [...prevState, ...response.hits]);
//       setCurrentPage(prevPage => prevPage + 1);
//       setStatus('resolved');
//     })
//     .catch(error => {
//       setError(error);
//       setStatus('rejected');
//     });
// };

// class oldApp extends Component {
//   state = {
//     images: [],
//     searchQuery: '',
//     currentPage: 1,
//     status: 'idle',
//     showModal: false,
//     error: '',
//     largeImageURL: '',
//     tags: '',
//   };

//   handleFormSubmit = query => {
//     this.setState({ searchQuery: query, currentPage: 1, images: [] });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevValue = prevState.searchQuery;
//     const nextValue = this.state.searchQuery;

//     if (prevValue !== nextValue) {
//       this.setState({ status: 'pending' });
//       this.getImages();
//     }
//   }

//   getImages = () => {
//     const { searchQuery, currentPage } = this.state;

//     if (searchQuery.trim() === '') {
//       return;
//     } else {
//       try {
//         API.fetchImage(searchQuery, currentPage)
//           .then(response => {
//             this.setState(({ images, currentPage }) => ({
//               images: [...images, ...response.hits],
//               currentPage: currentPage + 1,
//               status: 'resolved',
//             }));
//           })
//           .catch(error => this.setState({ error, status: 'rejected' }));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   onLoadMore = () => {
//     this.getImages();
//   };

//   openModal = (largeImageURL, tags) => {
//     this.setState({ largeImageURL, tags });

//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { images, status, error, showModal, largeImageURL, tags } =
//       this.state;

//     return (
//       <div>
//         <Searchbar onSubmit={this.handleFormSubmit} images={images} />

//         <ImageGallery
//           images={images}
//           status={status}
//           error={error}
//           onLoadMore={this.onLoadMore}
//           openModal={this.openModal}
//         />

//         {showModal && (
//           <Modal
//             onClose={this.toggleModal}
//             largeImageURL={largeImageURL}
//             tags={tags}
//           />
//         )}

//         <ToastContainer />
//       </div>
//     );
//   }
// }
