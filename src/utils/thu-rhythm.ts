export interface RhythmItem {
    event: string,
    start: number,
}

export interface Rhythm {
    start: number,
    items: RhythmItem[],
}

function hm2milli(h: number, m: number): number {
    return (h * 60 + m) * 60 * 1000;
}

export const RHYTHM: Rhythm = {
    start: hm2milli(8, 0),
    items: [
        { event: "第一大节第一小节", start: hm2milli(8, 0) },
        { event: "小课间", start: hm2milli(8, 45) },
        { event: "第一大节第二小节", start: hm2milli(8, 50) },
        { event: "大课间", start: hm2milli(9, 35) },
        { event: "第二大节第一小节", start: hm2milli(9, 50) },
        { event: "小课间", start: hm2milli(10, 35) },
        { event: "第二大节第二小节", start: hm2milli(10, 40) },
        { event: "小课间", start: hm2milli(11, 25) },
        { event: "第二大节第三小节", start: hm2milli(11, 30) },
        { event: "午间休息", start: hm2milli(12, 15) },
        { event: "第三大节第一小节", start: hm2milli(13, 30) },
        { event: "小课间", start: hm2milli(14, 15) },
        { event: "第三大节第二小节", start: hm2milli(14, 20) },
        { event: "大课间", start: hm2milli(15, 5) },
        { event: "第四大节第一小节", start: hm2milli(15, 20) },
        { event: "小课间", start: hm2milli(16, 5) },
        { event: "第四大节第二小节", start: hm2milli(16, 10) },
        { event: "大课间", start: hm2milli(16, 55) },
        { event: "第五大节第一小节", start: hm2milli(17, 5) },
        { event: "小课间", start: hm2milli(17, 50) },
        { event: "第五大节第二小节", start: hm2milli(17, 55) },
        { event: "大课间", start: hm2milli(18, 40) },
        { event: "第六大节第一小节", start: hm2milli(19, 20) },
        { event: "小课间", start: hm2milli(20, 5) },
        { event: "第六大节第二小节", start: hm2milli(20, 10) },
        { event: "小课间", start: hm2milli(20, 55) },
        { event: "第六大节第三小节", start: hm2milli(21, 0) },
        { event: "晚间休息", start: hm2milli(21, 45) },
    ],
};

export const RHYTHM_ITEM_COUNT: number = RHYTHM.items.length;

export interface RhythmQueryResult {
    currentEvent: string,
    currentStart: number,
    nextEvent: string,
    nextStart: number,
}

export function rhythmQuery(mid: number): RhythmQueryResult {
    let current: RhythmItem = RHYTHM.items[RHYTHM_ITEM_COUNT - 1];
    let next: RhythmItem = RHYTHM.items[0];

    for (let i = 0; i < RHYTHM_ITEM_COUNT; i++) {
        if (RHYTHM.items[i].start > mid) {
            if (i != 0) {
                current = RHYTHM.items[i - 1];
                next = RHYTHM.items[i];
            }

            break;
        }
    }

    return {
        currentEvent: current.event,
        currentStart: current.start,
        nextEvent: next.event,
        nextStart: next.start,
    };
}
