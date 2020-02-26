import React from 'react';

export default function Product({
  brand,
  model,
  year,
  price,
  description,
  datePublished
}) {
  return (
    <div>
      <h2>{brand}</h2>
      <h3>
        {model}, {year}
      </h3>
      <h4>{price}</h4>
      <h5>{datePublished}</h5>
      <p>{description}</p>
    </div>
  );
}
