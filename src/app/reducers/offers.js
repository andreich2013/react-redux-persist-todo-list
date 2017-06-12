import Guid from 'guid'
import { LOCATION_CHANGE } from 'react-router-redux';
import * as actions from '../actions';
import * as utils from '../services/utils';

const defaultItem = {
  properties: {
    name: '',
    category: '',
    description: '',
    productName: '',
    retailerUrl: '',
    productBrand: '',
    reducedPrice: {
      amount: 0,
      currencyCode: ''
    },
    originalPrice: {
      amount: 0,
      currencyCode: ''
    },
    productImagePointer: {
      itemName: ''
    }
  },
  createdAt: null
}

const initialState = {
  list: [],
  item: {},
  strategy: null
};

const reducers = {
  [actions.CREATE_OFFERS_LIST_ITEM]: (state, action) => {
    const { list } = state;
  	const nextItem = {
      id: Guid.create().value,
      ...action.payload,
      createdAt: (new Date()).toISOString()
    };

  	return { 
  	  ... state,
  	  list: [ ...list, nextItem ],
      strategy: null,
      item: {}
  	};
  },
  [actions.READ_OFFERS_LIST_ITEM]: (state, action) => {
    const { id } = action.payload;

    return { 
      ... state,
      item: list.find((next) => next.id === id)
    };
  },
  [actions.UPDATE_OFFERS_LIST_ITEM]: (state, action) => {
    const { payload } = action;
    const { list } = state;
    const index = list.findIndex((next) => next.id === payload.id);
    const nextList = list.slice();
    const nextItem = {
      ...list[index],
      ...payload
    };

    nextList.splice(index, 1, nextItem);

    return { 
      ... state,
      list: nextList,
      item: nextItem
    };
  },
  [actions.DELETE_OFFERS_LIST_ITEM]: (state, action) => {
    const { id } = action.payload;
    const { list } = state;
    const index = list.findIndex((next) => next.id === id);
    const nextList = list.slice();

    nextList.splice(index, 1);

    return { 
      ... state,
      list: nextList,
      item: {}
    };
  },
  [LOCATION_CHANGE]: (state, action) => {
    const { list, item } = state;
    const { pathname } = action.payload;
    const values = pathname.split('/');

    if(!values[2]) {
      return state;
    }

    switch(values[2]) {
      case 'create':
        return { 
          ... state,
          strategy: 'create',
          item: defaultItem
        };
      case 'list':
        return { 
          ... state,
          strategy: null,
          item: {}
        };
      default:
        return { 
          ... state,
          strategy: 'update',
          item: list.find((next) => next.id === values[2])
        };
    }
  }
}

export default (state = initialState, action) => {
  return typeof reducers[action.type] === 'function' ? reducers[action.type](state, action) : state;
};