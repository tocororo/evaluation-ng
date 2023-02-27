import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-evaluation-view",
  templateUrl: "./evaluation-view.component.html",
  styleUrls: ["./evaluation-view.component.scss"],
})
export class EvaluationViewComponent implements OnInit {
  evaluationId: string;
  evaluationData = {
    data: {
      date: "",
      description:
        "metodologia de sceiba para la evaluacion de revistas cientificas",
      journalData: {
        id: "",
        issn: "0317-8471",
        name: "nannaa",
        type: "journal",
        url: "https://www.kak",
      },
      name: "sceiba-journal",
      resultAndRecoms: {
        generalEvaluationName: "Evaluación general de la revista",
        generalEvaluationValue: "Nivel de calidad en desarrollo",
        sections: [
          {
            categories: [
              {
                questionsOrRecoms: [
                  {
                    id: "c_001_r_001",
                    value: "Postular revista a DOAJ",
                  },
                  {
                    id: "c_001_r_003",
                    value:
                      "Postular revista a otras bases de datos de indización y resumen especializadas",
                  },
                  {
                    id: "c_001_r_003",
                    value:
                      "Postular revista a otras bases de datos de indización y resumen multidisciplinares",
                  },
                ],
                title: "Indización",
                titleEvaluationValue: "MEDIO",
              },
              {
                questionsOrRecoms: [
                  {
                    id: "c_002_r_002",
                    value:
                      "Actualizar el sitio web propio de la revista con todos los números publicados en los últimos dos años",
                  },
                  {
                    id: "c_002_r_004",
                    value:
                      "Evaluar cómo alinear las buenas prácticas de acceso abierto con las políticas editoriales",
                  },
                  {
                    id: "c_002_r_005",
                    value:
                      "Promover el déposito de los artículos en repositorios internacionales, nacional, institucional, multidisciplinarios y tématicos",
                  },
                ],
                title: "Acceso",
                titleEvaluationValue: "BAJO",
              },
              {
                questionsOrRecoms: [],
                title: "Interoperabilidad",
                titleEvaluationValue: "ALTO",
              },
              {
                questionsOrRecoms: [],
                title: "Apertura",
                titleEvaluationValue: "MEDIO",
              },
              {
                questionsOrRecoms: [
                  {
                    id: "c_005_r_001",
                    value:
                      "Aumentar la representación de expertos y especialistas externos a la institución editora, considerando mayor presencia de afiliados a instituciones extranjeras",
                  },
                  {
                    id: "c_005_r_002",
                    value:
                      'Desarrollar mecanismos rigurosos que garanticen la conducta ética, la integridad académica, la resolución de conflictos de intereses y la transparencia en el proceso editorial según las buenas prácticas internacionales de publicación (ej. COPE guidelines,"&" ICMJE Recommendations)',
                  },
                ],
                title: "Internacionalización",
                titleEvaluationValue: "BAJO",
              },
              {
                questionsOrRecoms: [
                  {
                    id: "c_006_r_001",
                    value:
                      "Implementar funcionalidad de compartir contenidos en redes sociales",
                  },
                  {
                    id: "c_006_r_002",
                    value:
                      "Crear y mantener activos perfiles tanto en redes sociales generales como en Mendeley y Researchgate para aumentar la difusión de sus publicaciones",
                  },
                ],
                title: "Redes sociales",
                titleEvaluationValue: "MEDIO",
              },
            ],
            title: "Evaluación de la visibilidad",
            titleEvaluationValue: "MEDIO",
          },
          {
            categories: [
              {
                questionsOrRecoms: [
                  {
                    id: "c_007_r_001",
                    value:
                      "a) Orientar a los profesores que forman parte del consejo/comité editorial para el direccionamiento estratégico de la calidad de la revista, b) ofrecer pautas a los autores que les permitan mejorar el rigor y originalidad de los trabajos que envian a la revista indicándolas explícitamnete en las instrucciones a los autores y la política editorial así como en Editoriales, Cartas al editor o otros tipos de artículos publicados en la misma revista, c) mejorar la calidad de las revisiones a través de la mejora de los formularios de revisión, la elección de los revisores más adecuados para cada manuscrito, compartir las buenas prácticas de revisión, desarrollar competencias en los revisores novatos que les permitan reconocer las contribuciones potenciales de los manuscritos y cómo facilitar el desarrollo de ese potencial para elevar la calidad de los manuscritos aceptados y publicados",
                  },
                ],
                title: "Impacto académico",
                titleEvaluationValue: "MEDIO",
              },
              {
                questionsOrRecoms: [],
                title: "Posición en rankings de revistas",
                titleEvaluationValue: "BAJO",
              },
            ],
            title: "Evaluación del impacto",
            titleEvaluationValue: "MEDIO",
          },
        ],
      },
      sections: [
        {
          categories: [
            {
              questionsOrRecoms: [
                {
                  answer: "false",
                  desc: "Está incluida en DOAJ",
                  hint: "Datos oficiales de DOAJ/MIAR",
                  id: "c_001_q_001",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Está en Scopus y/o JCR de la Web de la Ciencia",
                  hint: "MIAR",
                  id: "c_001_q_002",
                  type: "bool",
                },
                {
                  answer: "0",
                  desc: "Está incluida en base de datos de indización y resumen especializada",
                  hint: "MIAR",
                  id: "c_001_q_003",
                  min: 0,
                  type: "integer",
                },
                {
                  answer: "0",
                  desc: "Está incluida en base de datos de indización y resumen multidisciplinar",
                  hint: "MIAR",
                  id: "c_001_q_004",
                  min: 0,
                  type: "integer",
                },
              ],
              title: "Indización",
            },
            {
              questionsOrRecoms: [
                {
                  answer: "true",
                  desc: "Existe un sitio web propio de la revista",
                  hint: "Google",
                  id: "c_002_q_001",
                  type: "bool",
                },
                {
                  answer: "SOLAMENTE_DISPONIBLE_ULTIMO_NUM",
                  desc: "Están disponibles los últimos números en el sitio web de la revista",
                  hint: "Sitio oficial de la revista",
                  id: "c_002_q_002",
                  selectOptions: [
                    {
                      label: "N/A (no aplica)",
                      value: "NO_APLICA",
                    },
                    {
                      label:
                        "No se encuentra disponible el último número de la revista",
                      value: "NO_DISPONIBLE_ULTIMO_NUM",
                    },
                    {
                      label:
                        "Solamente se encuentra el último número de la revista",
                      value: "SOLAMENTE_DISPONIBLE_ULTIMO_NUM",
                    },
                    {
                      label:
                        "Se encuentran todos los números publicados por la revista en los últimos dos años",
                      value: "TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "NO_DISPONIBLE_IND_NO_DESC_NUM",
                  desc: "Están disponibles los artículos de manera individual en el sitio web de la revista",
                  hint: "Sitio oficial de la revista",
                  id: "c_002_q_003",
                  selectOptions: [
                    {
                      label:
                        "No están disponibles de manera individual ni puede descargarse el número completo",
                      value: "NO_DISPONIBLE_IND_NO_DESC_NUM",
                    },
                    {
                      label:
                        "No están disponibles de manera individual pero puede descargarse el número completo sin restricciones",
                      value: "NO_DISPONIBLE_IND_SI_DESC_NUM",
                    },
                    {
                      label:
                        "Están disponibles de manera individual con restricciones de acceso y/o descarga",
                      value: "SI_DISPONIBLE_IND_NO_DESC_NUM",
                    },
                    {
                      label:
                        "Se acceden y descargan libremente de manera individual",
                      value: "SI_DISPONIBLE_IND_SI_DESC_NUM",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "true",
                  desc: "Existen artículos de la revista en repositorios nacional y/o institucional de acceso abierto",
                  hint: "Google académico",
                  id: "c_002_q_004",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Existen artículos de la revista en repositorios de acceso abierto internacionales generales y/o temáticos (ej.: Zenodo, La Referencia, OceanDocs, Arxich, entre otros)",
                  hint: "Google académico",
                  id: "c_002_q_005",
                  type: "bool",
                },
              ],
              title: "Acceso",
            },
            {
              questionsOrRecoms: [
                {
                  answer: "true",
                  desc: "Emplea algún formato de metadatos (ej. Uso de OAI-DC, DC, Cerif, Mods, METS, etc.)",
                  hint: "Validador OpenAIRE o https://validator.oaipmh.com/#ListMetadataFormats",
                  id: "c_003_q_001",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Uso de OAI-PMH (puede existir o no el conjunto 'openaire' o 'ec_fundedresources' o 'driver')",
                  hint: "Validador OpenAIRE o https://validator.oaipmh.com",
                  id: "c_003_q_002",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Están presentes en todos los artículos los metadatos definidos como obligatorios en el OpenAIRE Guidelines for Literature Repositories v3",
                  hint: "Sitio oficial de la revista/validador OpenAIRE",
                  id: "c_003_q_003",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Están presentes en todos los artículos los metadatos Field Language, Field License Condition y Field Source, definidos como recomendables en el OpenAIRE Guidelines for Literature Repositories v3",
                  hint: "Validador OpenAIRE",
                  id: "c_003_q_004",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Incluye entre sus metadatos el Identificador Persistente - ISSN y/o ISSN-E",
                  hint: "Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers",
                  id: "c_003_q_005",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Incluye entre sus metadatos Identificador(es) Persistente(s) de algún identificador de objetos digitales (ej. DOI-Handle-URI-Scopus ID-Wos ID-Scielo ID)",
                  hint: "Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers",
                  id: "c_003_q_006",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Incluye entre sus metadatos Identificador(es) Persistente(s) para personas (ej. ORCID)",
                  hint: "Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers",
                  id: "c_003_q_007",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Incluye entre sus metadatos Identificador(es) Persistente(s) para organizaciones (ej. GRID, ROR)",
                  hint: "Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers",
                  id: "c_003_q_008",
                  type: "bool",
                },
              ],
              title: "Interoperabilidad",
            },
            {
              questionsOrRecoms: [
                {
                  answer: "SOLAMENTE_VER_POST_PRINT",
                  desc: "Permite que se depositen los artículos en plataformas no comerciales (repositorios de acceso abierto) o comerciales (ej. Researchgate)",
                  hint: "Sitio oficial de la revista/Aura",
                  id: "c_004_q_001",
                  selectOptions: [
                    {
                      label:
                        "Varias versiones de los artículos (incluyendo la versión final del editor)",
                      value: "VARIAS_VERSIONES_ART",
                    },
                    {
                      label: "Solamente la versión preprint",
                      value: "SOLAMENTE_VER_PREPRINT",
                    },
                    {
                      label:
                        "Solamente la versión post-print (versión final del editor)",
                      value: "SOLAMENTE_VER_POST_PRINT",
                    },
                    {
                      label: "No permite el autoarchivo de ninguna versión",
                      value: "NO_PERMITE_AUTOARCHIVADO_VER",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "true",
                  desc: "Declara que no tiene costo por procesamiento de artículos (APC)",
                  hint: "Sitio oficial de la revista",
                  id: "c_004_q_002",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Es una revista de acceso abierto y declara política de acceso abierto",
                  hint: "Sitio oficial de la revista",
                  id: "c_004_q_003",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Promueve el depósito de los datos de investigación en repositorios de acceso abierto como parte de su política editorial",
                  hint: "Sitio oficial de la revista",
                  id: "c_004_q_004",
                  type: "bool",
                },
                {
                  answer: "true",
                  desc: "Ofrece sus contenidos bajo algun tipo de licencia Creative Common",
                  hint: "Sitio oficial de la revista",
                  id: "c_004_q_005",
                  type: "bool",
                },
              ],
              title: "Apertura",
            },
            {
              questionsOrRecoms: [
                {
                  answer: "EN_MAS_DE_UN_IDIOMA",
                  desc: "Declara que acepta artículos en idioma",
                  hint: "Sitio oficial de la revista",
                  id: "c_005_q_001",
                  selectOptions: [
                    {
                      label: "Solamente Español",
                      value: "SOLAMENTE_ESPAÑOL",
                    },
                    {
                      label: "En más de un idioma",
                      value: "EN_MAS_DE_UN_IDIOMA",
                    },
                    {
                      label: "Solamente un idioma (diferente al Español)",
                      value: "SOLAMENTE_UN_IDIOMA",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "true",
                  desc: "El porcentaje de artículos originales en Inglés publicados anualmente supera el %15",
                  hint: "Sitio oficial de la revista",
                  id: "c_005_q_002",
                  type: "bool",
                },
                {
                  answer: "MENOS_DEL_20",
                  desc: "Los miembros del comité editorial que pertenecen a instituciones extranjeras",
                  hint: "Sitio oficial de la revista",
                  id: "c_005_q_003",
                  selectOptions: [
                    {
                      label: "Más del 50%",
                      value: "MAS_DEL_50",
                    },
                    {
                      label: "Entre el 20% y el 50%",
                      value: "ENTRE_EL_20_Y_50",
                    },
                    {
                      label: "Menos del 20%",
                      value: "MENOS_DEL_20",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "ENTRE_EL_20_Y_70",
                  desc: "Los miembros del comité editorial que son externos a la institución editora representan",
                  hint: "Sitio oficial de la revista",
                  id: "c_005_q_004",
                  selectOptions: [
                    {
                      label: "Más del 70%",
                      value: "MAS_DEL_70",
                    },
                    {
                      label: "Entre el 20% y el 70%",
                      value: "ENTRE_EL_20_Y_70",
                    },
                    {
                      label: "Menos del 20%",
                      value: "MENOS_DEL_20",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO",
                  desc: "En los últimos dos años los artículos firmados por miembros del consejo editorial o por miembros de la institución editora constituyen",
                  hint: "Sitio oficial de la revista",
                  id: "c_005_q_005",
                  selectOptions: [
                    {
                      label: "Más del 50% del total publicado en el período",
                      value: "MAS_DEL_50_TOTAL_PUBLICADO_PERIODO",
                    },
                    {
                      label:
                        "Entre el 20 y el 50% del total publicado en el período",
                      value: "ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO",
                    },
                    {
                      label: "Menos del 20% del total publicado en el período",
                      value: "MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS",
                  desc: "La firma de autores afiliados a instituciones extranjeras aparece en",
                  hint: "Sitio oficial de la revista",
                  id: "c_005_q_006",
                  selectOptions: [
                    {
                      label:
                        "Más del 25% del total de artículos en los últimos dos años",
                      value: "MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS",
                    },
                    {
                      label:
                        "Entre el 5% y el 25% del total de artículos en los últimos dos años",
                      value: "ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS",
                    },
                    {
                      label:
                        "Menos del 5% del total de artículos en los últimos dos años",
                      value: "MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS",
                    },
                  ],
                  type: "select",
                },
              ],
              title: "Internacionalización",
            },
            {
              questionsOrRecoms: [
                {
                  answer: "false",
                  desc: "Posee funcionalidad de compartir contenidos en redes sociales",
                  hint: "Sitio oficial de la revista/Aura",
                  id: "c_006_q_001",
                  type: "bool",
                },
                {
                  answer: "PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE",
                  desc: "Posee perfiles en redes sociales",
                  hint: "Twitter, Facebook, Mendeley y/o Researchgate (Plum o Dimensions en caso de tener DOI)",
                  id: "c_006_q_002",
                  selectOptions: [
                    {
                      label: "No",
                      value: "NO",
                    },
                    {
                      label:
                        "Posee perfil en al menos una red social (Twitter-Facebook-Instagram) pero no en Mendeley y/o Researchgate",
                      value: "PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE",
                    },
                    {
                      label:
                        "Posee perfil en al menos una red social (Twitter-Facebook-Instagram) en Mendeley y/o Researchgate",
                      value: "PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "GENERALES_TWITTER_FACEBOOK_INSTAGRAM",
                  desc: "Difunde sus artículos a través de redes sociales",
                  hint: "Twitter, Facebook, Mendeley y/o Researchgate (Plum o Dimensions en caso de tener DOI)",
                  id: "c_006_q_003",
                  selectOptions: [
                    {
                      label: "No",
                      value: "NO",
                    },
                    {
                      label:
                        "Generales como Twitter-Facebook-Instagram (al menos una de ellas)",
                      value: "GENERALES_TWITTER_FACEBOOK_INSTAGRAM",
                    },
                    {
                      label: "Solamente en Mendeley y/o Researchgate",
                      value: "SOLAMENTE_MENDELEY_RESEARCHGATE",
                    },
                    {
                      label:
                        "Tanto en Twitter-Facebook-Instagram (al menos una de ellas) como en Mendeley y/o Researchgate",
                      value: "TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE",
                    },
                  ],
                  type: "select",
                },
              ],
              title: "Redes sociales",
            },
          ],
          description: "Indicador de Visibilidad",
          title: "Visibilidad",
        },
        {
          categories: [
            {
              questionsOrRecoms: [
                {
                  answer: "true",
                  desc: "Tiene citas registradas en Scopus/Scimago o Scielo Analytics o Google Académico",
                  hint: "",
                  id: "c_007_q_001",
                  type: "bool",
                },
                {
                  answer: "MAS_DEL_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA",
                  desc: "Citas recibidas en Scopus/Scimago o Web de la Ciencia/JCR o Google Académico/Scielo Analytics",
                  hint: "Este elemento se considerará para una de las siguientes opciones: Scopus/Scimago o Web de la Ciencia/JCR o Google Académico/Scielo Analytics. Si se desea estimar en más de una opción, hay que hacerlo de manera diferenciada. Nunca deben sumarse los totales de citación provenientes de diferentes fuentes",
                  id: "c_007_q_002",
                  selectOptions: [
                    {
                      label:
                        "Menos del 20% de los artículos publicados en los últimos tres años han recibido al menos una cita",
                      value: "MENOS_DEL_20_ART_ULT_3_AÑOS_REC_ALGUNA_CITA",
                    },
                    {
                      label:
                        "Entre el 20% y el 50% de los artículos publicados en los últimos tres años han recibido al menos una cita",
                      value: "ENTRE_EL_20_Y_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA",
                    },
                    {
                      label:
                        "Más del 50% de los artículos publicados en los últimos tres años han recibido al menos una cita",
                      value: "MAS_DEL_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA",
                    },
                  ],
                  type: "select",
                },
                {
                  answer: "MENOR_IGUAL_IND_H5_REV_PER_ANT",
                  desc: "Según Google Académico el índice H5 de la revista",
                  hint: "Google académico",
                  id: "c_007_q_003",
                  selectOptions: [
                    {
                      label: "N/A (no aplica)",
                      value: "NO_APLICA",
                    },
                    {
                      label:
                        "Es menor o igual al índice H5 de la revista en el período anterior",
                      value: "MENOR_IGUAL_IND_H5_REV_PER_ANT",
                    },
                    {
                      label:
                        "Es mayor al índice H5 de la revista en el período anterior",
                      value: "MAYOR_IND_H5_REV_PER_ANT",
                    },
                  ],
                  type: "select",
                },
              ],
              title: "Impacto académico",
            },
            {
              questionsOrRecoms: [
                {
                  answer: "NO",
                  desc: "Está en rankings de revistas",
                  hint: "Scopus/Scimago, JCR, Redalyc, REDIB, CIRS",
                  id: "c_008_q_001",
                  selectOptions: [
                    {
                      label: "No",
                      value: "NO",
                    },
                    {
                      label: "En Q3-Q4 de Journal Citation Report/Scimago",
                      value: "Q3_Q4_JOURNAL_CITATION",
                    },
                    {
                      label: "En Q1-Q2 de Journal Citation Report/Scimago",
                      value: "Q1_Q2_JOURNAL_CITATION",
                    },
                    {
                      label:
                        "Solamente incluida en rankings de revistas regionales/temáticas como Redalyc-REDIB-CIRS-etc.",
                      value: "SOLAMENTE_RANKINGS_REV_REG_TEMAT",
                    },
                  ],
                  type: "select",
                },
              ],
              title: "Posición en rankings de revistas",
            },
          ],
          description: "Indicador de Visibilidad",
          title: "Impacto",
        },
      ],
      user: "",
      version: "0.0.1",
    },
    datetime: "2023-02-24T08:50:59.253091",
    id: 99,
    notes: null,
    state: "PROCESSING",
    user_id: 1,
    uuid: "2dad8263-78e1-4a29-95b5-b9ac2c54546f",
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.evaluationId = params["uuid"];
    });
    console.log(this.evaluationId);
  }
}
