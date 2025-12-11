import * as React from "react"
import Svg, { Path } from "react-native-svg"
import AppStrings from "../../../constants/AppStrings";

function HomeOutlineIcon(props:any) {
  return (
    <Svg
       fill={AppStrings.unselectedIcon}
      width="28px"
      height="28px"
      viewBox="0 0 24 24"
      data-name="Line color"
      xmlns="http://www.w3.org/2000/svg"
      className="icon line-color"
      {...props}
    >
      <Path
        d="M9.7 21H5.83a.77.77 0 01-.83-.7V10m9.3 11h3.87a.77.77 0 00.83-.7V10m-4.7 11v-6.9H9.7V21"
        fill="none"
        stroke={AppStrings.unselectedIcon}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        d="M12 3l-9 9m9-9l9 9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke={AppStrings.unselectedIcon}
      />
    </Svg>
  )
}



export default HomeOutlineIcon;
