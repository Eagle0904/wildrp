const handleLeave = (oldState, newState, client) => {
	if (oldState.channelID !== client.config.channelID) return

	const guildMember = newState.member

	return guildMember.roles.remove(client.config.roleID)
}

const handleJoin = (newState, client) => {
	if (newState.channelID !== client.config.channelID) return

	const guildMember = newState.member

	return guildMember.roles.add(client.config.roleID)
}

export default (oldState, newState, client) => {
	// Pour uniquement garder les changements de channels et non d'état
	if (oldState.channelID === newState.channelID) return

	// Si l'utilisateur quitte un channel
	if (oldState.channel) handleLeave(oldState, newState, client)

	// Si l'utilisateur rejoint un channel
	if (newState.channel) handleJoin(newState, client)
}
