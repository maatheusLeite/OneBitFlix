import { User } from "../models"
import { EpisodeInstance } from "../models/Episode"
import { UserCreationAttributes } from "../models/User"

// Filtra apenas os ultimos episódios, ou seja, os vistos mais recentemente em cada curso
function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
    const coursesOnList: number[] = []

    const lastEpisodes = episodes.reduce((currentList, episode) => {
        if (!coursesOnList.includes(episode.courseId)) {
            coursesOnList.push(episode.courseId)
            currentList.push(episode)
            return currentList
        }

        const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId)

        if (episodeFromSameCourse!.order > episode.order) {
            return currentList
        }

        const listWithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId)
        listWithoutEpisodeFromSameCourse.push(episode)

        return listWithoutEpisodeFromSameCourse
    }, [] as EpisodeInstance[])

    return lastEpisodes
}

export const userService = {
    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        return user
    },

    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user
    },

    getKeepWatchingList: async (id: number) => {
        const userWithWatchingEpisodes = await User.findByPk(id, {
            // Uitilizar include para pré carregar uma associação, que neste caso é a associação de muitos para muitos Episodes pela tabela WatchTime
            include: {
                association: 'Episodes',  // Inclui os episódios por meio da associação com WatchTime
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'],
                    ['course_id', 'courseId']
                ],
                include: [{
                    association: 'course',   // Pega as informações do curso do episódio individual acima, para cada episódio retornado
                    attributes: [
                        'id',
                        'name',
                        'synopsis',
                        ['thumbnail_url', 'thumbnailUrl']
                    ]
                }],
                through: {
                    as: 'watchTime', // Associação feita por meio da tabela watchTime
                    attributes:[
                        'seconds',
                        ['updated_at', 'updatedAt']
                    ]
                }
            }
        })

        if (!userWithWatchingEpisodes) {
            throw new Error('Usuário não encontrado.')
        }

        const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!)
        keepWatchingList.sort((a, b) => a.watchTime!.updatedAt! < b.watchTime!.updatedAt! ? 1 : -1)

        return keepWatchingList
    }
}