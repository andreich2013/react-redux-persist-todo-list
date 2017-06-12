import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { list } = this.props;

    return (
      <div className="offer-list__container">
        <div className="offer-list">
          <div className="offer-list__actions">
            <h1 className="offer-list__title">
              Offer's List
            </h1>
            <Link className="offer-list__actions__button" to={'/offer/create'}>
              Create new child offer
            </Link>
          </div>
          <div key="offer-list-header" className="offer-list__item">
            <div className="offer-list__item__cell">
              Name
            </div>
            <div className="offer-list__item__cell">
              Original price
            </div>
            <div className="offer-list__item__cell">
              reduced price
            </div>
            <div className="offer-list__item__cell">
              Product image pointer
            </div>
          </div>
          {
            list.map((next) => {
              const { name, originalPrice, reducedPrice, productImagePointer } = next.properties;

              return <div key={next.id} className="offer-list__item">
                      <div className="offer-list__item__cell">
                        <Link to={`/offer/${next.id}`}>
                          {name}
                        </Link>
                      </div>
                      <div className="offer-list__item__cell">
                        {
                          originalPrice ? 
                          `${originalPrice.amount} ${originalPrice.currencyCode}`
                          :
                          ''
                        }
                      </div>
                      <div className="offer-list__item__cell">
                        {
                          reducedPrice ? 
                          `${reducedPrice.amount} ${reducedPrice.currencyCode}`
                          :
                          ''
                        }
                      </div>
                      <div className="offer-list__item__cell">
                        {
                          productImagePointer ? 
                          `${productImagePointer.itemName}`
                          :
                          ''
                        }
                      </div>
                    </div>
            })
          }
        </div>
      </div>
    );
  }

}