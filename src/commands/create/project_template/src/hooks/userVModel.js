import { computed } from "vue";
export default function (props, proName, emit) {
    return computed({
        get() {
            return new Proxy(props[proName], {
                get(target, key) {
                    return Reflect.get(target, key);
                },
                set(target, key, value) {
                    emit(`update:${proName}`, Object.assign(Object.assign({}, target), { [key]: value }));
                    return true;
                },
            });
        },
        set() { },
    });
}
