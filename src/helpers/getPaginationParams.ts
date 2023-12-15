export function getPaginationParams(query: any): [page: number, perPage: number] {    // retorna uma tupla contendo o numero da pagina atual e a quantidade de objetos em cada pagina
    const { page, perPage } = query    // Pega os parametros de query vindos da URL da requisição

    // Converte a query de quantidade de objetos por pagina para ser um numero
    const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0
        ? parseInt(perPage, 10)
        : 10    // em casos nulos, o padrão são 10 objetos por pagina

    // Converte o tipo da pagina a ser retornada para um numero
    const pageNumber = typeof page === 'string' && parseInt(page, 10) > 0
        ? parseInt(page, 10)
        : 1     // em casos nulos, o padrão é a pagina 1

    return [pageNumber, perPageNumber]
}