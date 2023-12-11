import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'position'], // Propriedades editaveis
    filterProperties: ['name', 'position', 'createdAt', 'updatedAt'], // Propriedades filtraveis
    listProperties: ['id', 'name', 'position'], // Propriedades listaveis
    showProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt'] // Propriedades que podem ser mostradas
}