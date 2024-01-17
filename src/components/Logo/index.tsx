import Image from 'next/image';
import LogoImage from '../../assets/images/logo.png';

export const Logo = ({ ...props }) => {
  return <Image src={LogoImage} alt="logo" className="logo" {...props} />;
};
