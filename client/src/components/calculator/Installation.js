import React from "react";
import CalcRadioInput from "./CalcRadioInput";

const Installation = ({ installation, productState, hadleInstallChange }) => {
  return (
    <div className="range">
      <strong>{installation.title}</strong>
      {installation.types.map((item) => (
        <CalcRadioInput
          key={item.type}
          title={item.name}
          value={item.type}
          propName={item.type}
          onChange={() => hadleInstallChange(item.type)}
          isChecked={item.type === productState.installation}
          isActive={true}
        />
      ))}
    </div>
  );
};

export default Installation;
