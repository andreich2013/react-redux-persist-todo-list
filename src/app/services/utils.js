import _ from 'lodash'
import Guid from 'guid'

const REGEXP = {
  url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
  imageName: /(.*)*.+\.(png|jpg|gif|bmp|jpeg|svg|PNG|JPG|GIF|BMP|JPEG|SVG)$/
}

const formFields = {
  name: {
    field: 'text',
    label: 'Name',
    required: true
  },
  amount: {
    field: 'number',
    min: 0
  },
  currency: {
    field: 'select',
    options: [
      {
        id: Guid.create().value,
        value: 'USD',
        label: 'USD'
      },
      {
        id: Guid.create().value,
        value: 'EURO',
        label: 'EURO'
      },
      {
        id: Guid.create().value,
        value: 'GBP',
        label: 'GBP'
      },
      {
        id: Guid.create().value,
        value: 'RUB',
        label: 'RUB'
      },
      {
        id: Guid.create().value,
        value: 'CHF',
        label: 'CHF'
      }
    ]
  }
};

export const formFieldMapping = {
  "name": formFields.name,
  "category": {
    field: 'select',
    label: 'Category',
    options: [
      {
        id: Guid.create().value,
        value: 'none',
        label: 'None'
      },
      {
        id: Guid.create().value,
        value: 'computers',
        label: 'Computers'
      },
      {
        id: Guid.create().value,
        value: 'laptops',
        label: 'Laptops'
      },
      {
        id: Guid.create().value,
        value: 'smartPhones',
        label: 'Smart Phones'
      },
      {
        id: Guid.create().value,
        value: 'smartTv',
        label: 'Smart TV'
      },
      {
        id: Guid.create().value,
        value: 'tablets',
        label: 'Tablets'
      }
    ]
  },
  description: {
    field: 'textarea',
    label: 'Description',
    maxLength: 256
  },
  productName: {
    ...formFields.name,
    label: 'Product name'
  },
  retailerUrl: {
    field: 'text',
    label: 'Retailer url',
    pattern: REGEXP.url
  },
  productBrand: {
    field: 'select',
    label: 'Product brand',
    options: [
      {
        id: Guid.create().value,
        value: 'none',
        label: 'None'
      },
      {
        id: Guid.create().value,
        value: 'Acer',
        label: 'Acer'
      },
      {
        id: Guid.create().value,
        value: 'LG',
        label: 'LG'
      },
      {
        id: Guid.create().value,
        value: 'SONY',
        label: 'SONY'
      },
      {
        id: Guid.create().value,
        value: 'PHILIPS',
        label: 'PHILIPS'
      },
      {
        id: Guid.create().value,
        value: 'Lenovo',
        label: 'Lenovo'
      },
      {
        id: Guid.create().value,
        value: 'Apple',
        label: 'Apple'
      }
    ]
  },
  'reducedPrice.amount': {
    ...formFields.amount,
    label: 'Reduced price amount'
  },
  'reducedPrice.currencyCode': {
    ...formFields.currency,
    label: 'Reduced price currency'
  },
  'originalPrice.amount': {
    ...formFields.amount,
    label: 'Original price amount'
  },
  'originalPrice.currencyCode': {
    ...formFields.currency,
    label: 'Original price currency'
  },
  'productImagePointer.itemName': {
    field: 'text',
    label: 'Product image pointer name',
    pattern: REGEXP.imageName,
    required: true
  }
};

export function convertToSimpleObject(hash = {}, nextHash = {}, prefix = '') {
  Object.keys(hash).map((key) => {
    if(_.isObject(hash[key])) {
      convertToSimpleObject(hash[key], nextHash, `${key}.`);
    } else {
      nextHash[`${prefix}${key}`] = hash[key];
    }
  });

  return nextHash;
}

function setValueInDeep(hash, key, value) {
  if(!key) {
    return;
  }

  var pathToItem = key.split('.'),
      lastItem = pathToItem.pop();

  for(var i = 0, prop, length = pathToItem.length; i < length; i += 1) {
    prop = pathToItem[i];

    if(hash[prop] === undefined) {
      hash[prop] = {};
    }

    hash = hash[prop];
  }

  hash[lastItem] = value;
};

export function convertToDeepObject(list = []) {
  const hash = {};

  list.forEach((next) => {
    const { name, value } = next;

    if(name.includes('.')) {
      setValueInDeep(hash, name, value);
    } else {
      hash[name] = value;
    }
  });

  return hash;
} 