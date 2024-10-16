import React from 'react';

export default function TableList1({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="me-2"
      width={9}
      height={9}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4.5" cy="4.5" r="4.5" fill="#FFB800" />
    </svg>
  );
}