import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";
import { WatchTimeInstance } from "./WatchTime";

// Interface para o objeto simples contendo seus atributos
export interface Episode {
    id: number,
    name: string,
    synopsis: string,
    order: number,
    videoUrl: string,
    secondsLong: number,
    courseId: number
}

// Atributos opcionais
export interface EpisodeCreationAttributes extends Optional<Episode, 'id' | 'videoUrl' | 'secondsLong'> { }
// Para tornar o atributo id opcional na criação da Episode, sendo assim, o banco conseguirá
// adiciona-lo de forma automatica após a criação da Episode

// Interface para instancia de fato
export interface EpisodeInstance extends Model<Episode, EpisodeCreationAttributes>, Episode { 
    watchTime?: WatchTimeInstance
}

// Definição do model
export const Episode = sequelize.define<EpisodeInstance, Episode>('Episode', {
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
    order: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    videoUrl: {
        type: DataTypes.STRING
    },
    secondsLong: {
        type: DataTypes.INTEGER
    },
    courseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
})