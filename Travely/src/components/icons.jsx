import React from 'react';

const defaultProps = {
  width: 18,
  height: 18,
  stroke: 'currentColor',
  fill: 'none',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Svg = ({ size = 18, children, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const IconBarChart = ({ size }) => (
  <Svg size={size}>
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </Svg>
);

export const IconDashboard = ({ size }) => (
  <Svg size={size}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </Svg>
);

export const IconFlight = ({ size }) => (
  <Svg size={size}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2a1 1 0 0 0-.5 1.7l3 2.9-1 4.8a1 1 0 0 0 1.4 1.1l4.4-2.2 2.9 3c.5.5 1.3.2 1.5-.4z"/>
  </Svg>
);

export const IconCalendar = ({ size }) => (
  <Svg size={size}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </Svg>
);

export const IconUsers = ({ size }) => (
  <Svg size={size}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </Svg>
);

export const IconPerson = ({ size }) => (
  <Svg size={size}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </Svg>
);

export const IconLock = ({ size }) => (
  <Svg size={size}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </Svg>
);

export const IconSave = ({ size }) => (
  <Svg size={size}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </Svg>
);

export const IconLogout = ({ size }) => (
  <Svg size={size}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </Svg>
);

export const IconCheckCircle = ({ size }) => (
  <Svg size={size}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </Svg>
);

export const IconError = ({ size }) => (
  <Svg size={size}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </Svg>
);

export const IconEventNote = ({ size }) => (
  <Svg size={size}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/>
  </Svg>
);

export const IconFlightTakeoff = ({ size }) => (
  <Svg size={size}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2a1 1 0 0 0-.5 1.7l3 2.9-1 4.8a1 1 0 0 0 1.4 1.1l4.4-2.2 2.9 3c.5.5 1.3.2 1.5-.4z"/>
  </Svg>
);

export const IconEye = ({ size }) => (
  <Svg size={size}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </Svg>
);

export const IconLuggage = ({ size }) => (
  <Svg size={size}>
    <rect x="6" y="7" width="12" height="14" rx="2"/>
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="15"/><line x1="10" y1="12" x2="14" y2="12"/>
  </Svg>
);

export const IconExplore = ({ size }) => (
  <Svg size={size}>
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </Svg>
);

export const IconSync = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 22}
    height={size || 22}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    aria-hidden="true"
  >
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);