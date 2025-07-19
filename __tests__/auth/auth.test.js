const { post, get } = require('../../utils/request');
const { StatusCodes } = require('http-status-codes');

describe('🔒 Authentication API /auth/login', () => {

	describe('✅ - Positive Case', () => {
		const input = { username: 'emilys', password: 'emilyspass' };
		let jwtToken = '';
		
		 beforeAll(async () => {
			const res = await post('/auth/login', input);

			// status code
			expect(res.status).toBe(StatusCodes.OK);

			// response data
			expect(res.data).toHaveProperty('accessToken');
			expect(res.data.accessToken).not.toBeNull();
			expect(res.data.username).toEqual(input.username);

			// set auth token to test in user info
			jwtToken = res.data.accessToken;
		});

		it('should successfully login with valid credential and return access token', () => {
			expect(jwtToken).toBeTruthy();
			expect(jwtToken).toMatch(/^eyJ/); // Looks like a JWT
		});

		it('Should get user information with access token', async () => {
			try {
				const res = await get('/auth/me', {
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				});

				expect(res.status).toBe(StatusCodes.OK);
				expect(res.data).toHaveProperty('id');
				expect(res.data.username).toEqual(input.username);
				expect(res.data.email).toMatch(/@/);
			} catch (err) {
				console.log(err);
				expect(err).toBeNull();
			}
		});
	});

	describe('❌- Negative Cases', () => {
		 it('should fail to login with invalid username', async () => {
			const input = { username: 'wronguser', password: 'emilyspass' };

			try {
				await post('/auth/login', input);
			} catch (err) {
				expect(err.response.status).toBe(StatusCodes.BAD_REQUEST);
				expect(err.response.data).toHaveProperty('message');
				expect(err.response.data.message).toEqual('Invalid credentials');
			}
		});

		it('should fail to login with invalid password', async () => {
			const input = { username: 'emilys', password: 'wrongpass' };

			try {
				await post('/auth/login', input);
			} catch (err) {
				expect(err.response.status).toBe(StatusCodes.BAD_REQUEST);
				expect(err.response.data).toHaveProperty('message');
				expect(err.response.data.message).toEqual('Invalid credentials');
			}
		});

		it('should fail to login without input username and password', async () => {
			const input = { username: '', password: '' };

			try {
				await post('/auth/login', input);
			} catch (err) {
				expect(err.response.status).toBe(StatusCodes.BAD_REQUEST);
				expect(err.response.data).toHaveProperty('message');
				expect(err.response.data.message).toEqual('Username and password required');
			}
		});

		it('should fail and throw unauthorized error if token was invalid or expired', async () => {
			try {
				await get('/auth/me', {
					headers: {
						Authorization: 'Bearer invalidtoken',
					},
				});
			} catch (err) {
				expect(err.response.status).toBe(StatusCodes.UNAUTHORIZED);
				expect(err.response.data).toHaveProperty('message');
				expect(err.response.data.message).toEqual('Invalid/Expired Token!');
			}
		});
	});
});