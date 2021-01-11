import React from "react";
import CalcRadioInput from "./CalcRadioInput";

const Installation = ({ installation, productState, handleStateChange }) => {
  const hadleInstallChange = (installType) => {
    const newProductState = { ...productState };
    newProductState.installation = installType;
    handleStateChange(newProductState);
  };

  return (
    <div className="range">
      <strong>{installation.title}</strong>
      {installation.types.map((item) => (
        <CalcRadioInput
          key={productState.name ? productState.name + item.type : item.type}
          title={item.name}
          value={item.type}
          propName={
            productState.name ? productState.name + item.type : item.type
          }
          onChange={() => hadleInstallChange(item.type)}
          isChecked={item.type === productState.installation}
          isActive={true}
        />
      ))}
    </div>
  );
};

export default Installation;
