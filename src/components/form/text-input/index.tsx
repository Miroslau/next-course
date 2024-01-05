'use client';
import React, { FC, useEffect, useState } from 'react';

interface TextInput {
  id: number;
  label: string;
  value: string;
  placeholder: string;
  required: boolean;
  type: string;
  inputText: (args?: any) => void;
  name: string;
  autocomplete: string;
}

const Index: FC<TextInput> = ({
  label,
  value,
  placeholder,
  required,
  type,
  inputText,
  id,
  name,
  autocomplete = 'off',
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentValue(event.target?.value);
    inputText(event);
  };

  return (
    <label>
      <span className='font-satoshi text-base font-semibold text-gray-700'>
        {label}{' '}
        <span className='font-normal'>
          (#product, #WebDevelopment, #idea, etc.)
        </span>
        <input
          id={id.toString()}
          name={name}
          value={currentValue}
          onChange={onChangeHandler}
          placeholder={placeholder}
          required={required}
          type={type}
          className='form_input'
          autoComplete={autocomplete}
        />
      </span>
    </label>
  );
};

export default Index;
