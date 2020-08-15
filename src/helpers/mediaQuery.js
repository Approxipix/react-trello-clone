import { css } from 'styled-components';

export const defaultBreakpoints = {
  xl: '1440px',
  lg: '1170px',
  md: '768px',
  sm: '450px',
};

function getSizeFromBreakpoint(breakpointValue, breakpoints = {}) {
  if (breakpoints[breakpointValue]) {
    return breakpoints[breakpointValue];
  } else if (parseInt(breakpointValue)) {
    return breakpointValue;
  } else {
    return '0';
  }
}

export function generateMedia(breakpoints = defaultBreakpoints) {
  const lessThan = (breakpoint) => (...args) => css`
    @media (max-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  const greaterThan = (breakpoint) => (...args) => css`
    @media (min-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
    @media (min-width: ${getSizeFromBreakpoint(firstBreakpoint, breakpoints)}) and
      (max-width: ${getSizeFromBreakpoint(secondBreakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  return Object.assign(
    {
      lessThan,
      greaterThan,
      between,
    },
  );
}

export default generateMedia();
