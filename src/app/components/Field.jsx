import Guid from 'guid'
import React, { Component } from 'react'

const renderStrategies = {
  text: (props) => (<input type="text" { ...props }/>),
  number: (props) => (<input type="number" { ...props }/>),
  password: (props) => (<input type="password" { ...props }/>),
  email: (props) => (<input type="email" { ...props }/>),
  textarea: (props) => (<textarea { ...props }/>),
  select: (props) => {
    const nextProps = { ...props };

    delete nextProps.options;

    return (
      <select { ...nextProps }>
        {
          props.options.map((next) => {
            return (
              <option
                key={Guid.create().value}
                value={next.value}
              >
                {next.label}
              </option>
            )
          })
        }
      </select>
    );
  }
}

export default (props) => {
  const { name, field, value, pattern, required } = props;
  const nextProps = { ...props };
  let errorText;

  if(!!required && !value) {
    errorText = 'This field is required';
  } else if(!!pattern && !!value && !pattern.test(value)) {
    errorText = 'Does not match the field pattern';
  }

  delete nextProps.field;

  return (
    <div className="offer-form__fields__block">
      <label className="offer-form__fields__block__label">
        {props.label}
      </label>
      {renderStrategies[field]({
        ...nextProps,
        pattern: pattern && pattern.toString().substring(1, pattern.toString().lastIndexOf('/'))
      })}
      <span className="offer-form__fields__block__error">
        {errorText}
      </span>
    </div>
  );
}