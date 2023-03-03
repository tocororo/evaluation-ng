import { Environment } from "toco-lib";

export class EnvironmentImpl implements Environment {
  production = true;
  sceibaHost = "https://cuba-iroko.sceiba.org/";
  cuorHost = "https://cuba-iroko.sceiba.org/";
  sceibaApi = "https://cuba-iroko.sceiba.org/api/";
  cuorApi = "https://cuba-iroko.sceiba.org/api/";

  appHost = "https://evaluaciones.sceiba.org";
  appName = "Sceiba";

  websiteUsername_Twitter = "@SceibaCuba";
  websiteUsername_Facebook = "@sceiba";

  oauthRedirectUri = "https://evaluaciones.sceiba.org";
  oauthClientId = "rbnvYsYpxy1Q49Asxbl8Rmyr2T5Nw6CcRw9Cc5eR";
  oauthScope = "user:email";
  topOrganizationPID = "";
  cachableUrls = [];

  matomoUrl = "https://crai-stats.upr.edu.cu/";
  matomoSiteId = 7;

  sceiba = "10.2.83.228";
  discover = "/search";
  catalog = "https://cuba-catalogo.sceiba.org/";
  revistasmes = "https://cuba-revistasmes.sceiba.org/";
  organizations = "https://cuba-organizaciones.sceiba.org/";
  persons = "https://cuba-personas.sceiba.org/";
  vocabularies = "https://vocabularios.sceiba.cu/";
  moodle = "https://courses.sceiba.org/";
  evaluations = "https://evaluaciones.sceiba.org/";


  oauthInfo = {
    serverHost: this.sceibaHost,
    loginUrl: this.sceibaHost + 'oauth/internal/authorize',
    tokenEndpoint: this.sceibaHost + 'oauth/token',
    userInfoEndpoint: this.sceibaApi + 'me',
    appHost: this.appHost,
    appName: this.appName,
    oauthRedirectUri: this.oauthRedirectUri,
    oauthClientId: this.oauthClientId,
    oauthScope: this.oauthScope,
  }
}

export const environment = new EnvironmentImpl();

export const allowedURLS = ["https://sceiba.cu/api/"];
