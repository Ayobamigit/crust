import * as React from "react"

const List = (props) => (
  <svg
    width={9}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} width={8} height={8} rx={4} />
  </svg>
)

export default List
