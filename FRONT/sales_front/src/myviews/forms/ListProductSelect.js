import { CFormLabel, CFormSelect } from "@coreui/react";
import { useState } from "react";
import Select from "react-select";

  const ListProductSelect = ({ options, selectedOptions, onChange }) => {
    const handleChange=(selected)=>{
      onChange(selected)
    }

    return (
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
      />
    );
  };

export default ListProductSelect
