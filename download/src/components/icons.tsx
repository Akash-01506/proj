import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="currentColor">
        <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
        <path d="M172.33 89.15a8 8 0 0 0-8.21 1.4L128 123.33l-36.12-32.78a8 8 0 1 0-10.45 11.66l40.48 36.69a8 8 0 0 0 10.45 0l40.48-36.69a8 8 0 0 0-1.21-13.06Z" />
      </g>
    </svg>
  );
}
