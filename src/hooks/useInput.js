import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange({ target }) {
    setValue(target.value);
  }

  function resetValue() {
    setValue(defaultValue);
  }

  return [value, handleValueChange, setValue, resetValue];
}

export default useInput;
