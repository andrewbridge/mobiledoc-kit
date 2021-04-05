interface WithPrototype<TP> {
    prototype: TP;
}
export default function mixin<TP, T extends WithPrototype<TP>, SP, S extends WithPrototype<SP>>(target: T, source: S | SP): void;
export {};
