import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import './loading.css';

function GradientCircularProgress({ size = 80, gradientStart = "#e01cd5", gradientEnd = "#1CB5E0" }) {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{
          "svg circle": { stroke: "url(#my_gradient)" },
        }}
        size={size}
      />
    </React.Fragment>
  );
}

export default function Loading({ size, gradientStart, gradientEnd }) {
  return (
    <div className="loading-body">
       <GradientCircularProgress
          size={size}
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
        />
    </div>
  );
}
