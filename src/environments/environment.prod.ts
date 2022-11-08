
import { Environment } from "toco-lib";

export class EnvironmentImpl implements Environment {
  production = true;
  sceibaHost = 'https://cuba-iroko.sceiba.org/';
  cuorHost = 'https://cuba-iroko.sceiba.org/';
  sceibaApi = 'https://cuba-iroko.sceiba.org/api/';
  cuorApi = 'https://cuba-iroko.sceiba.org/api/';

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


  sceiba = 'https://cuba.sceiba.org';
  discover = '/search';
  catalog = 'https://cuba-catalogo.sceiba.org/';
  revistasmes = 'https://cuba-revistasmes.sceiba.org/';
  organizations = 'https://cuba-organizaciones.sceiba.org/';
  persons = 'https://cuba-personas.sceiba.org/';
  vocabularies = 'https://vocabularios.sceiba.cu/';
  moodle = 'https://courses.sceiba.org/';
  evaluations = 'https://evaluaciones.sceiba.org/';
}

export const environment = new EnvironmentImpl();

export const allowedURLS = ['https://sceiba.cu/api/'];
