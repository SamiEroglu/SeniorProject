import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import '../TaskResults/mytaskresults.css';
import axios from 'axios';

function MyTaskResults() {
	const [client, setClient] = useState(null);

	const RenderClientsResults = () => {
		if (client !== null) {
			let results = JSON.parse(client.attributes.results);

			if (results !== null) {
				return results.map((result, index) => (
					<div
						key={index}
						style={{
							display: 'flex',
							flexDirection: 'row',
							height: '2vw',
							alignItems: 'center',
						}}
						className="taskresults1"
					>
						<p>{result.test}</p>
						<p>:</p>
						<p>{result.score}</p>
						<p>Tarih: {result.date}</p>
					</div>
				));
			} else {
				return <p>Henüz test sonucu yok.</p>;
			}
		}
	};

	useEffect(() => {
		const fetchClient = async () => {
			let clientResponse;
			try {
				const getClientByUserQuery = {
					query: `
            query {
              clients(filters: { user: { id: { eq: ${localStorage.getItem(
								'userId'
							)} } } }) {
                data {
                  id
                  attributes {
                    results
                  }
                }
              }
            }      
          `,
				};

				axios({
					url: `${process.env.REACT_APP_API_URL}/graphql`,
					method: 'POST',
					data: getClientByUserQuery,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
					},
				}).then((res) => {
					clientResponse = res.data.data.clients.data[0];

					setClient(clientResponse);
				});
			} catch (error) {
				console.error('Error:', error);
			}
		};

		if (client === null) {
			fetchClient();
		}
	}, [client]);

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
					height: '50vh',
					position: 'relative',
				}}
			>
				<img
					className="foregroundImg"
					src="https://source.unsplash.com/random/1920x1080/?landscape"
					alt=""
				></img>
				<img
					className="backgroundImg"
					src="https://source.unsplash.com/random/1920x1080/?landscape"
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
				}}
			>
				<RenderClientsResults />
			</div>
		</div>
	);
}

export default MyTaskResults;