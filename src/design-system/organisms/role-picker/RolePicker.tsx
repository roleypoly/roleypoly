import { Member } from '@roleypoly/rpc/discord';
import { Category, GuildData } from '@roleypoly/rpc/platform';
import { Guild, GuildRoles, Role } from '@roleypoly/rpc/shared';
import { FaderOpacity } from 'atoms/fader';
import { Space } from 'atoms/space';
import { ResetSubmit } from 'molecules/reset-submit';
import { ServerMasthead } from 'molecules/server-masthead';
import { PickerCategory } from 'molecules/picker-category';
import * as React from 'react';
import { GoInfo } from 'react-icons/go';
import {
    CategoryContainer,
    Container,
    InfoBox,
    InfoIcon,
    MessageBox,
} from './RolePicker.styled';
import { ReactifyNewlines } from 'utils/ReactifyNewlines';

export type RolePickerProps = {
    guild: Guild.AsObject;
    guildData: GuildData.AsObject;
    member: Member.AsObject;
    roles: GuildRoles.AsObject;
    onSubmit: (selectedRoles: string[]) => void;
    editable: boolean;
};

const arrayMatches = (a: any[], b: any[]) => {
    return (
        a === b ||
        (a.length === b.length &&
            a.every((x) => b.includes(x)) &&
            b.every((x) => a.includes(x)))
    );
};

export const RolePicker = (props: RolePickerProps) => {
    const [selectedRoles, updateSelectedRoles] = React.useState<string[]>(
        props.member.rolesList
    );

    const handleChange = (category: Category.AsObject) => (role: Role.AsObject) => (
        newState: boolean
    ) => {
        if (category.type === Category.CategoryType.SINGLE) {
            updateSelectedRoles(
                newState === true
                    ? [
                          ...selectedRoles.filter((x) => !category.rolesList.includes(x)),
                          role.id,
                      ]
                    : selectedRoles.filter((x) => x !== role.id)
            );
        } else {
            updateSelectedRoles(
                newState === true
                    ? [...selectedRoles, role.id]
                    : selectedRoles.filter((x) => x !== role.id)
            );
        }
    };

    return (
        <Container>
            <Space />
            <ServerMasthead guild={props.guild} editable={props.editable} />
            <Space />
            {props.guildData.message && (
                <>
                    <MessageBox>
                        <ReactifyNewlines>{props.guildData.message}</ReactifyNewlines>
                    </MessageBox>
                    <Space />
                </>
            )}

            {props.guildData.categoriesList.length !== 0 ? (
                <>
                    <div>
                        {props.guildData.categoriesList.map((category, idx) => (
                            <CategoryContainer key={idx}>
                                <PickerCategory
                                    key={idx}
                                    category={category}
                                    title={category.name}
                                    selectedRoles={selectedRoles.filter((roleId) =>
                                        category.rolesList.includes(roleId)
                                    )}
                                    roles={
                                        category.rolesList
                                            .map((role) =>
                                                props.roles.rolesList.find(
                                                    (r) => r.id === role
                                                )
                                            )
                                            .filter(
                                                (r) => r !== undefined
                                            ) as Role.AsObject[]
                                    }
                                    onChange={handleChange(category)}
                                    wikiMode={false}
                                    type={
                                        category.type === Category.CategoryType.SINGLE
                                            ? 'single'
                                            : 'multi'
                                    }
                                />
                            </CategoryContainer>
                        ))}
                    </div>
                    <FaderOpacity
                        isVisible={!arrayMatches(selectedRoles, props.member.rolesList)}
                    >
                        <ResetSubmit
                            onSubmit={() => props.onSubmit(selectedRoles)}
                            onReset={() => {
                                updateSelectedRoles(props.member.rolesList);
                            }}
                        />
                    </FaderOpacity>
                </>
            ) : (
                <InfoBox>
                    <InfoIcon>
                        <GoInfo />
                    </InfoIcon>
                    <div>
                        There are currently no roles available for you to choose from.
                    </div>
                </InfoBox>
            )}
        </Container>
    );
};
