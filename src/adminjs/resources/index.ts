import { ResourceWithOptions } from "adminjs";
import { Category, Course } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceOptions } from "./course";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category, // model
        options: categoryResourceOptions // opções de como gerenciar o model
    },
    {
        resource: Course,
        options: courseResourceOptions
    }
]