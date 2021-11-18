
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { cloneValue, Environment, Hit } from 'toco-lib';

import { CategoryQuestionType, Evaluation, EvaluationAnswer } from './evaluation.entity';

/**
 * Represents an object with all its values set to empty in Spanish language. 
 * An empty evaluation must have its `id` set to `undefined`. 
 */
const evaluationEmpty_Spanish: any = {
    'metadata': {
        'id': undefined,  /* An empty evaluation must have its `id` set to `undefined`. */
        'user': 'nick_1',
        'date': new Date(),
        'journalData': {
            'name': undefined,
            'url': undefined,
            'issn': undefined
        },
        'sections': [
            {  /* Visibility Section */
                'title': 'Visibilidad',
                'categories': [
                    {
                        'title': 'Indización',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_001',
                                'desc': 'Está incluida en DOAJ',
                                'hint': 'Datos oficiales de DOAJ/MIAR',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_002',
                                'desc': 'Está en Scopus y/o JCR de la Web de la Ciencia',
                                'hint': 'MIAR',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_003',
                                'desc': 'Está incluida en base de datos de indización y resumen especializada',
                                'hint': 'MIAR',
                                'answer': undefined,
                                'min': 0
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_004',
                                'desc': 'Está incluida en base de datos de indización y resumen multidisciplinar',
                                'hint': 'MIAR',
                                'answer': undefined,
                                'min': 0
                            }
                        ]
                    },
                    {
                        'title': 'Acceso',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_001',
                                'desc': 'Existe un sitio web propio de la revista',
                                'hint': 'Google',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_002',
                                'desc': 'Están disponibles los últimos números en el sitio web de la revista',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'N/A (no aplica)',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'No se encuentra disponible el último número de la revista',
                                        'value': 'NO_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'Solamente se encuentra el último número de la revista',
                                        'value': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'Se encuentran todos los números publicados por la revista en los últimos dos años',
                                        'value': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_003',
                                'desc': 'Están disponibles los artículos de manera individual en el sitio web de la revista',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'No están disponibles de manera individual ni puede descargarse el número completo',
                                        'value': 'NO_DISPONIBLE_IND_NO_DESC_NUM'
                                    },
                                    {
                                        'label': 'No están disponibles de manera individual pero puede descargarse el número completo sin restricciones',
                                        'value': 'NO_DISPONIBLE_IND_SI_DESC_NUM'
                                    },
                                    {
                                        'label': 'Están disponibles de manera individual con restricciones de acceso y/o descarga',
                                        'value': 'SI_DISPONIBLE_IND_NO_DESC_NUM'
                                    },
                                    {
                                        'label': 'Se acceden y descargan libremente de manera individual',
                                        'value': 'SI_DISPONIBLE_IND_SI_DESC_NUM'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_004',
                                'desc': 'Existen artículos de la revista en repositorios nacional y/o institucional de acceso abierto',
                                'hint': 'Google académico',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_005',
                                'desc': 'Existen artículos de la revista en repositorios de acceso abierto internacionales generales y/o temáticos (ej.: Zenodo, La Referencia, OceanDocs, Arxich, entre otros)',
                                'hint': 'Google académico',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'Interoperabilidad',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_001',
                                'desc': 'Emplea algún formato de metadatos (ej. Uso de OAI-DC, DC, Cerif, Mods, METS, etc.)',
                                'hint': 'Validador OpenAIRE o https://validator.oaipmh.com/#ListMetadataFormats',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_002',
                                'desc': "Uso de OAI-PMH (puede existir o no el conjunto 'openaire' o 'ec_fundedresources' o 'driver')",
                                'hint': 'Validador OpenAIRE o https://validator.oaipmh.com',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_003',
                                'desc': 'Están presentes en todos los artículos los metadatos definidos como obligatorios en el OpenAIRE Guidelines for Literature Repositories v3',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_004',
                                'desc': 'Están presentes en todos los artículos los metadatos Field Language, Field License Condition y Field Source, definidos como recomendables en el OpenAIRE Guidelines for Literature Repositories v3',
                                'hint': 'Validador OpenAIRE',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_005',
                                'desc': 'Incluye entre sus metadatos el Identificador Persistente - ISSN y/o ISSN-E',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_006',
                                'desc': 'Incluye entre sus metadatos Identificador(es) Persistente(s) de algún identificador de objetos digitales (ej. DOI-Handle-URI-Scopus ID-Wos ID-Scielo ID)',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_007',
                                'desc': 'Incluye entre sus metadatos Identificador(es) Persistente(s) para personas (ej. ORCID)',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_008',
                                'desc': 'Incluye entre sus metadatos Identificador(es) Persistente(s) para organizaciones (ej. GRID, ROR)',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'Apertura',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_004_q_001',
                                'desc': 'Permite que se depositen los artículos en plataformas no comerciales (repositorios de acceso abierto) o comerciales (ej. Researchgate)',
                                'hint': 'Sitio oficial de la revista/Aura',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Varias versiones de los artículos (incluyendo la versión final del editor)',
                                        'value': 'VARIAS_VERSIONES_ART'
                                    },
                                    {
                                        'label': 'Solamente la versión preprint',
                                        'value': 'SOLAMENTE_VER_PREPRINT'
                                    },
                                    {
                                        'label': 'Solamente la versión post-print (versión final del editor)',
                                        'value': 'SOLAMENTE_VER_POST_PRINT'
                                    },
                                    {
                                        'label': 'No permite el autoarchivo de ninguna versión',
                                        'value': 'NO_PERMITE_AUTOARCHIVADO_VER'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_002',
                                'desc': 'Declara que no tiene costo por procesamiento de artículos (APC)',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_003',
                                'desc': 'Es una revista de acceso abierto y declara política de acceso abierto',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_004',
                                'desc': 'Promueve el depósito de los datos de investigación en repositorios de acceso abierto como parte de su política editorial',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_005',
                                'desc': 'Ofrece sus contenidos bajo algun tipo de licencia Creative Common',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'Internacionalización',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_001',
                                'desc': 'Declara que acepta artículos en idioma',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Solamente Español',
                                        'value': 'SOLAMENTE_ESPAÑOL'
                                    },
                                    {
                                        'label': 'En más de un idioma',
                                        'value': 'EN_MAS_DE_UN_IDIOMA'
                                    },
                                    {
                                        'label': 'Solamente un idioma (diferente al Español)',
                                        'value': 'SOLAMENTE_UN_IDIOMA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_005_q_002',
                                'desc': 'El porcentaje de artículos originales en Inglés publicados anualmente supera el %15',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_003',
                                'desc': 'Los miembros del comité editorial que pertenecen a instituciones extranjeras',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Más del 50%',
                                        'value': 'MAS_DEL_50'
                                    },
                                    {
                                        'label': 'Entre el 20% y el 50%',
                                        'value': 'ENTRE_EL_20_Y_50'
                                    },
                                    {
                                        'label': 'Menos del 20%',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_004',
                                'desc': 'Los miembros del comité editorial que son externos a la institución editora representan',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Más del 70%',
                                        'value': 'MAS_DEL_70'
                                    },
                                    {
                                        'label': 'Entre el 20% y el 70%',
                                        'value': 'ENTRE_EL_20_Y_70'
                                    },
                                    {
                                        'label': 'Menos del 20%',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_005',
                                'desc': 'En los últimos dos años los artículos firmados por miembros del consejo editorial o por miembros de la institución editora constituyen',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Más del 50% del total publicado en el período',
                                        'value': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'Entre el 20 y el 50% del total publicado en el período',
                                        'value': 'ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'Menos del 20% del total publicado en el período',
                                        'value': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_006',
                                'desc': 'La firma de autores afiliados a instituciones extranjeras aparece en',
                                'hint': 'Sitio oficial de la revista',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Más del 25% del total de artículos en los últimos dos años',
                                        'value': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'Entre el 5% y el 25% del total de artículos en los últimos dos años',
                                        'value': 'ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'Menos del 5% del total de artículos en los últimos dos años',
                                        'value': 'MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'Difusión y presencia en redes sociales generales y académicas',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_006_q_001',
                                'desc': 'Posee funcionalidad de compartir contenidos en redes sociales',
                                'hint': 'Sitio oficial de la revista/Aura',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_002',
                                'desc': 'Posee perfiles en redes sociales',
                                'hint': 'Twitter, Facebook, Mendeley y/o Researchgate (Plum o Dimensions en caso de tener DOI)',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'Posee perfil en al menos una red social (Twitter-Facebook-Instagram) pero no en Mendeley y/o Researchgate',
                                        'value': 'PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'Posee perfil en al menos una red social (Twitter-Facebook-Instagram) en Mendeley y/o Researchgate',
                                        'value': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_003',
                                'desc': 'Difunde sus artículos a través de redes sociales',
                                'hint': 'Twitter, Facebook, Mendeley y/o Researchgate (Plum o Dimensions en caso de tener DOI)',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'Generales como Twitter-Facebook-Instagram (al menos una de ellas)',
                                        'value': 'GENERALES_TWITTER_FACEBOOK_INSTAGRAM'
                                    },
                                    {
                                        'label': 'Solamente en Mendeley y/o Researchgate',
                                        'value': 'SOLAMENTE_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'Tanto en Twitter-Facebook-Instagram (al menos una de ellas) como en Mendeley y/o Researchgate',
                                        'value': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {  /* Impact Section */
                'title': 'Impacto',
                'categories': [
                    {
                        'title': 'Impacto académico',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_007_q_001',
                                'desc': 'Tiene citas registradas en Scopus/Scimago o Scielo Analytics o Google Académico',
                                'hint': '',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_002',
                                'desc': 'Citas recibidas en Scopus/Scimago o Web de la Ciencia/JCR o Google Académico/Scielo Analytics',
                                'hint': 'Este elemento se considerará para una de las siguientes opciones: Scopus/Scimago o Web de la Ciencia/JCR o Google Académico/Scielo Analytics. Si se desea estimar en más de una opción, hay que hacerlo de manera diferenciada. Nunca deben sumarse los totales de citación provenientes de diferentes fuentes',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Menos del 20% de los artículos publicados en los últimos tres años han recibido al menos una cita',
                                        'value': 'MENOS_DEL_20_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    },
                                    {
                                        'label': 'Entre el 20% y el 50% de los artículos publicados en los últimos tres años han recibido al menos una cita',
                                        'value': 'ENTRE_EL_20_Y_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    },
                                    {
                                        'label': 'Más del 50% de los artículos publicados en los últimos tres años han recibido al menos una cita',
                                        'value': 'MAS_DEL_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_003',
                                'desc': 'Según Google Académico el índice H5 de la revista',
                                'hint': 'Google académico',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'N/A (no aplica)',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'Es menor o igual al índice H5 de la revista en el período anterior',
                                        'value': 'MENOR_IGUAL_IND_H5_REV_PER_ANT'
                                    },
                                    {
                                        'label': 'Es mayor al índice H5 de la revista en el período anterior',
                                        'value': 'MAYOR_IND_H5_REV_PER_ANT'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        'title': 'Posición en rankings de revistas',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_008_q_001',
                                'desc': 'Está en rankings de revistas',
                                'hint': 'Scopus/Scimago, JCR, Redalyc, REDIB, CIRS',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'En Q3-Q4 de Journal Citation Report/Scimago',
                                        'value': 'Q3_Q4_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'En Q1-Q2 de Journal Citation Report/Scimago',
                                        'value': 'Q1_Q2_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'Solamente incluida en rankings de revistas regionales/temáticas como Redalyc-REDIB-CIRS-etc.',
                                        'value': 'SOLAMENTE_RANKINGS_REV_REG_TEMAT'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

/**
 * Represents an object with all its values set to empty in English language. 
 * An empty evaluation must have its `id` set to `undefined`. 
 */
const evaluationEmpty_English: any = {
    'metadata': {
        'id': undefined,  /* An empty evaluation must have its `id` set to `undefined`. */
        'user': 'nick_1',
        'date': new Date(),
        'journalData': {
            'name': undefined,
            'url': undefined,
            'issn': undefined
        },
        'sections': [
            {  /* Visibility Section */
                'title': 'Visibility',
                'categories': [
                    {
                        'title': 'Indexing',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_001',
                                'desc': 'It is included in DOAJ',
                                'hint': 'Official DOAJ/MIAR data',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_002',
                                'desc': 'It is in Scopus and/or JCR of the Web of Science',
                                'hint': 'MIAR',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_003',
                                'desc': 'It is included in an indexing database and specialized summary',
                                'hint': 'MIAR',
                                'answer': undefined,
                                'min': 0
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_004',
                                'desc': 'It is included in an indexing database and multidisciplinary summary',
                                'hint': 'MIAR',
                                'answer': undefined,
                                'min': 0
                            }
                        ]
                    },
                    {
                        'title': 'Access',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_001',
                                'desc': 'There is a website of the journal itself',
                                'hint': 'Google',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_002',
                                'desc': "The latest numbers are available on the journal's website",
                                'hint': 'Journal official website',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'N/A (not applicable)',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'The latest issue of the journal is not available',
                                        'value': 'NO_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'Only the latest issue of the journal can be found',
                                        'value': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'You will find all the numbers published by the journal in the last two years',
                                        'value': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_003',
                                'desc': "Articles are available individually on the journal's website",
                                'hint': 'Journal official website',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'They are not available individually and the full number cannot be downloaded',
                                        'value': 'NO_DISPONIBLE_IND_NO_DESC_NUM'
                                    },
                                    {
                                        'label': 'They are not available individually but the full number can be downloaded without restrictions',
                                        'value': 'NO_DISPONIBLE_IND_SI_DESC_NUM'
                                    },
                                    {
                                        'label': 'They are available individually with access and/or download restrictions',
                                        'value': 'SI_DISPONIBLE_IND_NO_DESC_NUM'
                                    },
                                    {
                                        'label': 'They are freely accessed and downloaded individually',
                                        'value': 'SI_DISPONIBLE_IND_SI_DESC_NUM'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_004',
                                'desc': 'There are journal articles in national and/or institutional open access repositories',
                                'hint': 'Academic Google',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_005',
                                'desc': 'There are journal articles in general and/or thematic international open access repositories (e.g.: Zenodo, La Referencia, OceanDocs, Arxich, among others)',
                                'hint': 'Academic Google',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'Interoperability',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_001',
                                'desc': 'Use some metadata format (e.g.: Use of OAI-DC, DC, Cerif, Mods, METS, etc.)',
                                'hint': 'OpenAIRE validator or https://validator.oaipmh.com/#ListMetadataFormats',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_002',
                                'desc': "Use of OAI-PMH (the set 'openaire' or 'ec_fundedresources' or 'driver' may or may not exist)",
                                'hint': 'OpenAIRE validator or https://validator.oaipmh.com',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_003',
                                'desc': 'The metadata defined as mandatory in the OpenAIRE Guidelines for Literature Repositories v3 are present in all articles',
                                'hint': 'Journal official website/OpenAIRE validator',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_004',
                                'desc': 'The metadata Field Language, Field License Condition, and Field Source, defined as recommended in the OpenAIRE Guidelines for Literature Repositories v3, are present in all articles',
                                'hint': 'OpenAIRE validator',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_005',
                                'desc': 'It includes among its metadata the Persistent Identifier - ISSN and/or ISSN-E',
                                'hint': 'Journal official website/OpenAIRE validator: check in Resource Identifier and Alternative Identifiers fields',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_006',
                                'desc': 'It includes among its metadata Persistent Identifier(s) of some digital object identifier (e.g.: DOI-Handle-URI-Scopus ID-Wos ID-Scielo ID)',
                                'hint': 'Journal official website/OpenAIRE validator: check in Resource Identifier and Alternative Identifiers fields',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_007',
                                'desc': 'It includes among its metadata Persistent Identifier(s) for people (e.g.: ORCID)',
                                'hint': 'Journal official website/OpenAIRE validator: check in Resource Identifier and Alternative Identifiers fields',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_008',
                                'desc': 'It includes among its metadata Persistent Identifier(s) for organizations (e.g.: GRID, ROR)',
                                'hint': 'Journal official website/OpenAIRE validator: check in Resource Identifier and Alternative Identifiers fields',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'Opening',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_004_q_001',
                                'desc': 'Allows articles to be deposited on non-commercial (open access repositories) or commercial (e.g.: Researchgate) platforms',
                                'hint': 'Journal official website/Aura',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': "Multiple versions of articles (including the editor's final version)",
                                        'value': 'VARIAS_VERSIONES_ART'
                                    },
                                    {
                                        'label': 'Only the preprint version',
                                        'value': 'SOLAMENTE_VER_PREPRINT'
                                    },
                                    {
                                        'label': "Only the post-print version (editor's final version)",
                                        'value': 'SOLAMENTE_VER_POST_PRINT'
                                    },
                                    {
                                        'label': 'Does not allow self-archiving of any version',
                                        'value': 'NO_PERMITE_AUTOARCHIVADO_VER'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_002',
                                'desc': 'Declares that there is no cost for article processing (APC)',
                                'hint': 'Journal official website',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_003',
                                'desc': 'It is an open access journal and declares an open access policy',
                                'hint': 'Journal official website',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_004',
                                'desc': 'Promotes the deposit of research data in open access repositories as part of its editorial policy',
                                'hint': 'Journal official website',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_005',
                                'desc': 'Offers its contents under some type of Creative Common license',
                                'hint': 'Journal official website',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'Internationalization',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_001',
                                'desc': 'Declares that you accept articles in language',
                                'hint': 'Journal official website',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Only Spanish',
                                        'value': 'SOLAMENTE_ESPAÑOL'
                                    },
                                    {
                                        'label': 'In more than one language',
                                        'value': 'EN_MAS_DE_UN_IDIOMA'
                                    },
                                    {
                                        'label': 'Only one language (other than Spanish)',
                                        'value': 'SOLAMENTE_UN_IDIOMA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_005_q_002',
                                'desc': 'The percentage of original articles in English published annually exceeds %15',
                                'hint': 'Journal official website',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_003',
                                'desc': 'Members of the editorial committee who belong to foreign institutions',
                                'hint': 'Journal official website',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'More than 50%',
                                        'value': 'MAS_DEL_50'
                                    },
                                    {
                                        'label': 'Between 20% and 50%',
                                        'value': 'ENTRE_EL_20_Y_50'
                                    },
                                    {
                                        'label': 'Less than 20%',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_004',
                                'desc': 'The members of the editorial committee who are external to the publishing institution represent',
                                'hint': 'Journal official website',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'More than 70%',
                                        'value': 'MAS_DEL_70'
                                    },
                                    {
                                        'label': 'Between 20% and 70%',
                                        'value': 'ENTRE_EL_20_Y_70'
                                    },
                                    {
                                        'label': 'Less than 20%',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_005',
                                'desc': 'In the last two years, articles signed by members of the editorial board or by members of the publishing institution constitute',
                                'hint': 'Journal official website',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'More than 50% of the total published in the period',
                                        'value': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'Between 20% and 50% of the total published in the period',
                                        'value': 'ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'Less than 20% of the total published in the period',
                                        'value': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_006',
                                'desc': 'The signature of authors affiliated with foreign institutions appears in',
                                'hint': 'Journal official website',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'More than 25% of the total articles in the last two years',
                                        'value': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'Between 5% and 25% of the total articles in the last two years',
                                        'value': 'ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'Less than 5% of the total articles in the last two years',
                                        'value': 'MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'Dissemination and presence in general and academic social networks',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_006_q_001',
                                'desc': 'It has functionality to share content on social networks',
                                'hint': 'Journal official website/Aura',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_002',
                                'desc': 'Has profiles on social networks',
                                'hint': 'Twitter, Facebook, Mendeley and/or Researchgate (Plum or Dimensions in case of DOI)',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'Has a profile on at least one social network (Twitter-Facebook-Instagram) but not on Mendeley and/or Researchgate',
                                        'value': 'PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'Has a profile on at least one social network (Twitter-Facebook-Instagram) on Mendeley and/or Researchgate',
                                        'value': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_003',
                                'desc': 'Spread your articles through social networks',
                                'hint': 'Twitter, Facebook, Mendeley and/or Researchgate (Plum or Dimensions in case of DOI)',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'General such as Twitter-Facebook-Instagram (at least one of them)',
                                        'value': 'GENERALES_TWITTER_FACEBOOK_INSTAGRAM'
                                    },
                                    {
                                        'label': 'Only on Mendeley and/or Researchgate',
                                        'value': 'SOLAMENTE_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'Both on Twitter-Facebook-Instagram (at least one of them) and on Mendeley and/or Researchgate',
                                        'value': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {  /* Impact Section */
                'title': 'Impact',
                'categories': [
                    {
                        'title': 'Academic impact',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_007_q_001',
                                'desc': 'You have citations registered in Scopus/Scimago or Scielo Analytics or Google Scholar',
                                'hint': '',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_002',
                                'desc': 'Citations received in Scopus/Scimago or Science Web/JCR or Google Scholar/Scielo Analytics',
                                'hint': 'This element will be considered for one of the following options: Scopus/Scimago or Science Web/JCR or Google Scholar/Scielo Analytics. If you want to estimate more than one option, you have to do it differently. Citation totals from different sources should never be added together',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'Less than 20% of the articles published in the last three years have received at least one citation',
                                        'value': 'MENOS_DEL_20_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    },
                                    {
                                        'label': 'Between 20% and 50% of the articles published in the last three years have received at least one citation',
                                        'value': 'ENTRE_EL_20_Y_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    },
                                    {
                                        'label': 'More than 50% of the articles published in the last three years have received at least one citation',
                                        'value': 'MAS_DEL_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_003',
                                'desc': "According to Google Scholar, the journal's H5 index",
                                'hint': 'Academic Google',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'N/A (not applicable)',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'It is less than or equal to the H5 index of the journal in the previous period',
                                        'value': 'MENOR_IGUAL_IND_H5_REV_PER_ANT'
                                    },
                                    {
                                        'label': 'It is higher than the H5 index of the journal in the previous period',
                                        'value': 'MAYOR_IND_H5_REV_PER_ANT'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        'title': 'Position in journal rankings',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_008_q_001',
                                'desc': 'It is in journal rankings',
                                'hint': 'Scopus/Scimago, JCR, Redalyc, REDIB, CIRS',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'In Q3-Q4 of Journal Citation Report/Scimago',
                                        'value': 'Q3_Q4_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'In Q1-Q2 of Journal Citation Report/Scimago',
                                        'value': 'Q1_Q2_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'Only included in rankings of regional/thematic journals such as Redalyc-REDIB-CIRS-etc.',
                                        'value': 'SOLAMENTE_RANKINGS_REV_REG_TEMAT'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

/**
 * Represents an object used as mock data in Spanish language. 
 */
const evaluationExample_Spanish: any = {
    'metadata': {
        'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
        'user': 'nick_1',
        'date': new Date(),
        'journalData': {
            'name': 'Ecología aplicada',
            'url': 'http://www.lamolina.edu.pe/ecolapl/',
            'issn': '1726-2216'
        },
        'sections': [
            {  /* Visibility Section */
                'title': 'Visibilidad',
                'categories': [
                    {
                        'title': 'Indización',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_001',
                                'desc': 'Está incluida en DOAJ',
                                'hint': 'Datos oficiales de DOAJ/MIAR',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_002',
                                'desc': 'Está en Scopus y/o JCR de la Web de la Ciencia',
                                'hint': 'MIAR',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_003',
                                'desc': 'Está incluida en base de datos de indización y resumen especializada',
                                'hint': 'MIAR',
                                'answer': 3,
                                'min': 0
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_004',
                                'desc': 'Está incluida en base de datos de indización y resumen multidisciplinar',
                                'hint': 'MIAR',
                                'answer': 2,
                                'min': 0
                            }
                        ]
                    },
                    {
                        'title': 'Acceso',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_001',
                                'desc': 'Existe un sitio web propio de la revista',
                                'hint': 'Google',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_002',
                                'desc': 'Están disponibles los últimos números en el sitio web de la revista',
                                'hint': 'Sitio oficial de la revista',
                                'answer': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS',
                                'selectOptions': [
                                    {
                                        'label': 'N/A (no aplica)',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'No se encuentra disponible el último número de la revista',
                                        'value': 'NO_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'Solamente se encuentra el último número de la revista',
                                        'value': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'Se encuentran todos los números publicados por la revista en los últimos dos años',
                                        'value': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_003',
                                'desc': 'Están disponibles los artículos de manera individual en el sitio web de la revista',
                                'hint': 'Sitio oficial de la revista',
                                'answer': 'NO_DISPONIBLE_IND_SI_DESC_NUM',
                                'selectOptions': [
                                    {
                                        'label': 'No están disponibles de manera individual ni puede descargarse el número completo',
                                        'value': 'NO_DISPONIBLE_IND_NO_DESC_NUM'
                                    },
                                    {
                                        'label': 'No están disponibles de manera individual pero puede descargarse el número completo sin restricciones',
                                        'value': 'NO_DISPONIBLE_IND_SI_DESC_NUM'
                                    },
                                    {
                                        'label': 'Están disponibles de manera individual con restricciones de acceso y/o descarga',
                                        'value': 'SI_DISPONIBLE_IND_NO_DESC_NUM'
                                    },
                                    {
                                        'label': 'Se acceden y descargan libremente de manera individual',
                                        'value': 'SI_DISPONIBLE_IND_SI_DESC_NUM'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_004',
                                'desc': 'Existen artículos de la revista en repositorios nacional y/o institucional de acceso abierto',
                                'hint': 'Google académico',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_005',
                                'desc': 'Existen artículos de la revista en repositorios de acceso abierto internacionales generales y/o temáticos (ej.: Zenodo, La Referencia, OceanDocs, Arxich, entre otros)',
                                'hint': 'Google académico',
                                'answer': false
                            }
                        ]
                    },
                    {
                        'title': 'Interoperabilidad',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_001',
                                'desc': 'Emplea algún formato de metadatos (ej. Uso de OAI-DC, DC, Cerif, Mods, METS, etc.)',
                                'hint': 'Validador OpenAIRE o https://validator.oaipmh.com/#ListMetadataFormats',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_002',
                                'desc': "Uso de OAI-PMH (puede existir o no el conjunto 'openaire' o 'ec_fundedresources' o 'driver')",
                                'hint': 'Validador OpenAIRE o https://validator.oaipmh.com',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_003',
                                'desc': 'Están presentes en todos los artículos los metadatos definidos como obligatorios en el OpenAIRE Guidelines for Literature Repositories v3',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_004',
                                'desc': 'Están presentes en todos los artículos los metadatos Field Language, Field License Condition y Field Source, definidos como recomendables en el OpenAIRE Guidelines for Literature Repositories v3',
                                'hint': 'Validador OpenAIRE',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_005',
                                'desc': 'Incluye entre sus metadatos el Identificador Persistente - ISSN y/o ISSN-E',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_006',
                                'desc': 'Incluye entre sus metadatos Identificador(es) Persistente(s) de algún identificador de objetos digitales (ej. DOI-Handle-URI-Scopus ID-Wos ID-Scielo ID)',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_007',
                                'desc': 'Incluye entre sus metadatos Identificador(es) Persistente(s) para personas (ej. ORCID)',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_008',
                                'desc': 'Incluye entre sus metadatos Identificador(es) Persistente(s) para organizaciones (ej. GRID, ROR)',
                                'hint': 'Sitio oficial de la revista/validador OpenAIRE: revisar en los campos Resource Identifier y Alternative Identifiers',
                                'answer': false
                            }
                        ]
                    },
                    {
                        'title': 'Apertura',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_004_q_001',
                                'desc': 'Permite que se depositen los artículos en plataformas no comerciales (repositorios de acceso abierto) o comerciales (ej. Researchgate)',
                                'hint': 'Sitio oficial de la revista/Aura',
                                'answer': 'NO_PERMITE_AUTOARCHIVADO_VER',
                                'selectOptions': [
                                    {
                                        'label': 'Varias versiones de los artículos (incluyendo la versión final del editor)',
                                        'value': 'VARIAS_VERSIONES_ART'
                                    },
                                    {
                                        'label': 'Solamente la versión preprint',
                                        'value': 'SOLAMENTE_VER_PREPRINT'
                                    },
                                    {
                                        'label': 'Solamente la versión post-print (versión final del editor)',
                                        'value': 'SOLAMENTE_VER_POST_PRINT'
                                    },
                                    {
                                        'label': 'No permite el autoarchivo de ninguna versión',
                                        'value': 'NO_PERMITE_AUTOARCHIVADO_VER'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_002',
                                'desc': 'Declara que no tiene costo por procesamiento de artículos (APC)',
                                'hint': 'Sitio oficial de la revista',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_003',
                                'desc': 'Es una revista de acceso abierto y declara política de acceso abierto',
                                'hint': 'Sitio oficial de la revista',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_004',
                                'desc': 'Promueve el depósito de los datos de investigación en repositorios de acceso abierto como parte de su política editorial',
                                'hint': 'Sitio oficial de la revista',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_005',
                                'desc': 'Ofrece sus contenidos bajo algun tipo de licencia Creative Common',
                                'hint': 'Sitio oficial de la revista',
                                'answer': false
                            }
                        ]
                    },
                    {
                        'title': 'Internacionalización',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_001',
                                'desc': 'Declara que acepta artículos en idioma',
                                'hint': 'Sitio oficial de la revista',
                                'answer': 'SOLAMENTE_ESPAÑOL',
                                'selectOptions': [
                                    {
                                        'label': 'Solamente Español',
                                        'value': 'SOLAMENTE_ESPAÑOL'
                                    },
                                    {
                                        'label': 'En más de un idioma',
                                        'value': 'EN_MAS_DE_UN_IDIOMA'
                                    },
                                    {
                                        'label': 'Solamente un idioma (diferente al Español)',
                                        'value': 'SOLAMENTE_UN_IDIOMA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_005_q_002',
                                'desc': 'El porcentaje de artículos originales en Inglés publicados anualmente supera el %15',
                                'hint': 'Sitio oficial de la revista',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_003',
                                'desc': 'Los miembros del comité editorial que pertenecen a instituciones extranjeras',
                                'hint': 'Sitio oficial de la revista',
                                'answer': 'ENTRE_EL_20_Y_50',
                                'selectOptions': [
                                    {
                                        'label': 'Más del 50%',
                                        'value': 'MAS_DEL_50'
                                    },
                                    {
                                        'label': 'Entre el 20% y el 50%',
                                        'value': 'ENTRE_EL_20_Y_50'
                                    },
                                    {
                                        'label': 'Menos del 20%',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_004',
                                'desc': 'Los miembros del comité editorial que son externos a la institución editora representan',
                                'hint': 'Sitio oficial de la revista',
                                'answer': 'ENTRE_EL_20_Y_70',
                                'selectOptions': [
                                    {
                                        'label': 'Más del 70%',
                                        'value': 'MAS_DEL_70'
                                    },
                                    {
                                        'label': 'Entre el 20% y el 70%',
                                        'value': 'ENTRE_EL_20_Y_70'
                                    },
                                    {
                                        'label': 'Menos del 20%',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_005',
                                'desc': 'En los últimos dos años los artículos firmados por miembros del consejo editorial o por miembros de la institución editora constituyen',
                                'hint': 'Sitio oficial de la revista',
                                'answer': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO',
                                'selectOptions': [
                                    {
                                        'label': 'Más del 50% del total publicado en el período',
                                        'value': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'Entre el 20 y el 50% del total publicado en el período',
                                        'value': 'ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'Menos del 20% del total publicado en el período',
                                        'value': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_006',
                                'desc': 'La firma de autores afiliados a instituciones extranjeras aparece en',
                                'hint': 'Sitio oficial de la revista',
                                'answer': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS',
                                'selectOptions': [
                                    {
                                        'label': 'Más del 25% del total de artículos en los últimos dos años',
                                        'value': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'Entre el 5% y el 25% del total de artículos en los últimos dos años',
                                        'value': 'ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'Menos del 5% del total de artículos en los últimos dos años',
                                        'value': 'MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'Difusión y presencia en redes sociales generales y académicas',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_006_q_001',
                                'desc': 'Posee funcionalidad de compartir contenidos en redes sociales',
                                'hint': 'Sitio oficial de la revista/Aura',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_002',
                                'desc': 'Posee perfiles en redes sociales',
                                'hint': 'Twitter, Facebook, Mendeley y/o Researchgate (Plum o Dimensions en caso de tener DOI)',
                                'answer': 'NO',
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'Posee perfil en al menos una red social (Twitter-Facebook-Instagram) pero no en Mendeley y/o Researchgate',
                                        'value': 'PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'Posee perfil en al menos una red social (Twitter-Facebook-Instagram) en Mendeley y/o Researchgate',
                                        'value': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_003',
                                'desc': 'Difunde sus artículos a través de redes sociales',
                                'hint': 'Twitter, Facebook, Mendeley y/o Researchgate (Plum o Dimensions en caso de tener DOI)',
                                'answer': 'SOLAMENTE_MENDELEY_RESEARCHGATE',
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'Generales como Twitter-Facebook-Instagram (al menos una de ellas)',
                                        'value': 'GENERALES_TWITTER_FACEBOOK_INSTAGRAM'
                                    },
                                    {
                                        'label': 'Solamente en Mendeley y/o Researchgate',
                                        'value': 'SOLAMENTE_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'Tanto en Twitter-Facebook-Instagram (al menos una de ellas) como en Mendeley y/o Researchgate',
                                        'value': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {  /* Impact Section */
                'title': 'Impacto',
                'categories': [
                    {
                        'title': 'Impacto académico',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_007_q_001',
                                'desc': 'Tiene citas registradas en Scopus/Scimago o Scielo Analytics o Google Académico',
                                'hint': '',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_002',
                                'desc': 'Citas recibidas en Scopus/Scimago o Web de la Ciencia/JCR o Google Académico/Scielo Analytics',
                                'hint': 'Este elemento se considerará para una de las siguientes opciones: Scopus/Scimago o Web de la Ciencia/JCR o Google Académico/Scielo Analytics. Si se desea estimar en más de una opción, hay que hacerlo de manera diferenciada. Nunca deben sumarse los totales de citación provenientes de diferentes fuentes',
                                'answer': 'ENTRE_EL_20_Y_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA',
                                'selectOptions': [
                                    {
                                        'label': 'Menos del 20% de los artículos publicados en los últimos tres años han recibido al menos una cita',
                                        'value': 'MENOS_DEL_20_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    },
                                    {
                                        'label': 'Entre el 20% y el 50% de los artículos publicados en los últimos tres años han recibido al menos una cita',
                                        'value': 'ENTRE_EL_20_Y_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    },
                                    {
                                        'label': 'Más del 50% de los artículos publicados en los últimos tres años han recibido al menos una cita',
                                        'value': 'MAS_DEL_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_003',
                                'desc': 'Según Google Académico el índice H5 de la revista',
                                'hint': 'Google académico',
                                'answer': 'MAYOR_IND_H5_REV_PER_ANT',
                                'selectOptions': [
                                    {
                                        'label': 'N/A (no aplica)',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'Es menor o igual al índice H5 de la revista en el período anterior',
                                        'value': 'MENOR_IGUAL_IND_H5_REV_PER_ANT'
                                    },
                                    {
                                        'label': 'Es mayor al índice H5 de la revista en el período anterior',
                                        'value': 'MAYOR_IND_H5_REV_PER_ANT'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        'title': 'Posición en rankings de revistas',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_008_q_001',
                                'desc': 'Está en rankings de revistas',
                                'hint': 'Scopus/Scimago, JCR, Redalyc, REDIB, CIRS',
                                'answer': 'NO',
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'En Q3-Q4 de Journal Citation Report/Scimago',
                                        'value': 'Q3_Q4_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'En Q1-Q2 de Journal Citation Report/Scimago',
                                        'value': 'Q1_Q2_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'Solamente incluida en rankings de revistas regionales/temáticas como Redalyc-REDIB-CIRS-etc.',
                                        'value': 'SOLAMENTE_RANKINGS_REV_REG_TEMAT'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

/**
 * Represents an object used as mock data in English language. 
 */
const evaluationExample_English: any = {
    'metadata': {
        'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
        'user': 'nick_1',
        'date': new Date(),
        'journalData': {
            'name': 'Ecología aplicada',
            'url': 'http://www.lamolina.edu.pe/ecolapl/',
            'issn': '1726-2216'
        },
        'sections': [
            {  /* Visibility Section */
                'title': 'Visibility',
                'categories': [
                    {
                        'title': 'Indexing',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_001',
                                'desc': 'It is included in DOAJ',
                                'hint': 'Official DOAJ/MIAR data',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_002',
                                'desc': 'It is in Scopus and/or JCR of the Web of Science',
                                'hint': 'MIAR',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_003',
                                'desc': 'It is included in an indexing database and specialized summary',
                                'hint': 'MIAR',
                                'answer': 3,
                                'min': 0
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_004',
                                'desc': 'It is included in an indexing database and multidisciplinary summary',
                                'hint': 'MIAR',
                                'answer': 2,
                                'min': 0
                            }
                        ]
                    },
                    {
                        'title': 'Access',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_001',
                                'desc': 'There is a website of the journal itself',
                                'hint': 'Google',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_002',
                                'desc': "The latest numbers are available on the journal's website",
                                'hint': 'Journal official website',
                                'answer': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS',
                                'selectOptions': [
                                    {
                                        'label': 'N/A (not applicable)',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'The latest issue of the journal is not available',
                                        'value': 'NO_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'Only the latest issue of the journal can be found',
                                        'value': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'You will find all the numbers published by the journal in the last two years',
                                        'value': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_003',
                                'desc': "Articles are available individually on the journal's website",
                                'hint': 'Journal official website',
                                'answer': 'NO_DISPONIBLE_IND_SI_DESC_NUM',
                                'selectOptions': [
                                    {
                                        'label': 'They are not available individually and the full number cannot be downloaded',
                                        'value': 'NO_DISPONIBLE_IND_NO_DESC_NUM'
                                    },
                                    {
                                        'label': 'They are not available individually but the full number can be downloaded without restrictions',
                                        'value': 'NO_DISPONIBLE_IND_SI_DESC_NUM'
                                    },
                                    {
                                        'label': 'They are available individually with access and/or download restrictions',
                                        'value': 'SI_DISPONIBLE_IND_NO_DESC_NUM'
                                    },
                                    {
                                        'label': 'They are freely accessed and downloaded individually',
                                        'value': 'SI_DISPONIBLE_IND_SI_DESC_NUM'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_004',
                                'desc': 'There are journal articles in national and/or institutional open access repositories',
                                'hint': 'Academic Google',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_005',
                                'desc': 'There are journal articles in general and/or thematic international open access repositories (e.g.: Zenodo, La Referencia, OceanDocs, Arxich, among others)',
                                'hint': 'Academic Google',
                                'answer': false
                            }
                        ]
                    },
                    {
                        'title': 'Interoperability',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_001',
                                'desc': 'Use some metadata format (e.g.: Use of OAI-DC, DC, Cerif, Mods, METS, etc.)',
                                'hint': 'OpenAIRE validator or https://validator.oaipmh.com/#ListMetadataFormats',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_002',
                                'desc': "Use of OAI-PMH (the set 'openaire' or 'ec_fundedresources' or 'driver' may or may not exist)",
                                'hint': 'OpenAIRE validator or https://validator.oaipmh.com',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_003',
                                'desc': 'The metadata defined as mandatory in the OpenAIRE Guidelines for Literature Repositories v3 are present in all articles',
                                'hint': 'Journal official website/OpenAIRE validator',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_004',
                                'desc': 'The metadata Field Language, Field License Condition, and Field Source, defined as recommended in the OpenAIRE Guidelines for Literature Repositories v3, are present in all articles',
                                'hint': 'OpenAIRE validator',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_005',
                                'desc': 'It includes among its metadata the Persistent Identifier - ISSN and/or ISSN-E',
                                'hint': 'Journal official website/OpenAIRE validator: check in Resource Identifier and Alternative Identifiers fields',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_006',
                                'desc': 'It includes among its metadata Persistent Identifier(s) of some digital object identifier (e.g.: DOI-Handle-URI-Scopus ID-Wos ID-Scielo ID)',
                                'hint': 'Journal official website/OpenAIRE validator: check in Resource Identifier and Alternative Identifiers fields',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_007',
                                'desc': 'It includes among its metadata Persistent Identifier(s) for people (e.g.: ORCID)',
                                'hint': 'Journal official website/OpenAIRE validator: check in Resource Identifier and Alternative Identifiers fields',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_008',
                                'desc': 'It includes among its metadata Persistent Identifier(s) for organizations (e.g.: GRID, ROR)',
                                'hint': 'Journal official website/OpenAIRE validator: check in Resource Identifier and Alternative Identifiers fields',
                                'answer': false
                            }
                        ]
                    },
                    {
                        'title': 'Opening',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_004_q_001',
                                'desc': 'Allows articles to be deposited on non-commercial (open access repositories) or commercial (e.g.: Researchgate) platforms',
                                'hint': 'Journal official website/Aura',
                                'answer': 'NO_PERMITE_AUTOARCHIVADO_VER',
                                'selectOptions': [
                                    {
                                        'label': "Multiple versions of articles (including the editor's final version)",
                                        'value': 'VARIAS_VERSIONES_ART'
                                    },
                                    {
                                        'label': 'Only the preprint version',
                                        'value': 'SOLAMENTE_VER_PREPRINT'
                                    },
                                    {
                                        'label': "Only the post-print version (editor's final version)",
                                        'value': 'SOLAMENTE_VER_POST_PRINT'
                                    },
                                    {
                                        'label': 'Does not allow self-archiving of any version',
                                        'value': 'NO_PERMITE_AUTOARCHIVADO_VER'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_002',
                                'desc': 'Declares that there is no cost for article processing (APC)',
                                'hint': 'Journal official website',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_003',
                                'desc': 'It is an open access journal and declares an open access policy',
                                'hint': 'Journal official website',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_004',
                                'desc': 'Promotes the deposit of research data in open access repositories as part of its editorial policy',
                                'hint': 'Journal official website',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_005',
                                'desc': 'Offers its contents under some type of Creative Common license',
                                'hint': 'Journal official website',
                                'answer': false
                            }
                        ]
                    },
                    {
                        'title': 'Internationalization',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_001',
                                'desc': 'Declares that you accept articles in language',
                                'hint': 'Journal official website',
                                'answer': 'SOLAMENTE_ESPAÑOL',
                                'selectOptions': [
                                    {
                                        'label': 'Only Spanish',
                                        'value': 'SOLAMENTE_ESPAÑOL'
                                    },
                                    {
                                        'label': 'In more than one language',
                                        'value': 'EN_MAS_DE_UN_IDIOMA'
                                    },
                                    {
                                        'label': 'Only one language (other than Spanish)',
                                        'value': 'SOLAMENTE_UN_IDIOMA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_005_q_002',
                                'desc': 'The percentage of original articles in English published annually exceeds %15',
                                'hint': 'Journal official website',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_003',
                                'desc': 'Members of the editorial committee who belong to foreign institutions',
                                'hint': 'Journal official website',
                                'answer': 'ENTRE_EL_20_Y_50',
                                'selectOptions': [
                                    {
                                        'label': 'More than 50%',
                                        'value': 'MAS_DEL_50'
                                    },
                                    {
                                        'label': 'Between 20% and 50%',
                                        'value': 'ENTRE_EL_20_Y_50'
                                    },
                                    {
                                        'label': 'Less than 20%',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_004',
                                'desc': 'The members of the editorial committee who are external to the publishing institution represent',
                                'hint': 'Journal official website',
                                'answer': 'ENTRE_EL_20_Y_70',
                                'selectOptions': [
                                    {
                                        'label': 'More than 70%',
                                        'value': 'MAS_DEL_70'
                                    },
                                    {
                                        'label': 'Between 20% and 70%',
                                        'value': 'ENTRE_EL_20_Y_70'
                                    },
                                    {
                                        'label': 'Less than 20%',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_005',
                                'desc': 'In the last two years, articles signed by members of the editorial board or by members of the publishing institution constitute',
                                'hint': 'Journal official website',
                                'answer': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO',
                                'selectOptions': [
                                    {
                                        'label': 'More than 50% of the total published in the period',
                                        'value': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'Between 20% and 50% of the total published in the period',
                                        'value': 'ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'Less than 20% of the total published in the period',
                                        'value': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_006',
                                'desc': 'The signature of authors affiliated with foreign institutions appears in',
                                'hint': 'Journal official website',
                                'answer': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS',
                                'selectOptions': [
                                    {
                                        'label': 'More than 25% of the total articles in the last two years',
                                        'value': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'Between 5% and 25% of the total articles in the last two years',
                                        'value': 'ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'Less than 5% of the total articles in the last two years',
                                        'value': 'MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'Dissemination and presence in general and academic social networks',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_006_q_001',
                                'desc': 'It has functionality to share content on social networks',
                                'hint': 'Journal official website/Aura',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_002',
                                'desc': 'Has profiles on social networks',
                                'hint': 'Twitter, Facebook, Mendeley and/or Researchgate (Plum or Dimensions in case of DOI)',
                                'answer': 'NO',
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'Has a profile on at least one social network (Twitter-Facebook-Instagram) but not on Mendeley and/or Researchgate',
                                        'value': 'PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'Has a profile on at least one social network (Twitter-Facebook-Instagram) on Mendeley and/or Researchgate',
                                        'value': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_003',
                                'desc': 'Spread your articles through social networks',
                                'hint': 'Twitter, Facebook, Mendeley and/or Researchgate (Plum or Dimensions in case of DOI)',
                                'answer': 'SOLAMENTE_MENDELEY_RESEARCHGATE',
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'General such as Twitter-Facebook-Instagram (at least one of them)',
                                        'value': 'GENERALES_TWITTER_FACEBOOK_INSTAGRAM'
                                    },
                                    {
                                        'label': 'Only on Mendeley and/or Researchgate',
                                        'value': 'SOLAMENTE_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'Both on Twitter-Facebook-Instagram (at least one of them) and on Mendeley and/or Researchgate',
                                        'value': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {  /* Impact Section */
                'title': 'Impact',
                'categories': [
                    {
                        'title': 'Academic impact',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_007_q_001',
                                'desc': 'You have citations registered in Scopus/Scimago or Scielo Analytics or Google Scholar',
                                'hint': '',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_002',
                                'desc': 'Citations received in Scopus/Scimago or Science Web/JCR or Google Scholar/Scielo Analytics',
                                'hint': 'This element will be considered for one of the following options: Scopus/Scimago or Science Web/JCR or Google Scholar/Scielo Analytics. If you want to estimate more than one option, you have to do it differently. Citation totals from different sources should never be added together',
                                'answer': 'ENTRE_EL_20_Y_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA',
                                'selectOptions': [
                                    {
                                        'label': 'Less than 20% of the articles published in the last three years have received at least one citation',
                                        'value': 'MENOS_DEL_20_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    },
                                    {
                                        'label': 'Between 20% and 50% of the articles published in the last three years have received at least one citation',
                                        'value': 'ENTRE_EL_20_Y_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    },
                                    {
                                        'label': 'More than 50% of the articles published in the last three years have received at least one citation',
                                        'value': 'MAS_DEL_50_ART_ULT_3_AÑOS_REC_ALGUNA_CITA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_003',
                                'desc': "According to Google Scholar, the journal's H5 index",
                                'hint': 'Academic Google',
                                'answer': 'MAYOR_IND_H5_REV_PER_ANT',
                                'selectOptions': [
                                    {
                                        'label': 'N/A (not applicable)',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'It is less than or equal to the H5 index of the journal in the previous period',
                                        'value': 'MENOR_IGUAL_IND_H5_REV_PER_ANT'
                                    },
                                    {
                                        'label': 'It is higher than the H5 index of the journal in the previous period',
                                        'value': 'MAYOR_IND_H5_REV_PER_ANT'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        'title': 'Position in journal rankings',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_008_q_001',
                                'desc': 'It is in journal rankings',
                                'hint': 'Scopus/Scimago, JCR, Redalyc, REDIB, CIRS',
                                'answer': 'NO',
                                'selectOptions': [
                                    {
                                        'label': 'No',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'In Q3-Q4 of Journal Citation Report/Scimago',
                                        'value': 'Q3_Q4_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'In Q1-Q2 of Journal Citation Report/Scimago',
                                        'value': 'Q1_Q2_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'Only included in rankings of regional/thematic journals such as Redalyc-REDIB-CIRS-etc.',
                                        'value': 'SOLAMENTE_RANKINGS_REV_REG_TEMAT'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

/**
 * Represents the service that communicates with the backend for all issues 
 * that refer to work with an `Evaluation` and/or `EvaluationAnswer`. 
 */
@Injectable({
	providedIn: 'root'
})
export class SurveyService
{
	private _prefix = 'evaluation';

	private _httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ',
		}),
	};

	public constructor(private _env: Environment, private _router: Router, private _http: HttpClient)
	{ }

	/**
	 * Constructs a `GET` request that interprets the body as a JSON object and returns 
	 * the response body in the `Hit<Evaluation>` type. 
	 * @param id Evaluation id. 
	 * In the case of adding view, this `id` argument is `undefined`. 
	 * In the case of remaining views (viewing and editing views), this `id` argument is NOT `undefined`. 
	 * @param currentLang Language currently used as string. 
	 * The Spanish language is: 'es'. 
	 * The English language is: 'en'. 
	 * @return An `Observable` of the `HTTPResponse`, with a response body in the `Hit<Evaluation>` type. 
	 */
	public getEvaluationById(id: string, currentLang: string): Observable<Hit<Evaluation>>
	{
//// Backend data //////////////////////////
		// // TODO: Test and fix any issue when connecting to the backend. 

		// /* In the case of adding view, this occurs when the `id` argument is `undefined`, 
		// it needs to get an object with all its values set to empty. 
		// This is a great optimization that you can implement in the backend. */
		// // TODO: I think that we need to crete `_env.evaluationApi` field and use it instead of `_env.cuorApi`. 
		// let req: string = this._env.cuorApi + 'evaluations/';

		// /* In the case of remaining views (viewing and editing views), this occurs when the `id` argument is NOT `undefined`, 
		// it needs to get an object equal to the store object. */
		// if (id)
		// {
		// 	req += id + '/';
		// }
		// // console.log(req);

		// return this._http.get<Hit<Evaluation>>(req, { params: { 'currentLang': currentLang } }).pipe(
		// 	map(hit => {
		// 		if (hit)
		// 		{
		// 			return hit;
		// 		}
		// 		else
		// 		{
		// 			// TODO: Do a better processing for this case; for example, show an error message before redirecting to home view. 
		// 			this._router.navigate(['/']);
		// 		}
		// 	})
		// );
////////////////////////////////////////////


//// Mock data /////////////////////////////
		if (id)
		{
			/* In the case of remaining views (viewing and editing views), this occurs when the `id` argument is NOT `undefined`, 
			it needs to get an object equal to the store object. */

			return ((currentLang == 'es') ? of(cloneValue(evaluationExample_Spanish)) : of(cloneValue(evaluationExample_English)));
		}
		else
		{
			/* In the case of adding view, this occurs when the `id` argument is `undefined`, 
			it needs to get an object with all its values set to empty. 
			This is a great optimization that you can implement in the backend. */

			return ((currentLang == 'es') ? of(cloneValue(evaluationEmpty_Spanish)) : of(cloneValue(evaluationEmpty_English)));
		}
////////////////////////////////////////////
	}

	/**
	 * Constructs a `PUT` request that interprets the body as a JSON object and returns 
	 * an observable of the response. 
     * Sends the data that was inserted by the user (an `EvaluationAnswer` object 
     * with the `resultAndRecoms` field equals `undefined`) to the backend in order to 
     * realize the processing and gets the result and recommendations. 
     * Then, the backend returns an object `EvaluationAnswer` with the `resultAndRecoms` 
     * field different of `undefined`, and this result is showed in the third part "Result and Recommendations". 
	 * @param evaluation Evaluation answer. 
	 * @param currentLang Language currently used as string. 
	 * The Spanish language is: 'es'. 
	 * The English language is: 'en'. 
	 * @return An `Observable` of the `HTTPResponse`, with a response body in the `Hit<Evaluation>` type. 
	 */
    public doEvaluation(evaluation: EvaluationAnswer, currentLang: string): Observable<any>
	{
//// Backend data //////////////////////////
		// // TODO: Poner correctamente el campo `this._env.sceibaApi` o crear un `this._env.evaluationApi`. 
		// const url: string = this._env.sceibaApi + this._prefix + '/do';

        // this._httpOptions['params'] = { 'currentLang': currentLang };
		// return this._http.put<Hit<EvaluationAnswer>>(url, JSON.stringify(evaluation), this._httpOptions);
////////////////////////////////////////////


//// Mock data /////////////////////////////
		console.error('doEvaluation: There is not backend yet!', evaluation);
        return ((currentLang == 'es') ? of({
            'metadata': {
                'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
                'user': evaluation.user,
                'date': evaluation.date,
                'journalData': evaluation.journalData,
                'sections': evaluation.survey,
                'resultAndRecoms': { 'res1': 'resultado 1', 'res2': 'resultado 2', 'res3': 'resultado 3' }
            }
        }) : of({
            'metadata': {
                'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
                'user': evaluation.user,
                'date': evaluation.date,
                'journalData': evaluation.journalData,
                'sections': evaluation.survey,
                'resultAndRecoms': { 'res1': 'result 1', 'res2': 'result 2', 'res3': 'result 3' }
            }
        }));
////////////////////////////////////////////
	}

	public editEvaluation(evaluation: EvaluationAnswer): Observable<any>
	{
//// Backend data //////////////////////////
		// // TODO: Poner correctamente el campo `this._env.sceibaApi` o crear un `this._env.evaluationApi`. 
		// const url: string = this._env.sceibaApi + this._prefix + '/' + evaluation.id;

        // /* It is NOT necessary to indicate the language. */
		// return this._http.put<Hit<EvaluationAnswer>>(url, JSON.stringify(evaluation), this._httpOptions);
////////////////////////////////////////////


//// Mock data /////////////////////////////
		console.error('editEvaluation: There is not backend yet!', evaluation);
		return of(evaluation);
////////////////////////////////////////////
	}
}
