import { Category,  } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

Category.hasMany(Course, { as: 'courses' }) // Uma categoria possui muitos cursos. o AS, por padrão é o nome com a primeira letra maiuscula do model em plural, ou seja Courses
Course.belongsTo(Category) // Um curso pertence a apenas uma categoria

Course.hasMany(Episode, { as: 'episodes' }) // Um curso possui muitos episodios
Episode.belongsTo(Course) // Um episodio pertence a apenas um curso

export {
    Category,
    Course,
    Episode,
    User
}