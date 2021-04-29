import { readdir } from 'fs/promises'
import { Client, Collection } from 'discord.js'
import { removeFileExtension } from './util.js'

// Création du client et de ses propriétés
export const prepareClient = () => {
	const client = new Client({
		ws: {
			intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES'],
		},
	})
	client.config = {
		guildID: process.env.GUILD_ID,
		channelID: process.env.CHANNEL_ID,
		roleID: process.env.ROLE_ID,
	}

	return client
}

export const eventsLoader = async client => {
	// Dossier des events
	const eventsDir = await readdir('./src/events')

	// Pour chaque catégorie d'events
	eventsDir.forEach(async eventCategory => {
		// Acquisition des events
		const events = (await readdir(`./src/events/${eventCategory}`)).filter(file =>
			file.endsWith('.js'),
		)

		// Pour chaque event, on l'acquérit et on le charge
		Promise.all(
			events.map(async eventFile => {
				const { default: execute, once } = await import(
					`../events/${eventCategory}/${eventFile}`
				)
				const eventName = removeFileExtension(eventFile)

				if (once) return client.once(eventName, (...args) => execute(...args, client))
				return client.on(eventName, (...args) => execute(...args, client))
			}),
		)
	})
}
