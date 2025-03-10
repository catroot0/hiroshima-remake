import ChannelManager from "./channel.js";
import { RoleManager } from "./role.js";
import checkPermissions from "./checkPermission.js";
import { client } from "../index.js";
import { selectedGuild } from "../alert/getGuild.js";
export default async function nuke() {
  const guild = await client.guilds.fetch(selectedGuild.id);
  const bot = await guild.members.fetch(client.user.id);
  if (!(await checkPermissions(bot))) return;
  await RoleManager.deleteAllRoles(guild);
  await ChannelManager.deleteAllChannels(guild);
  await ChannelManager.createChannel(guild);
}
