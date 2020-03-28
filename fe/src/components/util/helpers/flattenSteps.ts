interface Instruction {
    steps: string[];
}

export function flattenSteps(acc: Instruction[], instruction: Instruction) {
    return [...acc, ...instruction.steps]
}
