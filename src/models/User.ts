import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";
import bcrypt from 'bcrypt';

type CheckPasswordCallback = (error?: Error | undefined, isSame?: boolean) => void

// Interface para o objeto simples contendo seus atributos
export interface User {
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    birth: Date,
    email: string,
    password: string,
    role: 'admin' | 'user'  // Só pode ser admin ou 'user'
}

// Atributos opcionais
export interface UserCreationAttributes extends Optional<User, 'id'> { }
// Para tornar o atributo id opcional na criação da User, sendo assim, o banco conseguirá
// adiciona-lo de forma automatica após a criação da User

// Interface para instancia de fato
export interface UserInstance extends Model<User, UserCreationAttributes>, User { 
    checkPassword: (password: string, callbackFunction: CheckPasswordCallback) => void
}

// Definição do model
export const User = sequelize.define<UserInstance, User>('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    birth: {
        allowNull: false,
        type: DataTypes.DATE
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true   // Verifica se é um email
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isIn: [['admin', 'user']]   // Verifica se a role é 'admin' ou 'user'
        }
    }
}, {
    hooks: {
        // hook executado antes de um registro ser salvo no banco de dados
        beforeSave: async (user) => {
            // Retona verdadeiro caso a instancia ainda não tenha sido salva no banco de dados
            // OU || caso o valor da senha salva anteriormente tenha sido alterado e um novo valor vai ser salvo
            if (user.isNewRecord || user.changed('password')) {
                user.password = await bcrypt.hash(user.password.toString(), 10) // Criptografa a senha a ser salva
            }
        }
    }
})

// Criando um metodo com o prototype, o mesmo é adicionado a todas as instancias de User
User.prototype.checkPassword = function (password: string, callbackFunction: CheckPasswordCallback) {
    
    // decodifica a senha do banco de dados para compara-la com a outra
    bcrypt.compare(password, this.password, (error, isSame) => {
        if (error) {
            callbackFunction(error) // senha não foi a mesma
        }
        else {
            callbackFunction(error, isSame)
        }
    }) 
}