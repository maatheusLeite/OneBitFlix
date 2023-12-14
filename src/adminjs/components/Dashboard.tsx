import React, { useEffect, useState } from 'react'
import { H1, H2, Table, TableHead, TableRow, TableCell, TableBody } from '@adminjs/design-system'
import { ApiClient, useCurrentAdmin } from 'adminjs'

export default function Dashboard() {
    const [resources, setResources] = useState<{ [key: string]: number }>() // entre <> temos um objeto que recebe uma chave: string, que possui um valor: nuber, ou seja, um objeto chave valor como em um map
    const [currentAdmin] = useCurrentAdmin()
    const api = new ApiClient()

    useEffect(() => {
        fetchDashboardData()
    }, [])

    async function fetchDashboardData() {
        const res = await api.getDashboard() // se baseia na função handlear do dashboard no arquivo adminjs/index.ts
        setResources(res.data)
    }

    return (
        <section style={{ padding: '1.15rem' }}>
            <H1> Seja bem vindo(a), { currentAdmin?.firstName } </H1> // Caso o admin exista, printa seu primeiro nome

            <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
                <H2>Resumo</H2>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#FF0043' }}>
                            <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
                            <TableCell style={{ color: "#FFF" }}>Registros</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            resources ?
                                Object.entries(resources).map(([resource, count]) => (
                                    <TableRow key={resource}>
                                        <TableCell>{resource}</TableCell>
                                        <TableCell>{count}</TableCell>
                                    </TableRow>
                                ))
                                :
                                <></>
                        }
                    </TableBody>
                </Table>
            </section>
        </section>
    )
}