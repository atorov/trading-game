import React from 'react'
import PropTypes from 'prop-types'

import withTheme from '@material-ui/core/styles/withTheme'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import IShuffle from '@material-ui/icons/Shuffle'

import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    XAxis,
    YAxis,
} from 'recharts'

function Dataset(props) {
    // Render content ----------------------------------------------------------
    return (
        <Paper
            style={{
                marginTop: 48,
                padding: props.theme.spacing(3, 2),
                background: props.isNewDataset ? props.theme.palette.background.paper : 'lightgray',
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
                    {props.isNewDataset ? 'New Dataset' : 'Current Dataset'}
                </Typography>
                {props.isNewDataset ? (
                    <Button
                        color="secondary"
                        onClick={props.onShuffle}
                    >
                        <IShuffle />
                            &nbsp;Shuffle
                    </Button>
                ) : null}
            </div>
            <Divider />

            {props.isNewDataset ? (
                <div
                    style={{
                        width: props.chartWidth / 2,
                        margin: `${props.theme.spacing(2)}px auto 0 auto`,
                    }}
                >
                    <Typography variant="h6">
                        Trades count = &nbsp;
                        {props.rounds}
                    </Typography>
                    <Slider
                        defaultValue={props.roundsInitValue}
                        valueLabelDisplay="auto"
                        min={props.roundsMin}
                        max={props.roundsMax}
                        step={props.roundsStep}
                        onChangeCommitted={props.onSetRounds}
                    />
                </div>
            ) : <br />}

            <LineChart
                width={props.chartWidth}
                height={props.chartHeight}
                data={props.datasetLineChart}
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
                    isFront
                    stroke={props.theme.palette.secondary.main}
                />
                <ReferenceLine
                    y={props.rMean}
                    isFront
                    stroke={props.theme.palette.primary.light}
                    strokeDasharray={`${props.theme.spacing()} ${props.theme.spacing()}`}
                />
                <ReferenceLine
                    y={props.rMedian}
                    isFront
                    stroke={props.theme.palette.primary.light}
                    strokeDasharray={`${props.theme.spacing(0.25)} ${props.theme.spacing(0.5)}`}
                />
            </LineChart>

            <BarChart
                width={props.chartWidth}
                height={props.chartHeight}
                data={props.datasetBarChart}
                style={{ margin: '0 auto' }}
            >
                <XAxis dataKey="x" />
                <YAxis dataKey="y" />
                <CartesianGrid />
                <Bar
                    dataKey="y"
                    type="monotone"
                    fill={props.theme.palette.primary.main}
                />
                <ReferenceLine
                    x={0}
                    isFront
                    stroke={props.theme.palette.secondary.main}
                />
            </BarChart>

            <div
                style={{
                    width: props.chartWidth,
                    margin: `${props.theme.spacing(2)}px auto 0 auto`,
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sum</TableCell>
                            <TableCell align="center">Min</TableCell>
                            <TableCell align="center">Max</TableCell>
                            <TableCell align="center">Mean</TableCell>
                            <TableCell align="center">Median</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{props.rSum.toFixed(1)}</TableCell>
                            <TableCell align="center">{props.rMin.toFixed(1)}</TableCell>
                            <TableCell align="center">{props.rMax.toFixed(1)}</TableCell>
                            <TableCell align="center">{props.rMean.toFixed(1)}</TableCell>
                            <TableCell align="center">{props.rMedian.toFixed(1)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <TextField
                    multiline
                    rows="4"
                    rowsMax="4"
                    value={'[ ' + props.dataset.join(', ') + ' ]'}
                    disabled
                    style={{
                        width: '100%',
                        marginTop: props.theme.spacing(2),
                    }}
                />
            </div>
        </Paper>
    )
}

Dataset.propTypes = {
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    dataset: PropTypes.array.isRequired,
    datasetBarChart: PropTypes.array.isRequired,
    datasetLineChart: PropTypes.array.isRequired,
    isNewDataset: PropTypes.bool.isRequired,
    rMax: PropTypes.number.isRequired,
    rMean: PropTypes.number.isRequired,
    rMedian: PropTypes.number.isRequired,
    rMin: PropTypes.number.isRequired,
    rSum: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,

    rounds: PropTypes.number,
    roundsInitValue: PropTypes.number,
    roundsMax: PropTypes.number,
    roundsMin: PropTypes.number,
    roundsStep: PropTypes.number,

    onSetRounds: PropTypes.func,
    onShuffle: PropTypes.func,
}

Dataset.defaultProps = {
    rounds: 10,
    roundsInitValue: 10,
    roundsMax: 100,
    roundsMin: 5,
    roundsStep: 1,

    onSetRounds: () => {},
    onShuffle: () => {},
}

export default withTheme(Dataset)
