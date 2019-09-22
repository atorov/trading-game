import React from 'react'
import PropTypes from 'prop-types'

import withTheme from '@material-ui/core/styles/withTheme'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

import ISave from '@material-ui/icons/Save'
import ISettingsApplications from '@material-ui/icons/SettingsApplications'
import IShuffle from '@material-ui/icons/Shuffle'

import {
    CartesianGrid,
    Line,
    LineChart,
    Area,
    AreaChart,
    ReferenceLine,
    XAxis,
    YAxis,
} from 'recharts'

import { randomNormal } from 'd3-random'

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

function Settings(props) {
    // Use state ---------------------------------------------------------------
    const [, forceUpdate] = React.useState()
    const [mu, setMu] = React.useState(MU_INIT_VALUE)
    const [range, setRange] = React.useState([R_MIN, R_MAX])
    const [rounds, setRounds] = React.useState(ROUNDS_INIT_VALUE)
    const [sigma, setSigma] = React.useState(SIGMA_INIT_VALUE)

    // rand() ------------------------------------------------------------------
    const rand = randomNormal(mu, sigma)

    // pdsData[] ---------------------------------------------------------------
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

    // dataset[] ---------------------------------------------------------------
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

    // datasetLineChart[] ------------------------------------------------------
    const datasetLineChart = (dataset.map((element, index) => ({
        x: index,
        r: element,
    })))

    // DatasetBarChart[] -------------------------------------------------------
    const datasetBarChart = Array(rRange + 1).fill(0)
    dataset.forEach((element) => {
        const index = Math.round(element - R_MIN)
        if (index >= 0 && index <= rRange) {
            datasetBarChart[index] = ++datasetBarChart[index]
        }
    })

    console.log(datasetBarChart) // TODO:

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
            <Paper
                style={{
                    marginTop: 48,
                    padding: props.theme.spacing(3, 2),
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h5">
                        Probability Density Function of R
                    </Typography>
                </div>
                <Divider />

                <div
                    style={{
                        width: CHART_WIDTH,
                        margin: `${props.theme.spacing(2)}px auto 0 auto`,
                    }}
                >
                    <Typography variant="h6">
                        σ = &nbsp;
                        {sigma}
                    </Typography>
                    <Slider
                        defaultValue={SIGMA_INIT_VALUE}
                        valueLabelDisplay="auto"
                        min={SIGMA_MIN}
                        max={SIGMA_MAX}
                        step={SIGMA_STEP}
                        onChangeCommitted={(...[, value]) => setSigma(value)}
                    />

                    <Typography variant="h6">
                        µ = &nbsp;
                        {mu}
                    </Typography>
                    <Slider
                        defaultValue={mu}
                        valueLabelDisplay="auto"
                        min={MU_MIN}
                        max={MU_MAX}
                        step={MU_STEP}
                        onChangeCommitted={(...[, value]) => setMu(value)}
                    />
                </div>

                <AreaChart
                    width={CHART_WIDTH}
                    height={CHART_HEIGHT}
                    data={pdfData}
                    style={{ margin: '0 auto' }}
                >
                    <XAxis dataKey="r" />
                    <CartesianGrid />
                    <Area
                        dataKey="y"
                        type="monotone"
                        stroke={props.theme.palette.primary.main}
                        strokeWidth={3}
                        dot={false}
                        isAnimationActive={false}
                    />
                    <ReferenceLine
                        x={0}
                        stroke={props.theme.palette.secondary.main}
                    />
                </AreaChart>

                <div
                    style={{
                        width: CHART_WIDTH,
                        margin: '0 auto',
                    }}
                >
                    <Slider
                        defaultValue={range}
                        valueLabelDisplay="auto"
                        min={RANGE_MIN}
                        max={RANGE_MAX}
                        step={RANGE_STEP}
                        onChangeCommitted={(...[, value]) => setRange(value)}
                    />
                    <Typography variant="h6">
                        {`range = [${range[0]} - ${range[1]}]`}
                    </Typography>
                </div>
            </Paper>

            {/* Dataset ---------------------------------------------------- */}
            <Paper
                style={{
                    marginTop: 48,
                    padding: props.theme.spacing(3, 2),
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h5">
                        New Dataset
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => forceUpdate(Date.now())}
                    >
                        <IShuffle />
                        &nbsp;Shuffle
                    </Button>
                </div>
                <Divider />

                <div
                    style={{
                        width: CHART_WIDTH / 2,
                        margin: `${props.theme.spacing(2)}px auto 0 auto`,
                    }}
                >

                    <Typography variant="h6">
                        Trades count = &nbsp;
                        {rounds}
                    </Typography>
                    <Slider
                        defaultValue={ROUNDS_INIT_VALUE}
                        valueLabelDisplay="auto"
                        min={ROUNDS_MIN}
                        max={ROUNDS_MAX}
                        step={ROUNDS_STEP}
                        // marks
                        onChangeCommitted={(...[, value]) => setRounds(value)}
                    />
                </div>

                <LineChart
                    width={CHART_WIDTH}
                    height={CHART_HEIGHT}
                    data={datasetLineChart}
                    style={{ margin: '0 auto' }}
                >
                    <XAxis dataKey="x" />
                    <YAxis dataKey="r" />
                    <CartesianGrid />
                    <Line
                        dataKey="r"
                        type="monotone"
                        stroke={props.theme.palette.primary.main}
                        strokeWidth={3}
                    />
                    <ReferenceLine
                        y={0}
                        stroke={props.theme.palette.secondary.main}
                    />
                </LineChart>
            </Paper>

            {/* Save dataset ----------------------------------------------- */}
            <div
                style={{
                    marginTop: 48,
                    textAlign: 'center',
                }}
            >
                <Divider />
                <br />
                <Button
                    variant="contained"
                    color="secondary"
                    // onClick={() => ...} // TODO:
                >
                    <ISave />
                    &nbsp;Save
                </Button>
            </div>
        </div>
    )
}

Settings.propTypes = {
    theme: PropTypes.object.isRequired,
}

export default withTheme(Settings)
