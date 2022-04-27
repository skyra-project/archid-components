let _repository = 'https://github.com/skyra-project';
let _invite = '';

export function setRepository(repository: string) {
	_repository = repository.includes('/') ? repository : `https://github.com/skyra-project/${repository}`;
}

export function getRepository() {
	return _repository;
}

export function setInvite(clientId: string, permissions = '0') {
	_invite = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;
}

export function getInvite() {
	return _invite;
}

export function setInformationFromImportMetaURL(url: URL) {
	const repository = url.searchParams.get('repository');
	if (repository) setRepository(repository);

	const clientId = url.searchParams.get('client_id');
	const permissions = url.searchParams.get('permissions');
	if (clientId) setInvite(clientId, permissions ?? '0');
}
