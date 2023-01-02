import React from 'react'
import fetch from 'cross-fetch'
import {List, ListItem} from '@chakra-ui/react'
import Link from '../../components/link'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const ContentSearch = ({contentResults}) => {
    if (!contentResults) {
        return <div>Loading...</div>
    }
    const {hits = []} = contentResults

    return (
        <div>
            <h1>Search Results</h1>
            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <ListItem key={id}>
                            <Link to={`/content/${id}`}>{name}</Link>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getProps = async () => {
    let contentResults
    const res = await fetch(`${getAppOrigin()}/mobify/proxy/ocapi/s/RefArch/dw/shop/v20_2/content_search?q=about&client_id=3b8c8da2-8da7-4d2d-b7e9-2b259d357cb7`)
    if (res.ok) {
        contentResults = await res.json()
    }
    if (process.env.NODE_ENV != 'production') {
        console.log(contentResults)
    }
    return {contentResults}
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch
