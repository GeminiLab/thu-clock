/**
 * A class for calculating frames per second (FPS) based on a given number of samples.
 */
export class FpsCounter {
    samples_number: number;
    samples: number[];

    /**
     * Creates an instance of `FpsCounter`.
     * @param samples_number The number of samples to use for calculating FPS.
     */
    constructor(samples_number: number) {
        this.samples_number = samples_number;
        this.samples = [];
    }

    /**
     * Adds a sample time and calculates the FPS based on the stored samples.
     * @param time The time of the current sample.
     * @returns The calculated frames per second (FPS).
     */
    sample(time: number): number {
        const len = this.samples.length;

        this.samples.push(time);

        if (len == 0) {
            return NaN;
        } else if (len < this.samples_number) {
            return len / (time - this.samples[0]);
        } else {
            const first = this.samples.shift()!; // why you don't know it's definitely not undefined?
            return len / (time - first);
        }
    }
}
