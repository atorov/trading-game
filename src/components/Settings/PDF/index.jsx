import React from 'react'
import PropTypes from 'prop-types'

import withTheme from '@material-ui/core/styles/withTheme'

import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

import {
    Area,
    AreaChart,
    CartesianGrid,
    ReferenceLine,
    XAxis,
} from 'recharts'

function PDF(props) {
    // Render content ----------------------------------------------------------
    return (
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
                    width: props.chartWidth,
                    margin: `${props.theme.spacing(2)}px auto 0 auto`,
                }}
            >
                <Typography variant="h6">
                    σ = &nbsp;
                    {props.sigma}
                </Typography>
                <Slider
                    defaultValue={props.sigmaInitValue}
                    valueLabelDisplay="auto"
                    min={props.sigmaMin}
                    max={props.sigmaMax}
                    step={props.sigmaStep}
                    onChangeCommitted={props.onSetSigma}
                />

                <Typography variant="h6">
                    µ = &nbsp;
                    {props.mu}
                </Typography>
                <Slider
                    defaultValue={props.mu}
                    valueLabelDisplay="auto"
                    min={props.muMin}
                    max={props.muMax}
                    step={props.muStep}
                    onChangeCommitted={props.onSetMu}
                />
            </div>

            <AreaChart
                width={props.chartWidth}
                height={props.chartHeight}
                data={props.pdfData}
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
                    isFront
                />
                <ReferenceLine
                    x={props.range[0]}
                    stroke={props.theme.palette.primary.light}
                    strokeWidth={8}
                    isFront
                />
                <ReferenceLine
                    x={props.range[1]}
                    stroke={props.theme.palette.primary.light}
                    strokeWidth={8}
                    isFront
                />
            </AreaChart>

            <div
                style={{
                    width: props.chartWidth,
                    margin: '0 auto',
                }}
            >
                <Slider
                    defaultValue={props.range}
                    valueLabelDisplay="auto"
                    min={props.rangeAbsoluteMin}
                    max={props.rangeAbsoluteMax}
                    step={props.rangeStep}
                    onChangeCommitted={props.onSetRange}
                />
                <Typography variant="h6">
                    {`range = [${props.range[0]} - ${props.range[1]}]`}
                </Typography>
            </div>
        </Paper>
    )
}

PDF.propTypes = {
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    pdfData: PropTypes.array.isRequired,
    mu: PropTypes.number.isRequired,
    muMax: PropTypes.number.isRequired,
    muMin: PropTypes.number.isRequired,
    muStep: PropTypes.number.isRequired,
    range: PropTypes.array.isRequired,
    rangeAbsoluteMax: PropTypes.number.isRequired,
    rangeAbsoluteMin: PropTypes.number.isRequired,
    rangeStep: PropTypes.number.isRequired,
    sigma: PropTypes.number.isRequired,
    sigmaInitValue: PropTypes.number.isRequired,
    sigmaMax: PropTypes.number.isRequired,
    sigmaMin: PropTypes.number.isRequired,
    sigmaStep: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,

    onSetMu: PropTypes.func.isRequired,
    onSetRange: PropTypes.func.isRequired,
    onSetSigma: PropTypes.func.isRequired,
}

export default withTheme(PDF)
