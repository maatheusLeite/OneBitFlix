import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

// Interface para o objeto simples contendo seus atributos
export interface Course {
    id: number,
    name: string,
    synopsis: string,
    thumbnailUrl: string,
    featured: boolean,
    categoryId: number
}

// Atributos opcionais
export interface CourseCreationAttributes extends Optional<Course, 'id' | 'thumbnailUrl' | 'featured'> { }
// Para tornar o atributo id opcional na criação da Course, sendo assim, o banco conseguirá
// adiciona-lo de forma automatica após a criação da Course

// Interface para instancia de fato
export interface CourseInstance extends Model<Course, CourseCreationAttributes>, Course { }

// Definição do model
export const Course = sequelize.define<CourseInstance, Course>('Course', {
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
    synopsis: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    thumbnailUrl: {
        type: DataTypes.STRING
    },
    featured: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
    },
    categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
}) 