import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const episodeResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'secondsLong'], // Propriedades editaveis
    filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'], // Propriedades filtraveis
    listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'], // Propriedades listaveis
    showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt'] // Propriedades que podem ser mostradas
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