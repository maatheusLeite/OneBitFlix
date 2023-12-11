import { ResourceOptions } from "adminjs";

export const courseResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'], // Propriedades editaveis
    filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'], // Propriedades filtraveis
    listProperties: ['id', 'name', 'featured', 'categoryId'], // Propriedades listaveis
    showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt'] // Propriedades que podem ser mostradas
}