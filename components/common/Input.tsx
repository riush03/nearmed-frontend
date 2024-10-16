import React, { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ name, type, handleChange }) => {
  return (
    <div className="col-xl-6">
      <div className="form-group">
        <label className="col-form-label">{name}:</label>
        <input
          size={16}
          type={type}
          placeholder={name}
          className="form-control"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Input;