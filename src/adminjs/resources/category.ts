import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: [   // Propriedades editaveis
        'name', 
        'position'
    ], 
    filterProperties: [ // Propriedades filtraveis
        'name', 
        'position', 
        'createdAt', 
        'updatedAt'
    ], 
    listProperties: [   // Propriedades listaveis
        'id', 
        'name', 
        'position'], 
    showProperties: [   // Propriedades que podem ser mostradas
        'id', 
        'name', 
        'position', 
        'createdAt', 
        'updatedAt'
    ] 
}