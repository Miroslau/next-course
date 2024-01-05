'use client';
import React, { FC, useEffect, useState } from 'react';

interface TextAreaInputProps {
  id: number;
  label: string;
  value: string;
  placeholder: string;
  required: boolean;
  inputText: (args?: any) => void;
  name: string;
  autocomplete: string;
}

const Index: FC<TextAreaInputProps> = ({
  id,
  label,
  value,
  placeholder,
  required,
  inputText,
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
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setCurrentValue(event.target?.value);
    inputText(event);
  };

  return (
    <label>
      <span className='font-satoshi text-base font-semibold text-gray-700'>
        {label}
      </span>
      <textarea
        id={id.toString()}
        name={name}
        value={currentValue}
        placeholder={placeholder}
        required={required}
        onChange={onChangeHandler}
        className='form_textarea'
        autoComplete={autocomplete}
      />
    </label>
  );
};

export default Index;
