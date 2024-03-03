import React from 'react'

import Select from 'react-select'

function Selector ({ value, label }: { value: number[], label: string[] }): JSX.Element {
  console.log(value, label)

  const options = label.map((el, index) => {
    return {
      value: value[index],
      label: el
    }
  })
  return (
    <Select options={options}/>
  )
}

export default Selector
