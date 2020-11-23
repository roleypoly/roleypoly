import * as React from 'react';
import { Logomark, LogoProps, Logotype } from './Branding';

type DynamicLogoProps = Partial<LogoProps> & {
    currentDate?: Date;
};

export const DynamicLogomark = (props: DynamicLogoProps) => {
    const variant = React.useMemo(() => getRelevantVariant(props.currentDate), [
        props.currentDate,
    ]);

    if (!variant) {
        return <Logomark {...props} />;
    }

    return <variant.Logomark {...props} />;
};

export const DynamicLogotype = (props: DynamicLogoProps) => {
    const variant = React.useMemo(() => getRelevantVariant(props.currentDate), [
        props.currentDate,
    ]);

    if (!variant) {
        return <Logotype {...props} />;
    }

    return <variant.Logotype {...props} />;
};

const getRelevantVariant = (currentDate?: Date) => {
    for (let variant of AllVariants) {
        if (variant.activeIf(currentDate)) return variant;
    }

    return null;
};

// These should be updated for 2021.
// Please feel free to update with a PR for 2022 or any missing weeks within 2021.
// Rules:
// - common law holidays should have at least 2 extra days before and after
// - pride days should be 1 extra day before and after
// - weeks/months should have no buffer
// - 4/20 is just for 4/20.

const matchDay = (
    start: Date,
    end: Date,
    currentDate: Date = new Date(),
    staticDate: boolean = false
) => {
    if (!staticDate) {
        // pre-fill start/end years to simplify
        start.setFullYear(currentDate.getFullYear());
        end.setFullYear(currentDate.getFullYear());
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (currentDate > start && currentDate < end) {
        return true;
    }

    return false;
};

type Variant = {
    activeIf: (currentDate?: Date) => boolean;
    Logomark: React.FunctionComponent<DynamicLogoProps>;
    Logotype: React.FunctionComponent<DynamicLogoProps>;
};

export const Trans: Variant = {
    // March 31, Nov 13-20+1
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Mar-31'), new Date('2021-Apr-1'), currentDate) ||
        matchDay(new Date('2021-Nov-13'), new Date('2021-Nov-21'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const Pride: Variant = {
    // June
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Jun-1'), new Date('2021-Jul-1'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const Bi: Variant = {
    // Sept 16-23
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Sep-16'), new Date('2021-Sep-24'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const Lesbian: Variant = {
    // Apr 26
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Apr-25'), new Date('2021-Apt-27'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const Ace: Variant = {
    // Oct 24-30
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Oct-24'), new Date('2021-Oct-31'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const Birthday: Variant = {
    // Jan 15
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Jan-15'), new Date('2021-Jan-16'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const DevilsLettuce: Variant = {
    // Apr 20
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Apr-20'), new Date('2021-Apr-21'), currentDate),
    Logomark: (props: DynamicLogoProps) => (
        <>
            <Logomark {...props} circleFill="forestgreen" typeFill="green" />
        </>
    ),
    Logotype: (props: DynamicLogoProps) => (
        <>
            <Logotype {...props} circleFill="forestgreen" typeFill="green" />
        </>
    ),
};

export const BicycleDay: Variant = {
    // Apr 19
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Apr-19'), new Date('2021-Apr-20'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const Christmas: Variant = {
    // Dec 20-27
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Dec-20'), new Date('2021-Dec-28'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const NewYear: Variant = {
    // Dec 30 - Jan 2
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Dec-30'), new Date('2021-Jan-3'), currentDate),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const LunarNewYear: Variant = {
    // Feb 12, 2021
    // Feb 1, 2022
    activeIf: (currentDate?: Date) =>
        matchDay(new Date('2021-Feb-10'), new Date('2021-Feb-13'), currentDate, true) ||
        matchDay(new Date('2022-Jan-30'), new Date('2022-Feb-3'), currentDate, true),
    Logomark: (props: DynamicLogoProps) => <></>,
    Logotype: (props: DynamicLogoProps) => <></>,
};

export const AllVariants: Variant[] = [
    Trans,
    Pride,
    Bi,
    Lesbian,
    Ace,
    Birthday,
    DevilsLettuce,
    BicycleDay,
    Christmas,
    NewYear,
    LunarNewYear,
];
