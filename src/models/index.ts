import { Category,  } from "./Category";
import { Course } from "./Course";

Category.hasMany(Course) // Uma categoria possui muitos cursos

Course.belongsTo(Category) // Um curso pertence a apenas uma categoria

export {
    Category,
    Course
}