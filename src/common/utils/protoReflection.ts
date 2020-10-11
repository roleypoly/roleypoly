import * as pbjs from 'google-protobuf';

type GenericObject<T extends pbjs.Message> = T;
type ProtoFunction<T extends pbjs.Message, U extends ReturnType<T['toObject']>> = (
    value: U[keyof U]
) => void;

export const AsObjectToProto = <T extends pbjs.Message>(
    protoClass: { new (): T },
    input: ReturnType<T['toObject']>
): GenericObject<T> => {
    const proto = new protoClass();
    const protoKeys = Object.getOwnPropertyNames((proto as any).__proto__);

    for (let inputKey in input) {
        const setCallName = protoKeys.find(
            (key) => `set${inputKey.toLowerCase()}` === key.toLowerCase()
        ) as keyof typeof proto;

        if (!setCallName) {
            continue;
        }

        ((proto[setCallName] as unknown) as ProtoFunction<T, typeof input>)(
            input[inputKey]
        );
    }

    return proto;
};
