import { useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductItem = ({id, image, name}) => {
    // const {currency} = useContext(ShopContext);
    const imageUrl = image && image[0] ? image[0] : 'default-image.png';
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden relative'>
                {!imageLoaded && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-4 h-4 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin'></div>
                    </div>
                )}
                <img 
                    className={`hover:scale-110 transition ease-in-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    src={imageUrl} 
                    alt={name}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'></p>
        </Link>
    )
}

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductItem