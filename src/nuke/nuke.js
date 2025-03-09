import ChannelManager from "./channel.js";
import { RoleManager } from "./role.js";
import checkPermissions from "./checkPermission.js";
export default async function nuke() {
  if (!(await checkPermissions())) return;
  await RoleManager.deleteAllRoles();
  await ChannelManager.deleteAllChannels();
  await ChannelManager.createChannel();
}
