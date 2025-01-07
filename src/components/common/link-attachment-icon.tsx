import {
  FaLink,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaThreads,
  FaInstagram,
  FaTiktok,
  FaTelegram,
  FaSnapchat,
  FaYoutube,
  FaTwitch,
  FaMedium,
  FaReddit,
  FaDiscord,
  FaDribbble,
  FaBehance,
} from "react-icons/fa6";

export const LinkAttachmentIcon = ({
  id,
  size,
  className,
}: {
  id: string;
  size: number;
  className: string;
}) => {
  if (id === "cusotm_link_id") {
    return <FaLink size={size} className={className} />;
  } else if (id === "a7bfc9da-1c89-4567-900b-c93b4ff3c1b2") {
    return <FaGithub size={size} className={className} />;
  } else if (id === "17db2d89-6c6e-4b88-9e20-cbf9b07d19a2") {
    return <FaTwitter size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d8b") {
    return <FaLinkedin size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d8c") {
    return <FaFacebook size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d8d") {
    return <FaThreads size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d8e") {
    return <FaInstagram size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d8f") {
    return <FaTiktok size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d90") {
    return <FaTelegram size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d91") {
    return <FaSnapchat size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d92") {
    return <FaYoutube size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d93") {
    return <FaTwitch size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d94") {
    return <FaMedium size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d98") {
    return <FaReddit size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d99") {
    return <FaDiscord size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d9a") {
    return <FaDribbble size={size} className={className} />;
  } else if (id === "6e0a5b89-9f93-49e3-b2d8-497a786e1d9b") {
    return <FaBehance size={size} className={className} />;
  } else {
    return <FaLink className={className} size={size} />;
  }
};
