import Channel from "./channel.js";
import { deleteAllRoles } from "./role.js";
import checkPermissions from "./checkPermission.js";
export default async function nuke() {
  if (!(await checkPermissions())) return;
  await deleteAllRoles();
  await Channel.deleteAllChannels();
  await Channel.createChannel();
}
