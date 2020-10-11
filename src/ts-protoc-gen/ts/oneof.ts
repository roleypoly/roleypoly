import { Printer } from '../Printer';
import {
    OneofDescriptorProto,
    FieldDescriptorProto,
} from 'google-protobuf/google/protobuf/descriptor_pb';
import { oneOfName } from '../util';

export function printOneOfDecl(
    oneOfDecl: OneofDescriptorProto,
    oneOfFields: Array<FieldDescriptorProto>,
    indentLevel: number
) {
    const printer = new Printer(indentLevel);
    printer.printEmptyLn();
    printer.printLn(`export enum ${oneOfName(oneOfDecl.getName() as string)}Case {`);
    printer.printIndentedLn(
        `${(oneOfDecl.getName() as string).toUpperCase()}_NOT_SET = 0,`
    );
    oneOfFields.forEach((field) => {
        printer.printIndentedLn(
            `${(field.getName() as string).toUpperCase()} = ${
                field.getNumber() as number
            },`
        );
    });
    printer.printLn('}');

    return printer.output;
}
