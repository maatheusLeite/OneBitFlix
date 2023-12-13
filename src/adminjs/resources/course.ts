import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const courseResourceOptions: ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'], // Propriedades editaveis
    filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'], // Propriedades filtraveis
    listProperties: ['id', 'name', 'featured', 'categoryId'], // Propriedades listaveis
    showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt'] // Propriedades que podem ser mostradas
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