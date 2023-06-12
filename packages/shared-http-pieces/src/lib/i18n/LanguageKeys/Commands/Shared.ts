import { FT, T } from '@skyra/http-framework-i18n';

export const DonateName = T('commands/shared:donateName');
export const DonateDescription = T('commands/shared:donateDescription');
export const DonateResponse = FT<{ urls: string }>('commands/shared:donateResponse');
export const InfoName = T('commands/shared:inviteName');
export const InfoDescription = T('commands/shared:inviteDescription');
export const InfoEmbedDescription = T('commands/shared:infoEmbedDescription');
export const InfoFieldUptimeTitle = T('commands/shared:infoFieldUptimeTitle');
export const InfoFieldUptimeValue = FT<{ host: string; client: string }>('commands/shared:infoFieldUptimeValue');
export const InfoFieldServerUsageTitle = T('commands/shared:infoFieldServerUsageTitle');
export const InfoFieldServerUsageValue = FT<{ cpu: string; heapUsed: string; heapTotal: string }>('commands/shared:infoFieldServerUsageValue');
export const InfoButtonInvite = T('commands/shared:infoButtonInvite');
export const InfoButtonSupport = T('commands/shared:infoButtonSupport');
export const InfoButtonGitHub = T('commands/shared:infoButtonGitHub');
export const InfoButtonDonate = T('commands/shared:infoButtonDonate');
