import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const courseResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: [ // Propriedades editaveis
      'name', 
      'synopsis', 
      'uploadThumbnail', 
      'featured', 
      'categoryId'
    ],
    filterProperties: [ // Propriedades filtraveis
      'name', 
      'synopsis', 
      'featured', 
      'categoryId', 
      'createdAt', 
      'updatedAt'
    ],
    listProperties: [ // Propriedades listaveis
      'id', 
      'name', 
      'featured', 
      'categoryId'
    ],
    showProperties: [ // Propriedades que podem ser mostradas
      'id', 
      'name', 
      'synopsis', 
      'featured', 
      'thumbnailUrl', 
      'categoryId', 
      'createdAt', 
      'updatedAt'
    ] 
}

export const courseResourceFeatures: FeatureType[] = [
    uploadFileFeature({
      provider: {
        local: {
          bucket: path.join(__dirname, '../../../public')
        }
      },
      properties: {
        key: 'thumbnailUrl',
        file: 'uploadThumbnail'
      },
      uploadPath: (record, filename) => `thumbnails/course-${record.get('id')}/${filename}`
    })
  ]