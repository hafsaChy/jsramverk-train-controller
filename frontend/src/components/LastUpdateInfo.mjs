import React from 'react'
import { getLongDateFormat } from '../utils/common.mjs'

export default function LastUpdateInfo({dateTime}) {
    return (
        <div className="lastUpdateText">
            <small>Senast uppdaterat: {getLongDateFormat(dateTime)}</small>
        </div>
    )
}
