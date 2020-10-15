import * as pbjs from 'google-protobuf';

// Protobuf Message itself
type GenericObject<T extends pbjs.Message> = T;

// Message's "setter" call
type ProtoFunction<T extends pbjs.Message, U extends ReturnType<T['toObject']>> = (
    value: U[keyof U]
) => void;

/**
 * AsObjectToProto does the opposite of ProtoMessage.toObject().
 * This function turns regular JS objects back into their source protobuf message type,
 * with the help us copious amounts of reflection.
 * @param protoClass A protobuf message class
 * @param input A JS object that corresponds to the protobuf message class.
 */
export const AsObjectToProto = <T extends pbjs.Message>(
    protoClass: { new (): T },
    input: ReturnType<T['toObject']>
): GenericObject<T> => {
    // First, we create the message itself
    const proto = new protoClass();

    // We want the keys from the message, this will give us the setter names we need.
    const protoKeys = Object.getOwnPropertyNames((proto as any).__proto__);

    // Loop over the input data keys
    for (let inputKey in input) {
        // As we loop, find the setter function for the key
        const setCallName = protoKeys.find(
            (key) => `set${inputKey.toLowerCase()}` === key.toLowerCase()
        ) as keyof typeof proto;

        // If we encounter a key without a place to go, we silently ignore it.
        if (!setCallName) {
            continue;
        }

        // But, if it all succeeds, we call the setter with the JS object's value.
        ((proto[setCallName] as unknown) as ProtoFunction<T, typeof input>)(
            input[inputKey]
        );
    }

    return proto;
};
