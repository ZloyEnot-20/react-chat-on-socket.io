import React from 'react';
import axios from 'axios';
import '../components/Login.css';

function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные');
    }
    const obj = {
      roomId,
      userName,
    };
    setLoading(true);
    await axios.post('https://server-io.herokuapp.com/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="login_wrapper">
      <form
        className="login_form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="id_input"
        />
        <input
          type="text"
          placeholder="Ваше имя"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="name_input"
        />
        <input
          type="submit"
          disabled={isLoading}
          onClick={onEnter}
          className="enter_room"
          value={isLoading ? 'ВХОД...' : 'ВОЙТИ'}
        />
      </form>
    </div>
  );
}

export default JoinBlock;
