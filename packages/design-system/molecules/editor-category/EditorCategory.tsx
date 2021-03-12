import { FaderOpacity } from '@roleypoly/design-system/atoms/fader';
import { HorizontalSwitch } from '@roleypoly/design-system/atoms/horizontal-switch';
import { Popover } from '@roleypoly/design-system/atoms/popover';
import { Role } from '@roleypoly/design-system/atoms/role';
import { Space } from '@roleypoly/design-system/atoms/space';
import { TextInput, TextInputWithIcon } from '@roleypoly/design-system/atoms/text-input';
import { Text } from '@roleypoly/design-system/atoms/typography';
import { RoleSearch } from '@roleypoly/design-system/molecules/role-search';
import { Category, CategoryType, Role as RoleType } from '@roleypoly/types';
import * as React from 'react';
import { GoSearch } from 'react-icons/go';
import { RoleContainer } from './EditorCategory.styled';

type Props = {
    category: Category;
    uncategorizedRoles: RoleType[];
    guildRoles: RoleType[];
    onChange: (category: Category) => void;
};

const typeEnumToSwitch = (typeData: CategoryType) => {
    if (typeData === CategoryType.Single) {
        return 'Single';
    } else {
        return 'Multiple';
    }
};

const switchToTypeEnum = (typeData: 'Single' | 'Multiple') => {
    if (typeData === 'Single') {
        return CategoryType.Single;
    } else {
        return CategoryType.Multi;
    }
};

export const EditorCategory = (props: Props) => {
    const [roleSearchPopoverActive, setRoleSearchPopoverActive] = React.useState(false);
    const [roleSearchTerm, updateSearchTerm] = React.useState('');

    const onUpdate = (
        key: keyof typeof props.category,
        pred?: (newValue: any) => any
    ) => (newValue: any) => {
        props.onChange({
            ...props.category,
            [key]: pred ? pred(newValue) : newValue,
        });
    };

    const handleRoleSelect = (role: RoleType) => {
        setRoleSearchPopoverActive(false);
        updateSearchTerm('');
        props.onChange({
            ...props.category,
            roles: [...props.category.roles, role.id],
        });
    };

    const handleRoleDeselect = (role: RoleType) => () => {
        props.onChange({
            ...props.category,
            roles: props.category.roles.filter((x) => x !== role.id),
        });
    };

    return (
        <div>
            <Text>Category Name</Text>
            <TextInput
                placeholder="Pronouns, Political, Colors..."
                value={props.category.name}
                onChange={onUpdate('name', (x) => x.target.value)}
            />

            <Space />

            <Text>Selection Type</Text>
            <div>
                <HorizontalSwitch
                    items={['Multiple', 'Single']}
                    value={typeEnumToSwitch(props.category.type)}
                    onChange={onUpdate('type', switchToTypeEnum)}
                />
            </div>

            <Space />

            <Text>Visiblity</Text>
            <div>
                <HorizontalSwitch
                    items={['Visible', 'Hidden']}
                    value={props.category.hidden ? 'Hidden' : 'Visible'}
                    onChange={onUpdate('hidden', (a) => a === 'Hidden')}
                />
            </div>

            <Space />
            <Text>Roles</Text>
            <Popover
                position={'top left'}
                headContent={null}
                active={roleSearchPopoverActive}
                onExit={() => setRoleSearchPopoverActive(false)}
            >
                {() => (
                    <RoleSearch
                        placeholder={'Type or drag a role...'}
                        roles={props.uncategorizedRoles}
                        onSelect={handleRoleSelect}
                        searchTerm={roleSearchTerm}
                        onSearchUpdate={(newTerm) => updateSearchTerm(newTerm)}
                    />
                )}
            </Popover>
            <FaderOpacity isVisible={!roleSearchPopoverActive}>
                <TextInputWithIcon
                    icon={<GoSearch />}
                    placeholder={'Type or drag a role...'}
                    onFocus={() => setRoleSearchPopoverActive(true)}
                    value={roleSearchTerm}
                    onChange={(x) => updateSearchTerm(x.target.value)}
                />
                <RoleContainer>
                    {props.category.roles.map((id) => {
                        const role = props.guildRoles.find((x) => x.id === id);
                        if (!role) {
                            return <></>;
                        }

                        return (
                            <Role
                                role={role}
                                selected={false}
                                key={id}
                                type="delete"
                                onClick={handleRoleDeselect(role)}
                            />
                        );
                    })}
                </RoleContainer>
            </FaderOpacity>
        </div>
    );
};
