import BrandTheme from '@/assets/themes/brandTheme';
import { Logo } from '../Logo';
import * as S from './styles';

type Login = {
  children: React.ReactNode;
};

export const Login = ({ children }: Login) => {
  return (
    <BrandTheme>
      <S.WrapperSectionToAlign>
        <S.WrapperSectionLogin>
          <S.WrapperTitle>
            <Logo />
          </S.WrapperTitle>
          {children}
        </S.WrapperSectionLogin>
      </S.WrapperSectionToAlign>
    </BrandTheme>
  );
};
