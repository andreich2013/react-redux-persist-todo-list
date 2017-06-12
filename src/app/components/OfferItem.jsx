import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as utils from '../services/utils'
import Field from './Field.jsx'

export default class extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    strategy: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      fields: this.mapDataToFields(props.item.properties),
      isValid: false,
      title: props.strategy === 'create' ? 'Create offer' : 'Update offer'
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if(this.props.item === props.item) {
      return;
    }

    const fields = this.mapDataToFields(props.item.properties);

    this.setState({
      fields: fields,
      isValid: this.isValid(fields)
    });
  }

  mapDataToFields(data) {
    if(!data) {
      return [];
    }

    const nextData = utils.convertToSimpleObject(data, {});

    return Object.keys(utils.formFieldMapping).map((key) => {
      return {
        ...utils.formFieldMapping[key],
        key: key,
        name: key,
        value: nextData[key],
        onChange: this.onChange
      };
    });
  }

  mapFieldsToData(data) {
    if(!data) {
      return {};
    }

    return utils.convertToDeepObject(data);
  }

  isValid(list = []) {
    return list.every((next) => {
      const { value, required, pattern } = next;

      if(!!required && !value) {
        return false;
      }

      if(!!pattern && !!value && !pattern.test(value)) {
        return false;
      }

      return true;
    });
  }

  onChange(event) {
    const { target } = event;
    const { fields } = this.state;
    const field = fields.find((next) => next.name === target.name);

    if(field) {
      field.value = target.value;
    }

    this.setState({
      fields: [ ...fields ],
      isValid: this.isValid(fields)
    });
  }

  onCancel(event) {
    const { cancel } = this.props;

  	event.preventDefault();

  	cancel();
  }

  onRemove(event) {
    const { $delete, item: { id } } = this.props;

    event.preventDefault();

    $delete({ id });
  }

  onSubmit(event) {
    const { item, strategy, create, update } = this.props;
    const { isValid, fields } = this.state;

    event.preventDefault();

    if(!isValid) {
      return;
    }

    item.properties = this.mapFieldsToData(fields);

    switch(strategy) {
      case 'create': create(item);
        break;
      case 'update': update(item);
        break;
    }
  }

  render() {
    const { id, strategy } = this.props;
    const { isValid, fields, title } = this.state;

    return (
      <div className="offer-list__container">
        <form
          key={id}
          className="offer-form"
          onSubmit={::this.onSubmit}>
          <h1 className="offer-form__title">
            {title}
          </h1>
          <div className="offer-form__fields">
          	{
          	  fields.map((next) => (
                <Field
                  { ...next }
                  key={`${id}-${next.key}`}
                  onChange={::this.onChange}
                />
              ))
            }
          </div>
          <div className="offer-form__actions">
            <button className="offer-form__actions__button cancel" onClick={::this.onCancel}>
              Cancel
            </button>
            <input className="offer-form__actions__button" type="submit" value="Submit" disabled={!isValid}/>
            {
              strategy === 'update' ?
              <button className="offer-form__actions__button remove" onClick={::this.onRemove}>
                Remove
              </button>
              :
              ''
            }
          </div>
        </form>
      </div>
    );
  }

}