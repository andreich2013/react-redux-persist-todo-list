import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import OfferListItem from './OfferListItem.jsx'


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
          <div className="offer-list__items">
            {
              list.map((next) => {
                return (<OfferListItem key={next.id} data={next} />)
              })
            }
          </div>
        </div>
      </div>
    );
  }

}