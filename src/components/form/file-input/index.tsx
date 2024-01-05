import React, { FC, useEffect, useState } from 'react';

interface FileInput {
  id: number;
  label: string;
  value: string;
  placeholder: string;
  required: boolean;
  type: string;
  name: string;
  autocomplete: string;
  inputUpload: (args?: any) => void;
}

const Index: FC<FileInput> = ({ id, label, type, inputUpload, required }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const setImage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const files = (event.target as HTMLInputElement).files;

    if (files) {
      const file = files[0];
      setSelectedImage(URL.createObjectURL(file));
      inputUpload(file);
    }
  };

  return (
    <label>
      <span className='font-satoshi text-base font-semibold text-gray-700'>
        Image for Post
      </span>
      <div className='form_input_file'>
        <input
          id={id.toString()}
          type={type}
          hidden
          onChange={setImage}
          required={required}
        />
        <div>
          {selectedImage ? (
            <img src={selectedImage} alt='' />
          ) : (
            <span>{label}</span>
          )}
        </div>
      </div>
    </label>
  );
};

export default Index;
