let repository = 'https://github.com/skyra-project';
let invite = '';

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

export function setInformationFromImportMetaURL(url: URL) {
	const repository = url.searchParams.get('repository');
	if (repository) setRepository(repository);

	const clientId = url.searchParams.get('client_id');
	const permissions = url.searchParams.get('permissions');
	if (clientId) setInvite(clientId, permissions ?? '0');
}
