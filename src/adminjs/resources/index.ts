import { ResourceWithOptions } from "adminjs";
import { Category } from "../../models";
import { categoryResourceOptions } from "./category";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category, // model
        options: categoryResourceOptions // opções de como gerenciar o model
    }
]