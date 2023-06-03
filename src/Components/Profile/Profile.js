import React, { useEffect, useState } from 'react';
import '../Profile/profile.css';
import Navbar from '../Navbar';
function Profile() {
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();
	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);
	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}
		setSelectedFile(e.target.files[0]);
	};
	const [isOpen, setIsOpen] = useState(false);

	function toggle() {
		setIsOpen((isOpen) => !isOpen);
	}

	const createUser = async (e) => {
		e.preventDefault();
		console.log(e.target);
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
						<table cellSpacing="10" className="sidemenutable">
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
						<form>
							<table cellSpacing="10">
								<tr>
									<td>İsim:</td>
									<td>
										<input type="text" name="pname"></input>
									</td>
								</tr>
								<tr>
									<td>Soyisim:</td>
									<td>
										<input type="text" name="psurname"></input>
									</td>
								</tr>
								<tr>
									<td>TC Kimlik Numarası:</td>
									<td>
										<input type="text" name="ptc" maxLength={'11'}></input>
									</td>
								</tr>
								<tr>
									<td>Telefon Numarası:</td>
									<td>
										<input type="text" name="ptel" maxLength={'11'}></input>
									</td>
								</tr>
								<tr>
									<td style={{ paddingBottom: '12%' }}>Gelme Nedeni:</td>
									<td>
										<textarea
											type="text"
											name="preason"
											classname="preasonid"
											id="preasonid"
										></textarea>
									</td>
								</tr>
								<tr>
									<td>Profil Fotoğrafı:</td>
									<td
										style={{
											width: '100%',
											position: 'absolute',
											top: '85.5%',
											left: '31.5%',
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
								{/* <tr style={{ position: "absolute", left: "80%" }}>
								<td>
									<button className="button-6">Kaydet</button>
								</td>
							</tr> */}
							</table>
							<button className="button-6" type="submit" onSubmit={createUser}>
								Kaydet
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
