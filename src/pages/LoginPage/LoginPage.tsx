import soundIconUrl from '@/assets/sound.svg';

export const LoginPage = () => {
  return (
    <div>
      <div>
        <img src={soundIconUrl} alt="sound" />
      </div>
      <div>
        <h1>Добро пожаловать</h1>
        <p>Пожалуйста, авторизируйтесь</p>
      </div>
    </div>
  );
};
