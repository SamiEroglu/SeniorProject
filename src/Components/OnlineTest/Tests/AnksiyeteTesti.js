import React from 'react';
import './anksiyetetesti.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../Navbar';
import { questions1 } from '../questions1';
import axios from 'axios';

export default function AnksiyeteTesti() {
	const [currentQuestion, setCurrentQuestion] = React.useState(0);
	const [score, setScore] = React.useState(0);
	const [showScore, setShowScore] = React.useState(false);

	const saveResultToDb = async () => {
		let clientId;

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

		await axios({
			url: `${process.env.REACT_APP_API_URL}/graphql`,
			method: 'POST',
			data: getClientByUserQuery,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
			},
		}).then(async (res) => {
			clientId = res.data.data.clients.data[0].id;
			let results = res.data.data.clients.data[0].attributes.results;

			results = JSON.parse(results);

			if (results === null) {
				results = [];
			}

			results.push({
				test: 'Anksiyete Testi',
				score: 21 - score,
				date: new Date().toLocaleDateString(),
			});

			results = JSON.stringify(results).replace(/\\/g, '');

			const updateClientQuery = {
				query: `
          mutation {
            updateClient(id: ${clientId}, data: { results: ${JSON.stringify(
					results
				)} }) {
              data {
                attributes {
                  results
                }
              }
            }
          }
          `,
			};

			await axios({
				url: `${process.env.REACT_APP_API_URL}/graphql`,
				method: 'POST',
				data: updateClientQuery,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
				},
			}).then((res) => {
				console.log(res.data);
			});
		});
	};

	const handleClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions1.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
			saveResultToDb();
		}
	};
	function refreshPage() {
		window.location.reload(false);
	}
	return (
		<div
			className="testpagecont"
			style={{
				width: '100%',
				height: '100vh',
				position: 'absolute',
				top: '0%',
				left: '0%',
				backgroundSize: '100%',
			}}
		>
			<Navbar />
			<img src="https://picsum.photos/1920/1080?landscape" alt=""></img>

			<div className="testpage">
				{showScore ? (
					<section className="showScore-section">
						<h1>Sonuç: {21 - score}</h1>
						<h1>0-5: Normal düzeyi gösterir</h1>
						<h1>5-9: Hafif düzeyde anksiyete belirtisini gösterir</h1>
						<h1>9-14: Orta düzeyde anksiyeteu gösterir</h1>
						<h1>14-21: Şiddetli anksiyete belirtisini gösterir</h1>
						<FontAwesomeIcon
							onClick={refreshPage}
							icon={faRefresh}
							className="refreshicon"
						/>
					</section>
				) : (
					<>
						<section className="question-section">
							<h1>
								Soru: {currentQuestion + 1}/{questions1.length}
							</h1>
							<p>{questions1[currentQuestion].questionText}</p>
						</section>

						<section className="answer-section">
							{questions1[currentQuestion].answerOptions.map((item) => (
								<button onClick={() => handleClick(item.isCorrect)}>
									{item.answerText}
								</button>
							))}
						</section>
					</>
				)}
			</div>
		</div>
	);
}
