import Image from 'next/image';

import LogoImage from '../../assets/images/logo.png';

export const Logo = ({ ...props }) => (
  <Image
    src={LogoImage}
    alt="logo"
    className="logo"
    loading="lazy"
    {...props}
  />
);
