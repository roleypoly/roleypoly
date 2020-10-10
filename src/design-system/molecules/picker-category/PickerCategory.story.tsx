import * as React from 'react';
import { moleculeStories } from 'molecules/molecules.story';
import { PickerCategory, CategoryProps } from './PickerCategory';
import { action } from '@storybook/addon-actions';
import { text, optionsKnob } from '@storybook/addon-knobs';
import { roleCategory, roleWikiData, mockCategory } from 'hack/fixtures/storyData';

const stories = moleculeStories('Picker Category', module);

const data: (mode?: 'single') => CategoryProps = (mode?: 'single') => ({
    title: text('Title', 'Pronouns'),
    type: 'multi',
    roles: roleCategory,
    wikiMode: false,
    category: mockCategory,
    onChange: () => action('onChange'),
    selectedRoles: optionsKnob<string[]>(
        'Selected Roles',
        roleCategory.reduce((acc, x) => ({ ...acc, [x.name]: x.id }), {}),
        [roleCategory[0].id],
        { display: mode === 'single' ? 'select' : 'multi-select' }
    ),
});

stories.add('Multi', () => {
    const d = data();
    return <PickerCategory {...d} type="multi" />;
});
stories.add('Single', () => {
    const d = data('single');
    return <PickerCategory {...d} type="single" />;
});
stories.add('Wiki', () => {
    const d = data();
    return <PickerCategory {...d} wikiMode roleWikiData={roleWikiData} />;
});
