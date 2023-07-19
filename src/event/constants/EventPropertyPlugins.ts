export const INCREMENT = {
    FUNCTION: (before: number): number => {
        return before + 1;
    },
    INIT_VALUE: 0
}

export const DECREMENT = {
    FUNCTION: (before: number): number => {
        return before - 1;
    },
    INIT_VALUE: 0
}

export const HREF = {
    FUNCTION: (before: string): string => {
        return location.href;
    },
    INIT_VALUE: null
}

// export function INCREMENT(before: number): number {
//     return before + 1;
// }

// export function DECREMENT(before: number): number {
//     return before - 1;
// }