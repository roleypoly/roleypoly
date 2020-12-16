import * as React from 'react';
import { GoInfo } from 'react-icons/go';
import {
    Category,
    CategoryType,
    Guild,
    GuildData,
    Member,
    Role,
} from 'roleypoly/common/types';
import { ReactifyNewlines } from 'roleypoly/common/utils/ReactifyNewlines';
import { FaderOpacity } from 'roleypoly/design-system/atoms/fader';
import { Space } from 'roleypoly/design-system/atoms/space';
import { PickerCategory } from 'roleypoly/design-system/molecules/picker-category';
import { ResetSubmit } from 'roleypoly/design-system/molecules/reset-submit';
import { ServerMasthead } from 'roleypoly/design-system/molecules/server-masthead';
import {
    CategoryContainer,
    Container,
    InfoBox,
    InfoIcon,
    MessageBox,
} from './RolePicker.styled';

export type RolePickerProps = {
    guild: Guild;
    guildData: GuildData;
    member: Member;
    roles: Role[];
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
        props.member.roles
    );

    const handleChange = (category: Category) => (role: Role) => (newState: boolean) => {
        if (category.type === CategoryType.Single) {
            updateSelectedRoles(
                newState === true
                    ? [
                          ...selectedRoles.filter((x) => !category.roles.includes(x)),
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

            {props.guildData.categories.length !== 0 ? (
                <>
                    <div>
                        {props.guildData.categories.map((category, idx) => (
                            <CategoryContainer key={idx}>
                                <PickerCategory
                                    key={idx}
                                    category={category}
                                    title={category.name}
                                    selectedRoles={selectedRoles.filter((roleId) =>
                                        category.roles.includes(roleId)
                                    )}
                                    roles={
                                        category.roles
                                            .map((role) =>
                                                props.roles.find((r) => r.id === role)
                                            )
                                            .filter((r) => r !== undefined) as Role[]
                                    }
                                    onChange={handleChange(category)}
                                    wikiMode={false}
                                    type={
                                        category.type === CategoryType.Single
                                            ? 'single'
                                            : 'multi'
                                    }
                                />
                            </CategoryContainer>
                        ))}
                    </div>
                    <FaderOpacity
                        isVisible={!arrayMatches(selectedRoles, props.member.roles)}
                    >
                        <ResetSubmit
                            onSubmit={() => props.onSubmit(selectedRoles)}
                            onReset={() => {
                                updateSelectedRoles(props.member.roles);
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
