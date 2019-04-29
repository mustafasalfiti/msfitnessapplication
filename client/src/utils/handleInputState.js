import React from "react";

export default function handleInputState(intialValues) {
  const [values, setValues] = React.useState({ ...intialValues });
  function handleChange(event) {
    event.persist();
    setValues(prevValues=> ({
      ...prevValues , [event.target.name]:event.target.value
    }))
  }

  return {
    values,
    handleChange
  };
}
