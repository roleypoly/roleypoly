import * as React from 'react';
import { HorizontalSwitch } from 'roleypoly/src/design-system/atoms/horizontal-switch';
import { Space } from 'roleypoly/src/design-system/atoms/space';
import {
    TextInput,
    TextInputWithIcon,
} from 'roleypoly/src/design-system/atoms/text-input';
import { Text } from 'roleypoly/src/design-system/atoms/typography';
import { Popover } from 'roleypoly/src/design-system/atoms/popover';
import { FaderOpacity } from 'roleypoly/src/design-system/atoms/fader';
import { RoleSearch } from 'roleypoly/src/design-system/molecules/role-search';
import {
    Category,
    CategoryType,
    Role as RoleType,
} from 'roleypoly/src/design-system/shared-types';
import { Role } from 'roleypoly/src/design-system/atoms/role';
import { GoSearch } from 'react-icons/go';
import { RoleContainer } from './EditorCategory.styled';

type Props = {
    category: Category;
    uncategorizedRoles: RoleType[];
    guildRoles: RoleType[];
    onChange: (category: Category) => void;
};

const typeEnumToSwitch = (typeData: CategoryType) => {
    if (typeData === CategoryType.SINGLE) {
        return 'Single';
    } else {
        return 'Multiple';
    }
};

const switchToTypeEnum = (typeData: 'Single' | 'Multiple') => {
    if (typeData === 'Single') {
        return CategoryType.SINGLE;
    } else {
        return CategoryType.MULTI;
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
            rolesList: [...props.category.rolesList, role.id],
        });
    };

    const handleRoleDeselect = (role: RoleType) => () => {
        props.onChange({
            ...props.category,
            rolesList: props.category.rolesList.filter((x) => x !== role.id),
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
                    {props.category.rolesList.map((id) => {
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
