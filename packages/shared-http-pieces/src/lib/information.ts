let repository = process.env.CLIENT_REPOSITORY ?? 'https://github.com/skyra-project';
let invite = process.env.CLIENT_INVITE ?? null;

export function setRepository(url: string) {
	repository = url.startsWith('http') ? url : `https://github.com/skyra-project/${url}`;
}

export function getRepository() {
	return repository;
}

export function setInvite(clientId: string, permissions = '0') {
	invite = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;
}

export function getInvite() {
	return invite;
}
