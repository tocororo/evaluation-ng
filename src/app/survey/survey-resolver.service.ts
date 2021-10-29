
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { ActionText, SearchResponse, SearchService } from 'toco-lib';

import { CategoryQuestionType, Evaluation } from './evaluation.entity';

/**
 * Represents an object with all its values set to empty. 
 */
const evaluationEmpty_Resolved: any = {
    'metadata': {
        'id': '876acbf2-5a67-4b5c-92ca-040761d54595',
        'user': 'nick_1',
        'date': new Date(),
        'journalData': {
            'name': undefined,
            'url': undefined,
            'issn': undefined
        },
        'sections': [
            {  /* Visibility Section */
                'title': 'VISIBILIDAD',
                'categories': [
                    {
                        'title': 'INDIZACION',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_001',
                                'desc': 'C_001_Q_001',
                                'hint': 'DATOS_OFICIALES_DOAJ_MIAR',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_002',
                                'desc': 'C_001_Q_002',
                                'hint': 'MIAR',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_003',
                                'desc': 'C_001_Q_003',
                                'hint': 'MIAR',
                                'answer': undefined,
                                'min':  0
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_004',
                                'desc': 'C_001_Q_004',
                                'hint': 'MIAR',
                                'answer': undefined,
                                'min':  0
                            }
                        ]
                    },
                    {
                        'title': 'ACCESO',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_001',
                                'desc': 'C_002_Q_001',
                                'hint': 'Google',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_002',
                                'desc': 'C_002_Q_002',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'NO_APLICA',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'NO_DISPONIBLE_ULTIMO_NUM',
                                        'value': 'NO_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM',
                                        'value': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS',
                                        'value': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_003',
                                'desc': 'C_002_Q_003',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-1',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-1'
                                    },
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-2',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-2'
                                    },
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-3',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-3'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_004',
                                'desc': 'C_002_Q_004',
                                'hint': 'GOOGLE_ACADEMICO',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_005',
                                'desc': 'C_002_Q_005',
                                'hint': 'GOOGLE_ACADEMICO',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'INTEROPERABILIDAD',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_001',
                                'desc': 'C_003_Q_001',
                                'hint': 'VALIDADOR_OPENAIRE_METADATOS_WS',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_002',
                                'desc': 'C_003_Q_002',
                                'hint': 'VALIDADOR_OPENAIRE_WS',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_003',
                                'desc': 'C_003_Q_003',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_004',
                                'desc': 'C_003_Q_004',
                                'hint': 'VALIDADOR_OPENAIRE',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_005',
                                'desc': 'C_003_Q_005',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE_FIELD',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_006',
                                'desc': 'C_003_Q_006',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE_FIELD',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_007',
                                'desc': 'C_003_Q_007',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE_FIELD',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_008',
                                'desc': 'C_003_Q_008',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE_FIELD',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'APERTURA',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_004_q_001',
                                'desc': 'C_004_Q_001',
                                'hint': 'SITIO_OFICIAL_REV_AURA',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'VARIAS_VERSIONES_ART',
                                        'value': 'VARIAS_VERSIONES_ART'
                                    },
                                    {
                                        'label': 'SOLAMENTE_VER_PREPRINT',
                                        'value': 'SOLAMENTE_VER_PREPRINT'
                                    },
                                    {
                                        'label': 'SOLAMENTE_VER_POST_PRINT',
                                        'value': 'SOLAMENTE_VER_POST_PRINT'
                                    },
                                    {
                                        'label': 'NO_PERMITE_AUTOARCHIVADO_VER',
                                        'value': 'NO_PERMITE_AUTOARCHIVADO_VER'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_002',
                                'desc': 'C_004_Q_002',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_003',
                                'desc': 'C_004_Q_003',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_004',
                                'desc': 'C_004_Q_004',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_005',
                                'desc': 'C_004_Q_005',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined
                            }
                        ]
                    },
                    {
                        'title': 'INTERNACIONALIZACION',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_001',
                                'desc': 'C_005_Q_001',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'SOLAMENTE_ESPAÑOL',
                                        'value': 'SOLAMENTE_ESPAÑOL'
                                    },
                                    {
                                        'label': 'EN_MAS_DE_UN_IDIOMA',
                                        'value': 'EN_MAS_DE_UN_IDIOMA'
                                    },
                                    {
                                        'label': 'SOLAMENTE_UN_IDIOMA',
                                        'value': 'SOLAMENTE_UN_IDIOMA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_005_q_002',
                                'desc': 'C_005_Q_002',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_003',
                                'desc': 'C_005_Q_003',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'MAS_DEL_50',
                                        'value': 'MAS_DEL_50'
                                    },
                                    {
                                        'label': 'ENTRE_EL_20_Y_50',
                                        'value': 'ENTRE_EL_20_Y_50'
                                    },
                                    {
                                        'label': 'MENOS_DEL_20',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_004',
                                'desc': 'C_005_Q_004',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'MAS_DEL_70',
                                        'value': 'MAS_DEL_70'
                                    },
                                    {
                                        'label': 'ENTRE_EL_20_Y_70',
                                        'value': 'ENTRE_EL_20_Y_70'
                                    },
                                    {
                                        'label': 'MENOS_DEL_20',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_005',
                                'desc': 'C_005_Q_005',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO',
                                        'value': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO',
                                        'value': 'ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO',
                                        'value': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_006',
                                'desc': 'C_005_Q_006',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS',
                                        'value': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS',
                                        'value': 'ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS',
                                        'value': 'MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'PRESENCIA_REDES_SOCIALES_GEN_ACAD',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_006_q_001',
                                'desc': 'C_006_Q_001',
                                'hint': 'SITIO_OFICIAL_REV_AURA',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_002',
                                'desc': 'C_006_Q_002',
                                'hint': 'REDES_SOCIALES',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'NO',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE',
                                        'value': 'PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE',
                                        'value': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_003',
                                'desc': 'C_006_Q_003',
                                'hint': 'REDES_SOCIALES',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'NO',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'GENERALES_TWITTER_FACEBOOK_INSTAGRAM',
                                        'value': 'GENERALES_TWITTER_FACEBOOK_INSTAGRAM'
                                    },
                                    {
                                        'label': 'SOLAMENTE_MENDELEY_RESEARCHGATE',
                                        'value': 'SOLAMENTE_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE',
                                        'value': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {  /* Impact Section */
                'title': 'IMPACTO',
                'categories': [
                    {
                        'title': 'IMPACTO_ACADEMICO',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_007_q_001',
                                'desc': 'C_007_Q_001',
                                'hint': '',
                                'answer': undefined
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_002',
                                'desc': 'C_007_Q_002',
                                'hint': 'C_007_Q_002_HINT',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-1',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-1'
                                    },
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-2',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-2'
                                    },
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-3',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-3'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_003',
                                'desc': 'C_007_Q_003',
                                'hint': 'GOOGLE_ACADEMICO',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'NO_APLICA',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'MENOR_IGUAL_IND_H5_REV_PER_ANT',
                                        'value': 'MENOR_IGUAL_IND_H5_REV_PER_ANT'
                                    },
                                    {
                                        'label': 'MAYOR_IND_H5_REV_PER_ANT',
                                        'value': 'MAYOR_IND_H5_REV_PER_ANT'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        'title': 'POSICION_RANKINGS_REV',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_008_q_001',
                                'desc': 'C_008_Q_001',
                                'hint': 'RANKINGS_REV',
                                'answer': undefined,
                                'selectOptions': [
                                    {
                                        'label': 'NO',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'Q3_Q4_JOURNAL_CITATION',
                                        'value': 'Q3_Q4_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'Q1_Q2_JOURNAL_CITATION',
                                        'value': 'Q1_Q2_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'SOLAMENTE_RANKINGS_REV_REG_TEMAT',
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
 * Represents an object used as mock data. 
 */
const evaluationExample: any = {
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
                'title': 'VISIBILIDAD',
                'categories': [
                    {
                        'title': 'INDIZACION',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_001',
                                'desc': 'C_001_Q_001',
                                'hint': 'DATOS_OFICIALES_DOAJ_MIAR',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_001_q_002',
                                'desc': 'C_001_Q_002',
                                'hint': 'MIAR',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_003',
                                'desc': 'C_001_Q_003',
                                'hint': 'MIAR',
                                'answer': 12,
                                'min':  0
                            },
                            {
                                'type': CategoryQuestionType.integer,
                                'id': 'c_001_q_004',
                                'desc': 'C_001_Q_004',
                                'hint': 'MIAR',
                                'answer': 0,
                                'min':  0
                            }
                        ]
                    },
                    {
                        'title': 'ACCESO',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_001',
                                'desc': 'C_002_Q_001',
                                'hint': 'Google',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_002',
                                'desc': 'C_002_Q_002',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM',
                                'selectOptions': [
                                    {
                                        'label': 'NO_APLICA',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'NO_DISPONIBLE_ULTIMO_NUM',
                                        'value': 'NO_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM',
                                        'value': 'SOLAMENTE_DISPONIBLE_ULTIMO_NUM'
                                    },
                                    {
                                        'label': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS',
                                        'value': 'TODOS_NUM_PUBLICADOS_ULTIMOS_DOS_AÑOS'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_002_q_003',
                                'desc': 'C_002_Q_003',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': 'PONER-OPCION-CORRECTAMENTE-3',
                                'selectOptions': [
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-1',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-1'
                                    },
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-2',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-2'
                                    },
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-3',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-3'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_004',
                                'desc': 'C_002_Q_004',
                                'hint': 'GOOGLE_ACADEMICO',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_002_q_005',
                                'desc': 'C_002_Q_005',
                                'hint': 'GOOGLE_ACADEMICO',
                                'answer': false
                            }
                        ]
                    },
                    {
                        'title': 'INTEROPERABILIDAD',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_001',
                                'desc': 'C_003_Q_001',
                                'hint': 'VALIDADOR_OPENAIRE_METADATOS_WS',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_002',
                                'desc': 'C_003_Q_002',
                                'hint': 'VALIDADOR_OPENAIRE_WS',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_003',
                                'desc': 'C_003_Q_003',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_004',
                                'desc': 'C_003_Q_004',
                                'hint': 'VALIDADOR_OPENAIRE',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_005',
                                'desc': 'C_003_Q_005',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE_FIELD',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_006',
                                'desc': 'C_003_Q_006',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE_FIELD',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_007',
                                'desc': 'C_003_Q_007',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE_FIELD',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_003_q_008',
                                'desc': 'C_003_Q_008',
                                'hint': 'SITIO_OFICIAL_REV_VALIDADOR_OPENAIRE_FIELD',
                                'answer': true
                            }
                        ]
                    },
                    {
                        'title': 'APERTURA',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_004_q_001',
                                'desc': 'C_004_Q_001',
                                'hint': 'SITIO_OFICIAL_REV_AURA',
                                'answer': 'SOLAMENTE_VER_POST_PRINT',
                                'selectOptions': [
                                    {
                                        'label': 'VARIAS_VERSIONES_ART',
                                        'value': 'VARIAS_VERSIONES_ART'
                                    },
                                    {
                                        'label': 'SOLAMENTE_VER_PREPRINT',
                                        'value': 'SOLAMENTE_VER_PREPRINT'
                                    },
                                    {
                                        'label': 'SOLAMENTE_VER_POST_PRINT',
                                        'value': 'SOLAMENTE_VER_POST_PRINT'
                                    },
                                    {
                                        'label': 'NO_PERMITE_AUTOARCHIVADO_VER',
                                        'value': 'NO_PERMITE_AUTOARCHIVADO_VER'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_002',
                                'desc': 'C_004_Q_002',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_003',
                                'desc': 'C_004_Q_003',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_004',
                                'desc': 'C_004_Q_004',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': false
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_004_q_005',
                                'desc': 'C_004_Q_005',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': true
                            }
                        ]
                    },
                    {
                        'title': 'INTERNACIONALIZACION',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_001',
                                'desc': 'C_005_Q_001',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': 'EN_MAS_DE_UN_IDIOMA',
                                'selectOptions': [
                                    {
                                        'label': 'SOLAMENTE_ESPAÑOL',
                                        'value': 'SOLAMENTE_ESPAÑOL'
                                    },
                                    {
                                        'label': 'EN_MAS_DE_UN_IDIOMA',
                                        'value': 'EN_MAS_DE_UN_IDIOMA'
                                    },
                                    {
                                        'label': 'SOLAMENTE_UN_IDIOMA',
                                        'value': 'SOLAMENTE_UN_IDIOMA'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_005_q_002',
                                'desc': 'C_005_Q_002',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_003',
                                'desc': 'C_005_Q_003',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': 'ENTRE_EL_20_Y_50',
                                'selectOptions': [
                                    {
                                        'label': 'MAS_DEL_50',
                                        'value': 'MAS_DEL_50'
                                    },
                                    {
                                        'label': 'ENTRE_EL_20_Y_50',
                                        'value': 'ENTRE_EL_20_Y_50'
                                    },
                                    {
                                        'label': 'MENOS_DEL_20',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_004',
                                'desc': 'C_005_Q_004',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': 'ENTRE_EL_20_Y_70',
                                'selectOptions': [
                                    {
                                        'label': 'MAS_DEL_70',
                                        'value': 'MAS_DEL_70'
                                    },
                                    {
                                        'label': 'ENTRE_EL_20_Y_70',
                                        'value': 'ENTRE_EL_20_Y_70'
                                    },
                                    {
                                        'label': 'MENOS_DEL_20',
                                        'value': 'MENOS_DEL_20'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_005',
                                'desc': 'C_005_Q_005',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO',
                                'selectOptions': [
                                    {
                                        'label': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO',
                                        'value': 'MAS_DEL_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO',
                                        'value': 'ENTRE_EL_20_Y_50_TOTAL_PUBLICADO_PERIODO'
                                    },
                                    {
                                        'label': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO',
                                        'value': 'MENOS_DEL_20_TOTAL_PUBLICADO_PERIODO'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_005_q_006',
                                'desc': 'C_005_Q_006',
                                'hint': 'SITIO_OFICIAL_REV',
                                'answer': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS',
                                'selectOptions': [
                                    {
                                        'label': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS',
                                        'value': 'MAS_DEL_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS',
                                        'value': 'ENTRE_EL_5_Y_25_TOTAL_ART_ULT_DOS_AÑOS'
                                    },
                                    {
                                        'label': 'MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS',
                                        'value': 'MENOS_DEL_5_TOTAL_ART_ULT_DOS_AÑOS'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'PRESENCIA_REDES_SOCIALES_GEN_ACAD',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_006_q_001',
                                'desc': 'C_006_Q_001',
                                'hint': 'SITIO_OFICIAL_REV_AURA',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_002',
                                'desc': 'C_006_Q_002',
                                'hint': 'REDES_SOCIALES',
                                'answer': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE',
                                'selectOptions': [
                                    {
                                        'label': 'NO',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE',
                                        'value': 'PERFIL_RED_SOC_NO_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE',
                                        'value': 'PERFIL_RED_SOC_SI_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_006_q_003',
                                'desc': 'C_006_Q_003',
                                'hint': 'REDES_SOCIALES',
                                'answer': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE',
                                'selectOptions': [
                                    {
                                        'label': 'NO',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'GENERALES_TWITTER_FACEBOOK_INSTAGRAM',
                                        'value': 'GENERALES_TWITTER_FACEBOOK_INSTAGRAM'
                                    },
                                    {
                                        'label': 'SOLAMENTE_MENDELEY_RESEARCHGATE',
                                        'value': 'SOLAMENTE_MENDELEY_RESEARCHGATE'
                                    },
                                    {
                                        'label': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE',
                                        'value': 'TWITTER_FACEBOOK_INSTAGRAM_MENDELEY_RESEARCHGATE'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {  /* Impact Section */
                'title': 'IMPACTO',
                'categories': [
                    {
                        'title': 'IMPACTO_ACADEMICO',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.bool,
                                'id': 'c_007_q_001',
                                'desc': 'C_007_Q_001',
                                'hint': '',
                                'answer': true
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_002',
                                'desc': 'C_007_Q_002',
                                'hint': 'C_007_Q_002_HINT',
                                'answer': 'PONER-OPCION-CORRECTAMENTE-1',
                                'selectOptions': [
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-1',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-1'
                                    },
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-2',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-2'
                                    },
                                    {
                                        'label': 'PONER-OPCION-CORRECTAMENTE-3',
                                        'value': 'PONER-OPCION-CORRECTAMENTE-3'
                                    }
                                ]
                            },
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_007_q_003',
                                'desc': 'C_007_Q_003',
                                'hint': 'GOOGLE_ACADEMICO',
                                'answer': 'MAYOR_IND_H5_REV_PER_ANT',
                                'selectOptions': [
                                    {
                                        'label': 'NO_APLICA',
                                        'value': 'NO_APLICA'
                                    },
                                    {
                                        'label': 'MENOR_IGUAL_IND_H5_REV_PER_ANT',
                                        'value': 'MENOR_IGUAL_IND_H5_REV_PER_ANT'
                                    },
                                    {
                                        'label': 'MAYOR_IND_H5_REV_PER_ANT',
                                        'value': 'MAYOR_IND_H5_REV_PER_ANT'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        'title': 'POSICION_RANKINGS_REV',
                        'desc': '',
                        'questions': [
                            {
                                'type': CategoryQuestionType.select,
                                'id': 'c_008_q_001',
                                'desc': 'C_008_Q_001',
                                'hint': 'RANKINGS_REV',
                                'answer': 'Q1_Q2_JOURNAL_CITATION',
                                'selectOptions': [
                                    {
                                        'label': 'NO',
                                        'value': 'NO'
                                    },
                                    {
                                        'label': 'Q3_Q4_JOURNAL_CITATION',
                                        'value': 'Q3_Q4_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'Q1_Q2_JOURNAL_CITATION',
                                        'value': 'Q1_Q2_JOURNAL_CITATION'
                                    },
                                    {
                                        'label': 'SOLAMENTE_RANKINGS_REV_REG_TEMAT',
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
 * This resolver is used on all views in order to get information from the backend about an Evaluation. 
 * In the case of adding view, it needs to resolve an object with all its values set to empty. 
 * In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. 
 */
@Injectable({
	providedIn: 'root',
})
export class SurveyResolverService implements Resolve<SearchResponse<Evaluation>>
{
	public constructor(private router: Router, private service: SearchService)
	{ }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchResponse<Evaluation>>
	{
        /* With this verification, it knows the type of data it needs to resolve. */
        if (route.children[0].url[(route.children[0].url.length - 1)].path == ActionText.add)  /* The string ActionText.add is the value of the last route sub-path that is specified in the `*-routing.module.ts` file. */
        {
            /* In the case of adding view, it needs to resolve an object with all its values set to empty. */
            return of(evaluationEmpty_Resolved);
        }

//// Backend data ////
//// TODO: Test and fix any issue when connecting to the backend. ////
        // let uuid = route.paramMap.get('uuid');

        // /* In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. */
		// return this.service.getEvaluationById(uuid).pipe(
        //     take(1),
        //     map(node => {
        //         if (node)
        //         {
        //             return node;
		// 		}
        //         else
        //         {
        //             this.router.navigate(['/']);
        //         }
        //     })
        // );
//////////////////////


//// Mock data ////
        /* In the case of remaining views (viewing and editing views), it needs to resolve an object from the backend. */
		return of(evaluationExample);
///////////////////
	}
}

/**
 * A service that behaves as the bridge between the `SurveyComponent` 
 * and the descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
 * and `SurveyResultComponent`). 
 */
@Injectable({
    providedIn: 'root'
})
export class SurveyValueService
{
    /**
     * It is like a readonly field, and it is only used to initialize the form; for that reason, 
     * its name begins with an underscore to remember you that you can NOT change its value after 
     * it is initialized. 
     * It is initialized in the `SurveyComponent`, and it is 
     * used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
     * and `SurveyResultComponent`). 
     * Returns the action through a text. 
     */
    public _actionText: ActionText;

    /**
     * It is like a readonly field, and it is only used to initialize the form; for that reason, 
     * its name begins with an underscore to remember you that you can NOT change its value after 
     * it is initialized. 
     * It is initialized in the `SurveyComponent`, and it is 
     * used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
     * and `SurveyResultComponent`). 
     */
    public _evaluation: Evaluation;

    /**
     * A value that is initialized in the `SurveyComponent`, and it is 
     * used by descendant components (`SurveyJournalDataComponent`, `SurveyQuestionsComponent`, 
     * and `SurveyResultComponent`). 
     */
    public evaluationFormGroup: FormGroup;

    public constructor()
    {
        this._actionText = undefined;
        this._evaluation = undefined;
        this.evaluationFormGroup = undefined;
    }
}
