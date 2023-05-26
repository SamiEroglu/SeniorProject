import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function MyComponent() {
	useEffect(() => {
		socket.on('message', (data) => {
			console.log(data);
			// Do something with the data received from the server
		});

		socket.emit('data', 'Hello from the client!');

		socket.on('imageClass', (data) => {
			console.log(data);
		});
	}, []);

	return <div>{/* Your component's JSX */}</div>;
}

const WebcamStream = () => (
	<>
		<iframe
			height={1080}
			width={1920}
			style={{
				width: '100%',
				height: '120%',
				marginTop: '-5%',
				border: 'none',
			}}
			src='http://localhost:5000'
			title='Webcam Stream'
		/>
		<MyComponent />
	</>
);

export default WebcamStream;
