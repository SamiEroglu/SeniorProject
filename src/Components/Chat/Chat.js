import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import '../Chat/chat.css';

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState('');
	const [submittedUsername, setSubmittedUsername] = useState('');
	const socket = useRef();

	useEffect(() => {
		const socketInstance = io('http://localhost:4000');

		socketInstance.on('imageClass', (data) => {
			setMessage(data);
		});

		socketInstance.on('connect', () => {
			console.log(`⚡: ${socketInstance.id} user just connected!`);
		});

		socketInstance.on('messageResponse', (data) => {
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		socketInstance.on('typingResponse', (data) => {
			console.log(`${data} is typing...`);
		});

		socketInstance.on('newUserResponse', (data) => {
			setUsers(data);
		});

		socketInstance.on('imageClass', (data) => {
			console.log('image class: ', data);
		});

		socket.current = socketInstance;

		return () => {
			socketInstance.disconnect();
		};
	}, []);
	const el = document.getElementById('chatboxid');
	if (el) {
		el.scrollTop = el.scrollHeight;
	}
	const handleSendMessage = (e) => {
		e.preventDefault();

		if (!message) return;

		socket.current.emit('message', {
			username,
			message,
		});

		setMessage('');
	};

	const handleTyping = () => {
		socket.current.emit('typing', username);
	};

	const handleNewUser = () => {
		socket.current.emit('newUser', {
			username,
			socketID: socket.current.id,
		});
	};

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const submitUsername = (e) => {
		setSubmittedUsername(username);
	};

	return (
		<div>
			{submittedUsername ? (
				<div id='chatboxid' className='submittedusername'>
					<div>
						<ul>
							{messages.map((msg, index) => (
								<li key={index}>
									<strong>{msg.username}</strong>: {msg.message}
								</li>
							))}
						</ul>
						<form onSubmit={handleSendMessage}>
							<input
								type='text'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								onKeyDown={handleTyping}
								style={{
									position: 'absolute',
									top: '164.9%',
									right: '13.45%',
									width: '12.6vw',
									height: '1.2vw',
								}}
							/>

							<button className='chatbotbutton' type='submit'>
								Gönder
							</button>
						</form>
					</div>
					<div>
						<ul>
							{users.map((user, index) => (
								<li key={index}>{user.username}</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<div>
					<h2
						style={{
							fontFamily: 'sans-serif',
							fontWeight: '700',
							color: '#9750ba',
							position: 'absolute',
							right: '15%',
							fontSize: '1.9vw',
						}}
					>
						Hoşgeldiniz
					</h2>
					<form onSubmit={handleNewUser}>
						<label className='chatlabel'>
							Adınızı Giriniz:
							<input
								type='text'
								value={username}
								onChange={handleUsernameChange}
							/>
						</label>
						<button
							className='chatbotbutton'
							type='submit'
							onClick={submitUsername}
							disabled={!username}
						>
							Sohbete Başla
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Chat;
