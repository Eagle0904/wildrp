import { Client } from 'discord.js'

/**
 * Ferme proprement l'application
 * @param {'SIGINT' | 'SIGTERM'} signal received
 * @param {Client} client Discord.js
 */
export const closeGracefully = (signal, client) => {
	console.log(`Received signal to terminate : ${signal}`)

	client.destroy()
	console.log('Discord client successfully destroyed')

	process.exit(0)
}

/**
 * Enlève l'extension d'un fichier
 * @param {string} fileName nom du fichier
 * @returns le nom du fichier sans son extension
 * @example removeFileExtension('document.pdf') => 'document'
 */
export const removeFileExtension = fileName => {
	const fileArray = fileName.split('.')
	fileArray.pop()
	return fileArray.join('.')
}
