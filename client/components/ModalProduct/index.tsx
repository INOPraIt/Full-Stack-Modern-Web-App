import React, { useState } from 'react';
import './style.scss';
import { Product } from '@/types/Product';
import Image from 'next/image';

type ModalProductProps = {
  product: Product;
  onClose: () => void;
};

const ModalProduct: React.FC<ModalProductProps> = ({ product, onClose }) => {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imagePath = product.image;
  const fullImageUrl = `${apiUrl}${imagePath.replace(/^\./, '')}`;

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Минимум 1
  };

  const totalPrice = product.price * quantity

  return (
    <div className='containerModalProduct'>
      <div className='windowModal'>
        <button className='colose' onClick={onClose}>
          Закрыть
        </button>
        <div className='blocksProduct'>
          <div className='imageBlockModalProduct'>
            <div className='previewImages'>
              <div className='imageBlockPreview'>
                <Image
                  src={fullImageUrl}
                  width={900}
                  height={500}
                  className='previewImage'
                  alt={product.named}
                />
              </div>
              <div className='imageBlockPreview'>
                <Image
                  src={fullImageUrl}
                  width={900}
                  height={500}
                  className='previewImage'
                  alt={product.named}
                />
              </div>
              <div className='imageBlockPreview'>
                <Image
                  src={fullImageUrl}
                  width={900}
                  height={500}
                  className='previewImage'
                  alt={product.named}
                />
              </div>
              <div className='imageBlockPreview'>
                <Image
                  src={fullImageUrl}
                  width={900}
                  height={500}
                  className='previewImage'
                  alt={product.named}
                />
              </div>
            </div>
            <div className='theMainPicture'>
              <div className='blockMainPage'>
                <Image
                  src={fullImageUrl}
                  width={900}
                  height={500}
                  className='mainImage'
                  alt={product.named}
                />
              </div>
            </div>
          </div>
          <div className='blockBasicInformation'>
            <div className='namedProduct'>
              <p className='textNamedProduct'>
                {product.named}
              </p>
              <div className='reviewsProduct'>
                <div className='reviews'>
                  <p className='reviewsTextOne'>Отзывов:</p>
                  <p className='reviewsTextTwo'>220</p>
                </div>
                <div className='reviews'>
                  <p className='reviewsTextOne'>Купили:</p>
                  <p className='reviewsTextTwo'>1000</p>
                </div>
              </div>
              <hr className='lineReviewsProduct' />
              <div className='thirdPartyFunctions'>
                <p className='headerPartyFunctions'>Модель</p>
                <div className='blockPartyFunctions'>
                  <div className='modelProduct'>
                    M3 CPU
                  </div>
                  <div className='modelProduct'>
                    M3 pro CPU
                  </div>
                </div>
              </div>
              <div className='thirdPartyFunctions'>
                <p className='headerPartyFunctions'>Память</p>
                <div className='blockPartyFunctions'>
                  <div className='modelProduct'>
                    256GB
                  </div>
                  <div className='modelProduct'>
                    512GB
                  </div>
                  <div className='modelProduct'>
                    1TB
                  </div>
                </div>
              </div>
              <hr className='lineReviewsProduct' />
              <div className='descriptionProduct'>
                <p className='descriptionHeaderProduct'>Описание:</p>
                <p className='textDescriptionProduct'>
                  {product.description}
                </p>
              </div>
            </div>
          </div>
          <div className='blockActionsWithTheProduct'>
            <div className='blockAddToCart'>
              <p className='infoAboutProduct'>
                Купить сейчас
              </p>
              <div className='quantityProduct'>
                <p className='quantityProductText'>
                  Количество
                </p>
                <div className='quantityControls'>
                  <button onClick={handleDecrement} className='quantityBtn'>–</button>
                  <span className='quantityValue'>{quantity}</span>
                  <button onClick={handleIncrement} className='quantityBtn'>+</button>
                </div>
              </div>
              <hr className='lineReviewsProduct' />
              <div className='quantityProduct'>
                <p className='quantityProductText'>
                  Итого:
                </p>
                <p className='quantityProductText'>
                  $ {totalPrice}
                </p>
              </div>
              <button className='addToCartBtn'>
                + В корзину
              </button>
              <button className='saleNow'>
                Купить сейчас
              </button>
              <div className='addToLike'>
                <p className='textAddToLike'>Нравится</p>
                <div className='vl'></div>
                <p className='textAddToLike'>Поделиться</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalProduct;