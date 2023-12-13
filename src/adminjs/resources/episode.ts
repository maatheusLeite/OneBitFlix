import { ResourceOptions } from "adminjs";

export const episodeResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'secondsLong'], // Propriedades editaveis
    filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'], // Propriedades filtraveis
    listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'], // Propriedades listaveis
    showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt'] // Propriedades que podem ser mostradas
}