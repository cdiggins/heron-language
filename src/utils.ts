export type LabelTypes = 'chooseFunc'|'funcType';

export function trace(label: LabelTypes, message: string) {
    console.log(message);
}