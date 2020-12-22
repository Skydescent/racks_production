import React from "react";
import InputsField from "./InputsField";

const Calculator = ({ fieldsSet }) => {
  return (
    <div>
      {fieldsSet.map((field) => (
        <InputsField
          title={field.title}
          propGroup={field.propGroup}
          propName={field.propName}
          propValues={field.propValues}
          activeInputs={field.activeInputs}
          currentValue={field.currentValue}
          handleInputChange={field.handleInputChange}
        />
      ))}
      <div className="flex grid_2 range">Sliders</div>
      <div className="total">Total</div>
    </div>
  );
};

export default Calculator;
