import React from 'react';
import { FaStar } from 'react-icons/fa';

type Props = {
  rating: number; // от 0 до 5
  onRate?: (value: number) => void;
};

const StarRating: React.FC<Props> = ({ rating, onRate }) => {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => onRate?.(star)}
          style={{
            color: star <= rating ? '#FFD700' : '#ccc',
            cursor: onRate ? 'pointer' : 'default',
            fontSize: '20px',
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;