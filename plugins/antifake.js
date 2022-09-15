const {Function,setAntiFake,antiFakeList,prefix} = require('../lib/')
const {getFake} = require('../lib/database/antifake')
Function({pattern: 'kickfilter ?(.*)', fromMe: true, desc: 'set antifake', type: 'group'}, async (m, match) => {
if (!m.isGroup) return await m.reply('_This command only works in group chats_')
const groupMetadata = await m.client.groupMetadata(m.chat)
const isAntiFake = await getFake(m.jid)
let buttons = [
  {buttonId: prefix + 'kickfilter enable', buttonText: {displayText: 'enable'}, type: 1},
  {buttonId: prefix + 'kickfilter disable', buttonText: {displayText: 'disable'}, type: 1},
  {buttonId: prefix + 'kickfilter check', buttonText: {displayText: 'check'}, type: 1}
]
let isantiFake = isAntiFake.enabled || false
const buttonMessage = {
text: 'kickfilter Manager',
footer: 'Group Name : ' + groupMetadata.subject + '\nAntiFake status : ' + isantiFake,
buttons: buttons,
headerType: 1
}
if (!match) return await m.client.sendMessage(m.chat, buttonMessage)
if (match == 'list') {
if (!isAntiFake) return await m.reply("_You don't set the Antifake yet.!_\n__To set:__ ```.antifake 1,44,972...```")
return await m.reply(await antiFakeList(m.jid))
}
if (match == 'enable' || match == 'disable') {
await setAntiFake(m.jid, match)
return await m.reply(`_Antifake ${match == 'enable' ? 'Aktiviert' : 'Deaktiviert'}_`)
}
await setAntiFake(m.jid, match)
return await m.reply('_Kickfilter hinzugefügt_')
})