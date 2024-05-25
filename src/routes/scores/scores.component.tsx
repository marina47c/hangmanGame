import { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";

import { getHighscores } from "../../utils/axios/axios.utils";
import { GetHighscoreData } from "../../types/globalTypes";
import { camelCaseToTitle } from "../../utils/functions/function.utils";
import { Loading } from "../../components";
import './scores.styles.scss';

const Scores = () => {
    const [data, setData] = useState<GetHighscoreData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const fetchedData: GetHighscoreData[] = await getHighscores();
            setData(fetchedData);
            setIsLoading(false);
        }

        getData();
    }, []);

    const renderHeaderRow = () => {
        const headerRowData: string[] = data.length > 0 ? Object.keys(data[0]) : [];
        return headerRowData.map((element, index) => {
            const title = camelCaseToTitle(element);
            return (
                <Table.ColumnHeaderCell key={index}>{title}</Table.ColumnHeaderCell>
            )
        })
    }

    const renderTableBody = () => {
        return data.map((row: GetHighscoreData, index: number) => {
            return (
                <Table.Row key={index}>
                    {Object.values(row).map((element, index) => {
                        return (
                            <Table.Cell key={index}>{element.toString()}</Table.Cell>
                        )
                    })}
                </Table.Row>
            )
        })
    }

    if (isLoading){
        return <Loading />
    }

    return (
        <div className="top-scores-container">
            <h2>Top Scores:</h2>

            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        {renderHeaderRow()}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderTableBody()}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default Scores;