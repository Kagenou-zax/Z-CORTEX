/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SocialLink {
  id: string;
  name: string;
  label: string;
  url: string;
  handle: string;
  color: string;
  bgHover: string;
  description: string;
}

export const SOCIAL_LINKS = {
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    label: '@aeonwright.studio',
    url: 'https://ig.me/m/aeonwright.studio',
    profileUrl: 'https://instagram.com/aeonwright.studio',
    handle: '@aeonwright.studio',
    color: '#E4405F',
    bgHover: 'hover:bg-pink-600 hover:border-pink-600',
    description: 'Direct DM channel on Instagram: ig.me/m/aeonwright.studio',
  },
  github: {
    id: 'github',
    name: 'GitHub',
    label: '@noirbyte',
    url: 'https://github.com/noirbyte',
    handle: '@noirbyte',
    color: '#24292F',
    bgHover: 'hover:bg-slate-900 hover:border-slate-900',
    description: 'Open source libraries, architectures, and production code',
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    label: '@noirbyte_tech',
    url: 'https://x.com/noirbyte_tech',
    handle: '@noirbyte_tech',
    color: '#000000',
    bgHover: 'hover:bg-slate-950 hover:border-slate-950',
    description: 'Tech thoughts, engineering logs, and industry releases',
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    label: '+234 805 055 9657',
    url: 'https://wa.me/2348050559657',
    chatUrl: 'https://wa.me/2348050559657?text=Hello%20Faadil%2C%20I%20saw%20your%20Noirbyte%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.',
    handle: '+234 805 055 9657',
    color: '#25D366',
    bgHover: 'hover:bg-emerald-600 hover:border-emerald-600',
    description: 'Instant chat for project inquiries, scoping, and direct booking: wa.me/2348050559657',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'Faadil Nurudeen',
    url: 'https://linkedin.com/in/faadil-nurudeen',
    handle: 'faadil-nurudeen',
    color: '#0A66C2',
    bgHover: 'hover:bg-blue-700 hover:border-blue-700',
    description: 'Professional networking and technical leadership',
  },
};
