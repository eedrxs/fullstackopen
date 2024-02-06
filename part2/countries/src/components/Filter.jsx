const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries{" "}
      <input value={value} onChange={(e) => onChange(e.target.value.trim())} />
    </div>
  )
}

export default Filter
