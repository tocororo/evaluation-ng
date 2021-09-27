
import { Environment } from "toco-lib";

export class EnvironmentImpl implements Environment {
  production = true;
  evaluationHost = 'http://localhost:4200/';
  sceibaHost = 'https://sceiba.cu/';
  cuorHost = 'https://organizaciones.sceiba.cu/';
  evaluationApi = 'https://evaluation.sceiba.cu/api/';
  sceibaApi = 'https://sceiba.cu/api/';
  cuorApi = 'https://organizaciones.sceiba.cu/api/';

  appHost = 'https://sceiba.cu';
  appName = 'Sceiba';

  websiteUsername_Twitter = '@SceibaCuba';
  websiteUsername_Facebook = '@sceiba';

  oauthRedirectUri = 'https://sceiba.cu/';
  oauthClientId = 'ICC1j7NOH0067SgsMyKUXM9ZipavAXHPrbW1ll3V';
  oauthScope = 'user:email';
  topOrganizationPID = '';
  cachableUrls = [];

  matomoUrl = 'https://crai-stats.upr.edu.cu/';
  matomoSiteId = 7;
}

export const environment = new EnvironmentImpl();

export const allowedURLS = ['https://sceiba.cu/api/'];
