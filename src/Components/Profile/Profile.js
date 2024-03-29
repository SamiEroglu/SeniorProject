import React, { useEffect, useState } from 'react';
import '../Profile/profile.css';
import Navbar from '../Navbar';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Profile() {
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setMail] = useState('');
	const [gender, setGender] = useState('Male');
	const [tc, setTC] = useState('');
	const [symptom, setSymptom] = useState('');
	const [phone, setPhone] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenUsers, setIsOpenUsers] = useState(false);
	const [clients, setClients] = useState([]);
	const [clickedClient, setClickedClient] = useState({});

	const RenderClientsResults = (client) => {
		if (client.results !== null) {
			return clickedClient.results.map((result, index) => (
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
				</div>
			));
		} else {
			return <p>Henüz test sonucu yok.</p>;
		}
	};

	function editContent() {
		var div = document.getElementById('preasonid1');
		div.contentEditable = true;
		div.focus();
	}

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleSurnameChange = (e) => {
		setSurname(e.target.value);
	};
	const handleMailChange = (e) => {
		setMail(e.target.value);
	};
	const handleGenderChange = (e) => {
		setGender(e.target.value);
	};
	const handlePhoneChange = (e) => {
		setPhone(e.target.value);
	};
	const handleSymptomChange = (e) => {
		setSymptom(e.target.value);
	};
	const handleTCChange = (e) => {
		setTC(e.target.value);
	};

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);

		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	useEffect(() => {
		const fetchClients = async () => {
			try {
				let clientsResponse;

				const getClientsQuery = {
					query: `
            query {
              clients(filters: { consultant: { user: { username: { eq: "admin consultant" } } } }) {
                data {
                  id
                  attributes {
                    results
                    user {
                      data {
                        attributes {
                          username
                          email
                          gender
                          phone
                          tc
                          symptoms
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
				};

				axios({
					url: `${process.env.REACT_APP_API_URL}/graphql`,
					method: 'POST',
					data: getClientsQuery,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
					},
				}).then((res) => {
					clientsResponse = res.data.data.clients.data;

					setClients(clientsResponse);
				});
			} catch (error) {
				console.error('Error:', error);
			}
		};

		fetchClients();
	}, []);

	const clientsList = clients.map((client) => {
		const handleClick = () => {
			toggleUsers(client);
		};
		// const handleClickDelete = () => {
		//   removeUser(client.id);
		// };

		return (
			<tr
				style={{
					display: 'flex',
					flexDirection: 'row',
					fontSize: '1.5vw',
					padding: '1vw',
					alignItems: 'center',
					justifyContent: 'space-around',
					borderTop: 'solid 1px black',
					borderBottom: 'solid 1px black',
				}}
				onClick={handleClick}
			>
				<td className="client" key={client.id}>
					{client.attributes.user.data.attributes.username}
				</td>
			</tr>
		);
	});

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}
		setSelectedFile(e.target.files[0]);
	};

	function toggle() {
		setIsOpen((isOpen) => !isOpen);
		if (isOpenUsers === true) {
			setIsOpenUsers(false);
		}
	}
	function toggleUsers(client) {
		console.log(client);

		const name = client.attributes.user.data.attributes.username.split(' ')[0];
		const surname =
			client.attributes.user.data.attributes.username.split(' ')[1];

		setClickedClient({
			name,
			surname,
			email: client.attributes.user.data.attributes.email,
			gender: client.attributes.user.data.attributes.gender,
			phone: client.attributes.user.data.attributes.phone,
			tc: client.attributes.user.data.attributes.tc,
			symptoms: client.attributes.user.data.attributes.symptoms,
			results:
				client.attributes.results === null
					? []
					: JSON.parse(client.attributes.results),
		});

		setIsOpenUsers(true);
		if (isOpen === true) {
			setIsOpen(false);
		}
	}

	const createUser = async (e) => {
		e.preventDefault();

		await axios
			.post(`${process.env.REACT_APP_API_URL}/api/auth/local/register`, {
				username: name + ' ' + surname,
				email: email,
				password: name + '1234',
			})
			.then(async (res) => {
				console.log('user created.');

				const userId = res.data.user.id;

				await axios
					.put(
						`${process.env.REACT_APP_API_URL}/api/users/${userId}`,
						{
							phone: phone,
							tc: tc,
							symptoms: symptom,
							gender: gender,
							role: 4,
						},
						{
							headers: {
								Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
							},
						}
					)
					.then(async () => {
						console.log('user created and updated.');

						let consultantUserId;

						await axios
							.get(`${process.env.REACT_APP_API_URL}/api/users/me`, {
								headers: {
									Authorization: `Bearer ${localStorage.getItem('token')}`,
								},
							})
							.then((res) => {
								consultantUserId = res.data.id;
							});

						console.log(consultantUserId);

						let consultantId;

						const getConsultantIdQuery = {
							query: `
              query {
                consultants(filters: { user: { id: { eq: ${consultantUserId} } } }) {
                  data {
                    id
                  }
                }
              }
              `,
						};

						axios({
							url: `${process.env.REACT_APP_API_URL}/graphql`,
							method: 'POST',
							data: getConsultantIdQuery,
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
							},
						}).then(async (res) => {
							consultantId = res.data.data.consultants.data[0].id;

							console.log(consultantId);

							await axios.post(
								`${process.env.REACT_APP_API_URL}/api/clients`,
								{
									data: {
										user: userId,
										consultant: parseInt(consultantId),
									},
								},
								{
									headers: {
										Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
									},
								}
							);
						});
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	//   const removeUser = async (userId) => {
	//     try {
	//       await axios
	//         .delete(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
	//           headers: {
	//             Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
	//           },
	//         })
	//         .then((res) => {
	//           console.log("Kullanıcı kaldırıldı.", res);
	//         })
	//         .catch((e) => {
	//           console.log(e);
	//         });

	//       // Kullanıcıyı silmekten sonra geri kalan kullanıcıları almak için başka bir API isteği yapabilirsiniz.
	//       const response = await axios.get(
	//         `${process.env.REACT_APP_API_URL}/api/users`,
	//         {
	//           headers: {
	//             Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
	//           },
	//         }
	//       );
	//       const remainingUsers = response.data;
	//       console.log("Geri kalan kullanıcılar:", remainingUsers);
	//     } catch (error) {
	//       console.error("Kullanıcı kaldırma işlemi başarısız oldu.", error);
	//     }
	//   };
	const submit = () => {
		confirmAlert({
			title: 'Danışan Kaldırma İşlemi',
			message: 'Silmek istediğinize emin misiniz?',
			buttons: [
				{
					label: 'Evet',
				},
				{
					label: 'Hayır',
				},
			],
		});
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
					height: '50vh',
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
					right: '10%',
					border: 'none',
					borderRadius: '1.5vw',
					width: '80%',
					height: '70vh',
					background: 'white',
					boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
				}}
			>
				<div
					style={{
						width: '27%',
						height: '70vh',
						backgroundColor: 'rgba(125,125,125,0.2)',
						borderTopLeftRadius: '1.5vw',
						borderBottomLeftRadius: '1.5vw',
					}}
				>
					<div>
						<table
							style={{ display: 'flex', flexDirection: 'column' }}
							cellSpacing="10"
							className="sidemenutable"
						>
							<td>
								<tr
									onClick={toggle}
									style={{
										display: 'flex',
										flexDirection: 'row',
										fontSize: '1.5vw',
										padding: '1vw',
										alignItems: 'center',
										justifyContent: 'space-around',
										borderTop: 'solid 1px black',
										borderBottom: 'solid 1px black',
									}}
								>
									<img src="./ppicon.png" style={{ width: '20%' }} alt=""></img>
									<td>Kayıt</td>
								</tr>
							</td>
							<td style={{ height: '53vh', overflowY: 'scroll' }}>
								{clientsList}
							</td>
						</table>
					</div>
				</div>
				{isOpen && (
					<div
						className="details"
						style={{
							position: 'absolute',
							top: '20%',
							left: '30%',
							fontFamily: 'sans-serif',
							fontSize: '3vh',
						}}
					>
						<div
							style={{
								backgroundRepeat: 'no-repeat',
								width: '10vw',
								height: '10vw',
								backgroundColor: 'white',
								backgroundImage: `url("/ppicon.png")`,
								backgroundSize: '95%',
								backgroundPosition: 'center',
								boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
								position: 'absolute',
								bottom: '105%',
								left: '37%',
								border: 'none',
								borderRadius: '100%',
							}}
						>
							{selectedFile && (
								<img
									style={{
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',
										flexShrink: '0',
										maxWidth: '100%',
										maxHeight: '100%',
										border: 'none',
										borderRadius: '100%',
									}}
									src={preview}
									alt=""
								/>
							)}
						</div>
						<table cellSpacing="10">
							<tr>
								<td>İsim:</td>
								<td>
									<input
										type="text"
										name="name"
										onChange={handleNameChange}
										value={name}
									></input>
								</td>
							</tr>
							<tr>
								<td>Soyisim:</td>
								<td>
									<input
										type="text"
										name="surname"
										onChange={handleSurnameChange}
										value={surname}
									></input>
								</td>
							</tr>
							<tr>
								<td>Cinsiyet:</td>
								<td>
									<select
										name="gender"
										onChange={handleGenderChange}
										value={gender}
										style={{
											fontSize: '2vh',
											border: 'solid 1px black',
											borderRadius: '.5vw',
											width: '6vw',
											height: '3vh',
											textAlign: 'center',
											fontFamily: 'sans-serif',
											backgroundColor: 'white',
											color: 'black',
										}}
									>
										<option value="Male">Erkek</option>
										<option value="Female">Kadın</option>
										<option value="Other">Diğer</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>E-mail:</td>
								<td>
									<input
										type="mail"
										name="email"
										maxLength={'25'}
										onChange={handleMailChange}
										value={email}
									></input>
								</td>
							</tr>
							<tr>
								<td>TC Kimlik Numarası:</td>
								<td>
									<input
										type="text"
										name="tc"
										maxLength={'11'}
										onChange={handleTCChange}
										value={tc}
									></input>
								</td>
							</tr>
							<tr>
								<td>Telefon Numarası:</td>
								<td>
									<input
										type="text"
										name="phone"
										maxLength={'11'}
										onChange={handlePhoneChange}
										value={phone}
									></input>
								</td>
							</tr>
							<tr>
								<td style={{ paddingBottom: '12%' }}>Gelme Nedeni:</td>
								<td>
									<textarea
										type="text"
										name="symptom"
										classname="preasonid"
										id="preasonid"
										value={symptom}
										onChange={handleSymptomChange}
									></textarea>
								</td>
							</tr>
							<tr>
								<td>Profil Fotoğrafı:</td>
								<td
									style={{
										width: '100%',
										position: 'absolute',
										top: '88.5%',
										left: '29%',
									}}
								>
									<input
										style={{ width: '15vw' }}
										type="file"
										name="file"
										onChange={onSelectFile}
									/>
								</td>
							</tr>
							<tr style={{ position: 'absolute', left: '80%', bottom: '0%' }}>
								<td>
									<button
										type="submit"
										className="button-6"
										onClick={createUser}
									>
										Kaydet
									</button>
								</td>
							</tr>
						</table>
					</div>
				)}
				{isOpenUsers && (
					<div
						className="details"
						style={{
							position: 'absolute',
							top: '20%',
							left: '30%',
							fontFamily: 'sans-serif',
							fontSize: '3vh',
						}}
					>
						<div
							style={{
								backgroundRepeat: 'no-repeat',
								width: '10vw',
								height: '10vw',
								backgroundColor: 'white',
								backgroundImage: `url("/ppicon.png")`,
								backgroundSize: '95%',
								backgroundPosition: 'center',
								boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
								position: 'absolute',
								bottom: '105%',
								left: '37%',
								border: 'none',
								borderRadius: '100%',
							}}
						>
							{selectedFile && (
								<img
									style={{
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',
										flexShrink: '0',
										maxWidth: '100%',
										maxHeight: '100%',
										border: 'none',
										borderRadius: '100%',
									}}
									src={preview}
									alt=""
								/>
							)}
						</div>
						<table cellSpacing="5">
							<tr>
								<td>İsim:</td>
								<td>
									<div type="text" name="name" value={name}>
										{clickedClient.name}
									</div>
								</td>
							</tr>
							<tr>
								<td>Soyisim:</td>
								<td>
									<div type="text" name="surname" value={surname}>
										{clickedClient.surname}
									</div>
								</td>
							</tr>
							<tr>
								<td>Cinsiyet:</td>
								<td>
									<div name="gender" value={gender}>
										{clickedClient.gender}
									</div>
								</td>
							</tr>
							<tr>
								<td>E-mail:</td>
								<td>
									<div type="mail" name="email" maxLength={'25'} value={email}>
										{clickedClient.email}
									</div>
								</td>
							</tr>
							<tr>
								<td>TC Kimlik Numarası:</td>
								<td>
									<div type="text" name="tc" maxLength={'11'} value={tc}>
										{clickedClient.tc}
									</div>
								</td>
							</tr>
							<tr>
								<td>Telefon Numarası:</td>
								<td>
									<div type="text" name="phone" maxLength={'11'} value={phone}>
										{clickedClient.phone}
									</div>
								</td>
							</tr>
							<tr>
								<td>Test Sonuçları:</td>
								<td>
									<div
										type="results"
										name="results"
										maxLength={'11'}
										id="taskresults"
									>
										<RenderClientsResults client={clickedClient} />
									</div>
								</td>
							</tr>
							<tr>
								<td style={{ paddingBottom: '9%' }}>Gelme Nedeni:</td>
								<td>
									<div
										type="text"
										name="symptom"
										classname="preasonid1"
										id="preasonid1"
										value={symptom}
										onDoubleClick={editContent}
									>
										{clickedClient.symptoms}
									</div>
								</td>
							</tr>
							<tr style={{ position: 'absolute', left: '80%', top: '100%' }}>
								<td>
									<button
										type="submit"
										className="button-6"
										onClick={createUser}
									>
										Kaydet
									</button>
								</td>
							</tr>
							<tr style={{ position: 'absolute', left: '10%', top: '100%' }}>
								<td>
									<button className="button-6" onClick={submit}>
										kaldır
									</button>
								</td>
							</tr>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
