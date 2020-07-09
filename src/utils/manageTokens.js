const STORAGE_KEY = 'LOGGED_USER';
export const LOGGED_USER_EMAIL = 'userEmail';
export const LOGGED_USER_TOKEN = 'accessToken';

export function saveUser(user) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getUser() {
	return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function deleteUser() {
	localStorage.removeItem(STORAGE_KEY);
}
