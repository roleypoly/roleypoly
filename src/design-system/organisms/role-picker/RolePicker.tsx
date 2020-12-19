import { isEqual, xor } from 'lodash';
import NextLink from 'next/link';
import * as React from 'react';
import { GoInfo } from 'react-icons/go';
import {
    Category,
    CategoryType,
    GuildData,
    GuildSlug,
    Member,
    Role,
} from 'roleypoly/common/types';
import { ReactifyNewlines } from 'roleypoly/common/utils/ReactifyNewlines';
import { sortBy } from 'roleypoly/common/utils/sortBy';
import { FaderOpacity } from 'roleypoly/design-system/atoms/fader';
import { Space } from 'roleypoly/design-system/atoms/space';
import { Link } from 'roleypoly/design-system/atoms/typography';
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
    guild: GuildSlug;
    guildData: GuildData;
    member: Member;
    roles: Role[];
    onSubmit: (selectedRoles: string[]) => void;
    editable: boolean;
};

export const RolePicker = (props: RolePickerProps) => {
    const [selectedRoles, updateSelectedRoles] = React.useState<string[]>(
        props.member.roles
    );

    React.useEffect(() => {
        if (!isEqual(props.member.roles, selectedRoles)) {
            updateSelectedRoles(props.member.roles);
        }
    }, [props.member.roles]);

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
                        {sortBy(
                            props.guildData.categories.filter(
                                (category) => !category.hidden
                            ),
                            'position'
                        ).map((category, idx) => (
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
                        isVisible={xor(selectedRoles, props.member.roles).length !== 0}
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
                        {props.editable && (
                            <>
                                {' '}
                                <NextLink
                                    passHref
                                    href={`/s/[id]/edit`}
                                    as={`/s/${props.guild.id}/edit`}
                                >
                                    <Link>Add some roles!</Link>
                                </NextLink>
                            </>
                        )}
                    </div>
                </InfoBox>
            )}
        </Container>
    );
};
