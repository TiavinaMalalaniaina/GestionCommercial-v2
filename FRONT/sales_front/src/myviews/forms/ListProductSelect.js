import { CFormLabel, CFormSelect } from "@coreui/react";
import { useState } from "react";
import Select from "react-select";

  const ListProductSelect = ({ options, selectedOptions, onChange }) => {
    return (
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={onChange}
      />
    );
  };

export default ListProductSelect
