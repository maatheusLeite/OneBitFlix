import { Category,  } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { Like } from "./Likes";
import { User } from "./User";

Category.hasMany(Course, { as: 'courses' }) // Uma categoria possui muitos cursos. o AS, por padrão é o nome com a primeira letra maiuscula do model em plural, ou seja Courses
Course.belongsTo(Category) // Um curso pertence a apenas uma categoria

Course.hasMany(Episode, { as: 'episodes' }) // Um curso possui muitos episodios
Course.belongsToMany(User, { through: Favorite }) // Associação muitos para muitos THROUGH 'PELA' tabela do model Favorite
Course.belongsToMany(User, { through: Like }) // Associação muitos para muitos THROUGH 'PELA' tabela do model Like
Course.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'course_id' }) // Um curso pode ter muitos favoritos

Episode.belongsTo(Course) // Um episodio pertence a apenas um curso

Favorite.belongsTo(Course) // Um favorito pertence a apenas um curso
Favorite.belongsTo(User) // Um favorito pertence a apenas um usuário

User.belongsToMany(Course, { through: Favorite }) // Associação muitos para muitos THROUGH 'PELA' tabela do model Favorite
User.belongsToMany(Course, { through: Like }) // Associação muitos para muitos THROUGH 'PELA' tabela do model Like
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id' }) // Um usuário pode ter muitos favoritos

export {
    Category,
    Course,
    Episode,
    Favorite,
    Like,
    User
}