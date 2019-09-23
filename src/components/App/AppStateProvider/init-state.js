import { randomNormal } from 'd3-random'

const rand = randomNormal()

export default {
    dataset: Array(5).fill(null).map(() => rand()),
}
