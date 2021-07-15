import React from 'react';
import socket from '../socket';
import Message from './Message';
function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    
    if (messageValue) {
      console.log('heere');
      socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId,
        text: messageValue,
      });
      onAddMessage({ userName, text: messageValue });
      setMessageValue('');
    }
  return
  };

const checkEnter =(e)=>{
  if(e.keyCode === 13) onSendMessage()
  else return
}

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="chat">
        <div className="users-menu">
          <div className="users-number">Online: ({users.length})</div>
          <hr />
          <div className="users-in-room">
            {users &&
              users.map((item, inx) => {
                return (
                  <div className="user" key={item + '' + inx}> 
                    <div
                      className="logo"
                      // style={{
                      //   background: color(),
                      // }}
                    >
                      {item[0].toUpperCase()}
                    </div>
                    <div className="user-status">
                      <span className="name" key={(item, inx)}>
                        {item}
                      </span>
                      <span className="status" key={(item, inx + 1)}>
                        Online
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="wrapper">
          <header className="room-info">{roomId}</header>

          <div className="message-area" ref={messagesRef}>
            {messages &&
              messages.map((item, inx) => {
                return (
                  <Message
                    own={userName === messages[inx].userName}
                    userName={userName}
                    roomId={roomId}
                    item={item}
                    inx={inx}
                  ></Message>
                );
              })}
          </div>
          <div className="text-area">
            <input
              value={messageValue}
              placeholder="Message..."
              // ref={inputEl}
              onKeyUp={checkEnter}
              onChange={(e) => setMessageValue(e.target.value)}
              className="messages"
            />
            <button className="btn" onClick={onSendMessage}>
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
