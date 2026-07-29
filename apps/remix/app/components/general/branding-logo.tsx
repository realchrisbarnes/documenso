import type { SVGAttributes } from 'react';

// MIG white-label: render the Millennial Insurance Group logo instead of the
// upstream wordmark. Keeps the same export name + prop type so all importers
// continue to compile. (Re-apply on Documenso updates — see white-label notes.)
export type LogoProps = SVGAttributes<SVGSVGElement>;

export const BrandingLogo = ({ className, style }: LogoProps) => {
  return <img src="/static/mig-logo.png" alt="Millennial Insurance Group" className={className} style={style} />;
};
