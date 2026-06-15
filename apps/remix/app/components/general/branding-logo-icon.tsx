import type { SVGAttributes } from 'react';

// MIG white-label: render the Millennial Insurance Group mark instead of the
// upstream icon. Same export name + prop type so importers still compile.
export type LogoProps = SVGAttributes<SVGSVGElement>;

export const BrandingLogoIcon = ({ className, style }: LogoProps) => {
  return (
    <img
      src="/static/mig-logo.png"
      alt="Millennial Insurance Group"
      className={className}
      style={style}
    />
  );
};
