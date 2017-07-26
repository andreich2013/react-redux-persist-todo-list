import React from 'react'
import { Link } from 'react-router-dom'

export default ({ data: { id, properties: { name, productBrand, originalPrice, reducedPrice, productImagePointer } } }) => (
  <div
    className="offer-list__item"
    style={{backgroundImage: `url(${productImagePointer.itemName})`}}
  >
    <Link to={`/offer/${id}`}>
      {
        reducedPrice && reducedPrice.amount > 0 ?
        (
          <span className="offer-list__item__reduced-price">
            <span>SALE</span>
            <span>
              {reducedPrice.amount} {reducedPrice.currencyCode}
            </span>
          </span>
        )
        :
        <span></span>
      }
      <span>
        <span className="offer-list__item__name">
          <span>{name}</span>
          <span>{productBrand}</span>
        </span>
        <span className="offer-list__item__name">
          <span>Price</span>
          {
            originalPrice && originalPrice.amount > 0 ?
            (
              <span className="offer-list__item__price">
                {originalPrice.amount} {originalPrice.currencyCode}
              </span>
            )
            :
            <span></span>
          }
        </span>
      </span>
    </Link>
  </div>
);