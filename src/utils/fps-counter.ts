export class FpsCounter {
    samples_number: number;
    samples: number[];

    constructor(samples_number: number) {
        this.samples_number = samples_number;
        this.samples = [];
    }

    sample(time: number): number {
        const len = this.samples.length;

        this.samples.push(time);

        if (len == 0) {
            return NaN;
        } else if (len < this.samples_number) {
            return len / (time - this.samples[0]);
        } else {
            const first = this.samples.shift();
            return len / (time - first);
        }
    }
}
