export const LinkTypeMapping = new Map<string, string>([
  ["a7bfc9da-1c89-4567-900b-c93b4ff3c1b2", "GitHub"],
  ["17db2d89-6c6e-4b88-9e20-cbf9b07d19a2", "Twitter/X"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8b", "LinkedIn"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8c", "Facebook"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8d", "Threads"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8e", "Instagram"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8f", "TikTok"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d90", "Telegram"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d91", "Snapchat"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d92", "YouTube"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d93", "Twitch"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d94", "Medium"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d98", "Reddit"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d99", "Discord"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d9a", "Dribbble"],
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d9b", "Behance"],
  ["custom_link_id", "Custom"],
]);

export const LinkBaseUrls = new Map<string, string>([
  ["a7bfc9da-1c89-4567-900b-c93b4ff3c1b2", "https://github.com/"], // GitHub
  ["17db2d89-6c6e-4b88-9e20-cbf9b07d19a2", "https://twitter.com/"], // Twitter/X
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8b", "https://linkedin.com/in/"], // LinkedIn
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8c", "https://facebook.com/"], // Facebook
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8d", "https://threads.net/"], // Threads
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8e", "https://instagram.com/"], // Instagram
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d8f", "https://tiktok.com/@"], // TikTok
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d90", "https://t.me/"], // Telegram
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d91", "https://snapchat.com/add/"], // Snapchat
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d92", "https://youtube.com/"], // YouTube
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d93", "https://twitch.tv/"], // Twitch
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d94", "https://medium.com/@"], // Medium
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d98", "https://reddit.com/user/"], // Reddit
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d99", "https://discord.com/users/"], // Discord
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d9a", "https://dribbble.com/"], // Dribbble
  ["6e0a5b89-9f93-49e3-b2d8-497a786e1d9b", "https://behance.net/"], // Behance
  ["custom_link_id", ""], // Custom
]);
// List of keys of LinkBaseUrls
export const LinkMappingKeys = Array.from(LinkBaseUrls.keys());
