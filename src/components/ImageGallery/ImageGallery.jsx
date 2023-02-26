import './ImageGallery.css';

import PropTypes from 'prop-types';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export function ImageGallery({ status, error, images, onLoadMore, openModal }) {
  if (status === 'idle') {
    return <h2 className="gallery-title">There is nothing here yet... 🙄</h2>;
  }

  if (status === 'pending') {
    return Loader();
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  if (status === 'resolved' && images.length !== 0) {
    return (
      <>
        <ul className="gallery">
          {images.map(({ id, tags, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                id={id}
                tags={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                openModal={() => openModal(largeImageURL, tags)}
              />
            );
          })}
        </ul>

        <Button onClick={onLoadMore} />
      </>
    );
  } else {
    return <h2 className="gallery-title">Nothing has been given.. 😟 </h2>;
    // return toast('Nothing has been given..');
  }
}

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func,
  openModal: PropTypes.func.isRequired,
};

// export class oldImageGallery extends Component {
//   render() {
//     const { status, error, images, onLoadMore, openModal } = this.props;

//     if (status === 'idle') {
//       return <h2 className="gallery-title">There is nothing here yet... 🙄</h2>;
//     }

//     if (status === 'pending') {
//       return Loader();
//     }

//     if (status === 'rejected') {
//       return <h1>{error.message}</h1>;
//     }

//     if (status === 'resolved' && images.length !== 0) {
//       return (
//         <>
//           <ul className="gallery">
//             {images.map(({ id, tags, webformatURL, largeImageURL }) => {
//               return (
//                 <ImageGalleryItem
//                   key={id}
//                   id={id}
//                   tags={tags}
//                   webformatURL={webformatURL}
//                   largeImageURL={largeImageURL}
//                   openModal={() => openModal(largeImageURL, tags)}
//                 />
//               );
//             })}
//           </ul>

//           <Button onClick={onLoadMore} />
//         </>
//       );
//     } else {
//       return <h2 className="gallery-title">Nothing has been given.. 😟 </h2>;
//       // return toast('Nothing has been given..');
//     }
//   }
// }
