import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function LoginPage() {
	let navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		setIsValidEmail(event.target.checkValidity());
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const login = (e) => {
		e.preventDefault();
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/auth/local`, {
				identifier: email,
				password: password,
			})
			.then(async (res) => {
				localStorage.setItem('token', res.data.jwt);

				await getUsersRole().then(() => {
					navigate('/home');
				});
			})
			.catch((err) => {
				console.log(err);

				// giriş başarısız uyarı gösterimi
			});
	};

	const getUsersRole = async () => {
		let userId;
		let role;

		axios({
			url: `${process.env.REACT_APP_API_URL}/api/users/me`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}).then(async (res) => {
			userId = res.data.id;

			const getUserQuery = {
				query: `
				query {
				usersPermissionsUser(id: ${userId}) {
					data {
					attributes {
						role {
						data {
							attributes {
							name
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
				data: getUserQuery,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
				},
			}).then((res) => {
				role =
					res.data.data.usersPermissionsUser.data.attributes.role.data
						.attributes.name;

				localStorage.setItem('role', role);
			});
		});

		return role;
	};

	const theme = createTheme();

	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={8}
					sx={{
						backgroundImage:
							'url(https://source.unsplash.com/random/1920×1080/?city,night,1920x1080)',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid
					item
					xs={12}
					sm={8}
					md={4}
					component={Paper}
					elevation={6}
					square
					style={{ backgroundColor: '#f7f0fe' }}
				>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h6">
							Giriş
						</Typography>
						<Box
							component="form"
							noValidate
							sx={{ mt: 1 }}
							style={{ scale: '0.8' }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Adresi"
								name="email"
								autoComplete="email"
								autoFocus
								type="email"
								value={email}
								onChange={handleEmailChange}
							/>
							{!isValidEmail && (
								<div
									style={{
										color: 'red',
										fontSize: '0.9vw',
										lineHeight: '0.2vw',
										paddingLeft: '.2vw',
										paddingTop: '.1vw',
									}}
								>
									Lütfen geçerli bir email adresi girin
								</div>
							)}
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Şifre"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={handlePasswordChange}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Beni Hatırla"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={login}
							>
								Giriş
							</Button>
							<Grid container>
								<Grid item>
									<Link href="/uyeol" variant="body2">
										{'Hesabın Yok Mu?Üye Ol'}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default LoginPage;
