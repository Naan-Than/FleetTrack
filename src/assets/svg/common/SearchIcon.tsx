import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchIcon(props:any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.53 18.47l-4.693-4.694a8.26 8.26 0 10-1.06 1.06l4.692 4.695a.75.75 0 101.062-1.062zM1.75 8.5a6.75 6.75 0 116.75 6.75A6.757 6.757 0 011.75 8.5z"
        fill="#9CA3AF"
      />
    </Svg>
  )
}

export default SearchIcon
