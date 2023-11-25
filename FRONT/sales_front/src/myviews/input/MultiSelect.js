import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ options, selectedOptions, onChange }) => {
  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={onChange}
    />
  );
};

export default MultiSelect;
