'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import * as S from './styles';

export default function Home() {
  return (
    <S.Wrapper>
      <S.WrapperSectionForm>
        <S.WrapperForm method="post" onSubmit={() => {}}></S.WrapperForm>
        <Player
          src="https://lottie.host/9e26f999-7f63-4871-b6b8-91bb63f502e7/KdKBd17XAo.json"
          className="player"
          loop
          autoplay
        />
      </S.WrapperSectionForm>
    </S.Wrapper>
  );
}
