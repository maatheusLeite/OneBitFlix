import { Category,  } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

Category.hasMany(Course) // Uma categoria possui muitos cursos
Course.belongsTo(Category) // Um curso pertence a apenas uma categoria

Course.hasMany(Episode) // Um curso possui muitos episodios
Episode.belongsTo(Course) // Um episodio pertence a apenas um curso

export {
    Category,
    Course,
    Episode,
    User
}