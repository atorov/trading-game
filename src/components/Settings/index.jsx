import React from 'react'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import ISave from '@material-ui/icons/Save'
import ISettingsApplications from '@material-ui/icons/SettingsApplications'

import { randomNormal } from 'd3-random'

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'

import Dataset from './Dataset'
import PDF from './PDF'

const R_MIN = -10
const R_MAX = 10
const rRange = Math.abs(R_MIN) + Math.abs(R_MAX)

const R_ESTIMATIONS = 1000000

const CHART_WIDTH = 600
const CHART_HEIGHT = 300

const MU_INIT_VALUE = 1
const MU_MIN = R_MIN
const MU_MAX = R_MAX
const MU_STEP = 0.2

const SIGMA_INIT_VALUE = 2.5
const SIGMA_MIN = 1
const SIGMA_MAX = 10
const SIGMA_STEP = 0.1

const RANGE_MIN = R_MIN
const RANGE_MAX = R_MAX
const RANGE_STEP = 0.5

const ROUNDS_INIT_VALUE = 10
const ROUNDS_MIN = 5
const ROUNDS_MAX = 100
const ROUNDS_STEP = 1

function genBarChartData(dataset, range) {
    const arr = Array(range + 1).fill(0)
    dataset.forEach((element) => {
        const index = Math.round(element - R_MIN)
        if (index >= 0 && index <= range) {
            arr[index] = ++arr[index]
        }
    })

    return arr.map((value, index) => ({
        x: Math.round(index + R_MIN),
        y: value,
    }))
}

function genLineChartData(dataset) {
    return dataset.map((element, index) => ({
        x: index,
        r: element,
    }))
}

export default function Settings(props) {
    // Use context -------------------------------------------------------------
    const appDispatch = React.useContext(AppDispatchContext)
    const appState = React.useContext(AppStateContext)

    // Use state ---------------------------------------------------------------
    const [, forceUpdate] = React.useState()
    const [mu, setMu] = React.useState(MU_INIT_VALUE)
    const [range, setRange] = React.useState([R_MIN, R_MAX])
    const [rounds, setRounds] = React.useState(ROUNDS_INIT_VALUE)
    const [sigma, setSigma] = React.useState(SIGMA_INIT_VALUE)

    // -------------------------------------------------------------------------
    // rand() ---
    const rand = randomNormal(mu, sigma)

    // pdfData[] ---
    const pdfRs = Array(rRange + 1).fill(0)
    for (let i = 0; i < R_ESTIMATIONS; i++) {
        const r = Math.round(rand() + rRange + R_MIN)
        if (
            r >= 0 && r <= rRange
            && r >= range[0] + rRange + R_MIN && r <= range[1] + rRange + R_MIN
        ) {
            pdfRs[r] = ++pdfRs[r]
        }
    }

    const pdfData = pdfRs.map((element, index) => ({
        r: index + R_MIN,
        y: element,
    }))

    // dataset[] ---
    let watchdog = 1000000
    const dataset = []
    while (dataset.length !== rounds && watchdog) {
        watchdog--
        const r = Math.round(rand() * 10) / 10
        if (
            r >= R_MIN && r <= R_MAX
            && r >= range[0] && r <= range[1]
        ) {
            dataset.push(r)
        }
    }

    // Line chart datasets ---
    const datasetLineChart = genLineChartData(dataset)
    const datasetCurrentLineChart = genLineChartData(appState.dataset)

    // Bar chart datasets ---
    const datasetBarChart = genBarChartData(dataset, rRange)
    const datasetCurrentBarChart = genBarChartData(appState.dataset, rRange)

    // R statistics ---
    const rMin = Math.min(...dataset)
    const rMax = Math.max(...dataset)
    const rSum = dataset.reduce((acc, curr) => acc + curr, 0)
    const rMean = rSum / dataset.length

    const sortedDataset = [...dataset].sort((a, b) => a - b)
    const rMedian = (sortedDataset[(sortedDataset.length - 1) >> 1] + sortedDataset[sortedDataset.length >> 1]) / 2

    const rCurrentMin = Math.min(...appState.dataset)
    const rCurrentMax = Math.max(...appState.dataset)
    const rCurrentSum = appState.dataset.reduce((acc, curr) => acc + curr, 0)
    const rCurrentMean = rCurrentSum / appState.dataset.length

    const sortedCurrentDataset = [...appState.dataset].sort((a, b) => a - b)
    const rCurrentMedian = (sortedCurrentDataset[(sortedCurrentDataset.length - 1) >> 1] + sortedCurrentDataset[sortedCurrentDataset.length >> 1]) / 2

    // Render content ----------------------------------------------------------
    return (
        <div className="app-container">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <ISettingsApplications color="primary" />
                <Typography variant="button" color="primary">
                    &nbsp;Settings
                </Typography>
            </div>

            {/* PDF -------------------------------------------------------- */}
            <PDF
                {...props}
                chartHeight={CHART_HEIGHT}
                chartWidth={CHART_WIDTH}
                pdfData={pdfData}
                mu={mu}
                muMax={MU_MAX}
                muMin={MU_MIN}
                muStep={MU_STEP}
                range={range}
                rangeAbsoluteMax={RANGE_MAX}
                rangeAbsoluteMin={RANGE_MIN}
                rangeStep={RANGE_STEP}
                sigma={sigma}
                sigmaInitValue={SIGMA_INIT_VALUE}
                sigmaMax={SIGMA_MAX}
                sigmaMin={SIGMA_MIN}
                sigmaStep={SIGMA_STEP}

                onSetMu={(...[, value]) => setMu(value)}
                onSetRange={(...[, value]) => setRange(value)}
                onSetSigma={(...[, value]) => setSigma(value)}
            />

            {/* New dataset ------------------------------------------------ */}
            <Dataset
                {...props}
                isNewDataset
                chartHeight={CHART_HEIGHT}
                chartWidth={CHART_WIDTH}
                dataset={dataset}
                datasetBarChart={datasetBarChart}
                datasetLineChart={datasetLineChart}
                rMax={rMax}
                rMean={rMean}
                rMedian={rMedian}
                rMin={rMin}
                rSum={rSum}

                rounds={rounds}
                roundsInitValue={ROUNDS_INIT_VALUE}
                roundsMax={ROUNDS_MAX}
                roundsMin={ROUNDS_MIN}
                roundsStep={ROUNDS_STEP}
                onSetRounds={(...[, value]) => setRounds(value)}
                onShuffle={() => forceUpdate(Date.now())}
            />

            {/* Save dataset ----------------------------------------------- */}
            <div
                style={{
                    marginTop: 48,
                    textAlign: 'center',
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => appDispatch({
                        type: ':appsState/SET_DATASET:',
                        payload: dataset,
                    })}
                >
                    <ISave />
                    &nbsp;Save
                </Button>
            </div>

            <br />
            <Divider />

            {/* New dataset ------------------------------------------------ */}
            <Dataset
                {...props}
                isNewDataset={false}
                chartHeight={CHART_HEIGHT}
                chartWidth={CHART_WIDTH}
                dataset={appState.dataset}
                datasetBarChart={datasetCurrentBarChart}
                datasetLineChart={datasetCurrentLineChart}
                rMax={rCurrentMax}
                rMean={rCurrentMean}
                rMedian={rCurrentMedian}
                rMin={rCurrentMin}
                rSum={rCurrentSum}
            />
        </div>
    )
}
