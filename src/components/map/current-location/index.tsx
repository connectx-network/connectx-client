"use client";

import { AdvancedMarker, AdvancedMarkerProps } from "@vis.gl/react-google-maps";

export type CurrentLocationMarkProps = AdvancedMarkerProps & {};

const CurrentLocationMark = (props: CurrentLocationMarkProps) => {
  return (
    <AdvancedMarker {...props}>
      <div className="h-6 w-6 rounded-full bg-blue-300 opacity-70 flex justify-center items-center border-solid border border-blue-400 ">
        <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-solid border-white"></div>
      </div>
    </AdvancedMarker>
  );
};

export default CurrentLocationMark;
