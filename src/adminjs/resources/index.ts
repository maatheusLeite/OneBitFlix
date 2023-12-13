import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episode } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceOptions } from "./course";
import { episodeResourceOptions } from "./episode";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category, // model
        options: categoryResourceOptions // opções de como gerenciar o model
    },
    {
        resource: Course,
        options: courseResourceOptions
    },
    {
        resource: Episode,
        options: episodeResourceOptions
    }
]