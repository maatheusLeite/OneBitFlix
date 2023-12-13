import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const userResourceOptions: ResourceOptions = {
    navigation: 'Administração',
    properties: {
        birth: {
            type: 'date' // Troca o tipo do input no front-end 
        },
        password: {
            type: 'password' // Troca o tipo do input no front-end
        },
        role: {
            availableValues: [
                { value: 'admin', label: 'Administrador' },
                { value: 'user', label: 'Usuário Padrão'}
            ]
        }
    },
    editProperties: [   // Propriedades editaveis
        'firstName', 
        'lastName', 
        'phone', 
        'birth', 
        'email', 
        'password',
        'role'
    ],
    filterProperties: [ // Propriedades filtraveis
        'firstName', 
        'lastName', 
        'phone', 
        'birth', 
        'email',
        'role',
        'createdAt',
        'updatedAt'
    ],
    listProperties: [    // Propriedades listaveis
        'id', 
        'firstName', 
        'email', 
        'role'
    ],
    showProperties: [   // Propriedades que podem ser mostradas
        'id', 
        'firstName', 
        'lastName', 
        'phone', 
        'birth', 
        'email', 
        'role', 
        'createdAt', 
        'updatedAt'
    ] 
}
