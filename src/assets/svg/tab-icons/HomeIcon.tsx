import * as React from "react"
import Svg, { Path } from "react-native-svg"
import AppStrings from "../../../constants/AppStrings";

function HomeIcon(props:any) {
  return (
    <Svg

       fill={AppStrings.appColor}
      width="28px"
      height="28px"
      viewBox="0 0 24 24"
      data-name="Flat Color"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-color"
      {...props}
    >
      <Path
        d="M21.71 11.29l-9-9a1 1 0 00-1.42 0l-9 9a1 1 0 001.42 1.42l.29-.3v7.89A1.77 1.77 0 005.83 22H8.5a1 1 0 001-1v-4.9a1 1 0 011-1h3a1 1 0 011 1V21a1 1 0 001 1h2.67A1.77 1.77 0 0020 20.3v-7.89l.29.3a1 1 0 001.42 0 1 1 0 000-1.42z"

       fill={AppStrings.appColor}

      />
    </Svg>
  )
}

export default HomeIcon;
