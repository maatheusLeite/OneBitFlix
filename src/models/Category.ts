import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

// Interface para o objeto simples contendo seus atributos
export interface Category {
    id: number,
    name: string,
    position: number,
}

// Atributos opcionais
export interface CategoryCreationAttributes extends Optional<Category, 'id'> { }
// Para tornar o atributo id opcional na criação da Category, sendo assim, o banco conseguirá
// adiciona-lo de forma automatica após a criação da category

// Interface para instancia de fato
export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>, Category { }

// Definição do model
export const Category = sequelize.define<CategoryInstance, Category>('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      position: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
}) 