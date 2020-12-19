import React from 'react';
import CalcRadioInput from './CalcRadioInput';

const InputsField = ({
  title,
  propGroup,
  propName,
  propValues,
  currentValue,
  activeInputs,
  handleInputChange,
}) => (
  <div className="range">
    {title === '' || <strong>{title}</strong>}

    {propValues.map(item => (
      <CalcRadioInput
        key={`${propName}_${item.title ?? item}`}
        title={item.title ?? item}
        value={item.value ?? item}
        propName={propName}
        onChange={() =>
          handleInputChange(propGroup, propName, item.value ?? item)
        }
        isChecked={currentValue === (item.value ?? item)}
        isActive={
          activeInputs === null
            ? true
            : activeInputs.includes(item.value ?? item)
        }
      />
    ))}
  </div>
);

export default InputsField;
