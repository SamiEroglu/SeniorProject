import React from 'react';
import './testPage.css';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

export default function TestPage() {
	let navigate = useNavigate();
	const routeChange = () => {
		navigate('/test1');
	};
	const routeChange1 = () => {
		navigate('/test2');
	};
	const routeChange2 = () => {
		navigate('/test3');
	};

	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			<Navbar />
			<div
				className="profilebgimgcontainer"
				style={{
					width: '100%',
					height: '70vh',
					position: 'relative',
				}}
			>
				<img
					className="foregroundImg"
					src="https://picsum.photos/1920/1080?landscape"
					alt=""
				></img>
				<img
					className="backgroundImg"
					src="https://picsum.photos/1920/1080?landscape"
					alt=""
				></img>
			</div>
			<div
				style={{
					zIndex: '3',
					position: 'absolute',
					top: '20%',
					right: '25%',
					border: 'none',
					borderRadius: '1.5vw',
					width: '50%',
					height: '70vh',
					background: 'white',
					boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '0.8vw',
				}}
			>
				<button
					onClick={routeChange}
					style={{ fontSize: '3vw' }}
					className="bdtbutton"
				>
					Beck Depresyon Testi
				</button>
				<button
					onClick={routeChange1}
					style={{ fontSize: '3vw' }}
					className="bdtbutton"
				>
					Go/No-Go Testi
				</button>
				<button
					onClick={routeChange2}
					style={{ fontSize: '3vw' }}
					className="bdtbutton"
				>
					Anksiyete Testi
				</button>
			</div>
		</div>
	);
}
