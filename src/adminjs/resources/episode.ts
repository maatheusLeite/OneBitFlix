import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const episodeResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: [   // Propriedades editaveis
        'name', 
        'synopsis', 
        'courseId', 
        'order', 
        'uploadVideo', 
        'secondsLong'
    ],
    filterProperties: [ // Propriedades filtraveis
        'name', 
        'synopsis', 
        'courseId', 
        'secondsLong', 
        'createdAt', 
        'updatedAt'
    ], 
    listProperties: [   // Propriedades listaveis
        'id', 
        'name', 
        'courseId', 
        'order', 
        'secondsLong'
    ], 
    showProperties: [   // Propriedades que podem ser mostradas
        'id', 
        'name', 
        'synopsis', 
        'courseId', 
        'order', 
        'videoUrl', 
        'secondsLong', 
        'createdAt', 
        'updatedAt'
    ] 
}

export const episodeResourceFeatures: FeatureType[] = [
    uploadFileFeature({
        // UPLOAD OPTIONS
        provider: { // Provider pode ser local, AWS, googleCloud, etc...
            local: {
                bucket: path.join(__dirname, '..', '..', '..', 'uploads')
            }
        },
        properties: {
            key: 'videoUrl',    // coluna de referencia da url do video salvo, no banco de dados
            file: 'uploadVideo' // input onde vai ser feito o envio do formulário do video no adminjs
                                // basicamente, está lincando o campo uploadVideo do editProperties acima com a coluna video_url do banco de dados
        },
        uploadPath: (record, fileName) => `videos/course-${record.get('courseId')}/${fileName}`
    })
]