import React from 'react'
import fetch from 'cross-fetch'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

import {HTTPError} from 'pwa-kit-react-sdk/ssr/universal/errors'

const ContentDetails = ({contentResults, error}) => {
    if (error) {
        return <div>{error.fault.message}</div>
    }

    if (!contentResults) {
        return <div>Loading...</div>
    }

    return <div dangerouslySetInnerHTML={{__html: contentResults.c_body}} />
}

ContentDetails.getProps = async ({params, res}) => {
    let contentResults, error
    const result = await fetch(`${getAppOrigin()}/mobify/proxy/ocapi/s/RefArch/dw/shop/v20_4/content/${params.id}?client_id=3b8c8da2-8da7-4d2d-b7e9-2b259d357cb7`)

    if (result.ok) {
        contentResults = await result.json()
    } else {
        error = await result.json()
        if (res) {
            res.status(result.status)
        }
    }

    return {contentResults, error}
}

ContentDetails.getTemplateName = () => 'content-details'

export default ContentDetails
