import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import { palette } from '../colors';
import { SparkleOverlay } from '../sparkle';
import { Logomark, Logotype } from './Branding';
import { LogoFlagProps, LogomarkFlag, LogotypeFlag } from './FlagBranding';

type DynamicLogoProps = LogoFlagProps & {
  currentDate?: Date;
};

export const DynamicLogomark = (props: Partial<DynamicLogoProps>) => {
  const variant = React.useMemo(() => getRelevantVariant(props.currentDate), [
    props.currentDate,
  ]);

  if (!variant) {
    return <Logomark {...props} />;
  }

  let tooltipProps = {};
  if (variant.tooltip) {
    tooltipProps = {
      'data-tip': variant.tooltip,
      // 'data-for': 'dynamic-logomark',
    };
  }

  return (
    <>
      <variant.Logomark {...tooltipProps} {...props} />
      <ReactTooltip id="dynamic-logomark" />
    </>
  );
};

export const DynamicLogotype = (props: Partial<DynamicLogoProps>) => {
  const variant = React.useMemo(() => getRelevantVariant(props.currentDate), [
    props.currentDate,
  ]);

  if (!variant) {
    return <Logotype {...props} />;
  }

  let tooltipProps = {};
  if (variant.tooltip) {
    tooltipProps = {
      'data-tip': variant.tooltip,
      // 'data-for': 'dynamic-logomark',
    };
  }

  return (
    <>
      <variant.Logotype {...tooltipProps} {...props} />
      <ReactTooltip id="dynamic-logomark" />
    </>
  );
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
  name: string;
  activeIf: (currentDate?: Date) => boolean;
  sharedProps?: Partial<DynamicLogoProps>;
  flagStripes?: string[];
  tooltip?: string;
  Logomark: React.FunctionComponent<any>;
  Logotype: React.FunctionComponent<any>;
};

export const Trans: Variant = {
  // March 31, Nov 13-20+1
  name: 'Trans Pride',
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Mar-31'), new Date('2021-Apr-1'), currentDate) ||
    matchDay(new Date('2021-Nov-13'), new Date('2021-Nov-22'), currentDate),
  sharedProps: {
    circleFill: '#F7A8B8',
    circleOuterFill: palette.taupe200,
    typeFill: palette.grey500,
    stripes: ['#55CDFC', '#F7A8B8', palette.grey600, '#F7A8B8', '#55CDFC'],
  },
  tooltip: 'Roleypoly says trans rights!',
  Logomark: (props: DynamicLogoProps) => (
    <LogomarkFlag {...props} {...Trans.sharedProps} />
  ),
  Logotype: (props: DynamicLogoProps) => (
    <LogotypeFlag {...props} {...Trans.sharedProps} />
  ),
};

export const Bi: Variant = {
  // Sept 16-23
  name: 'Bi Week',
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Sep-16'), new Date('2021-Sep-24'), currentDate),
  sharedProps: {
    circleFill: '#D60270',
    circleOuterFill: palette.taupe200,
    typeFill: '#9B4F96',
    stripes: ['#0038A8', '#0038A8', '#9B4F96', '#D60270', '#D60270'],
  },
  tooltip: 'Being bi is a lot like a riding a bicycle since they can go both ways.',
  Logomark: (props: DynamicLogoProps) => <LogomarkFlag {...props} {...Bi.sharedProps} />,
  Logotype: (props: DynamicLogoProps) => <LogotypeFlag {...props} {...Bi.sharedProps} />,
};

export const Lesbian: Variant = {
  // Apr 26
  name: 'Lesbian Pride',
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Apr-25'), new Date('2021-Apt-27'), currentDate),
  sharedProps: {
    circleFill: '#D362A4',
    circleOuterFill: palette.taupe200,
    typeFill: '#FF9A56',
    stripes: ['#D52D00', '#FF9A56', palette.grey600, '#D362A4', '#A30262'],
  },
  tooltip: "I'm a lesbiab... lesbiam... Less Bien... Girls.",
  Logomark: (props: DynamicLogoProps) => (
    <LogomarkFlag {...props} {...Lesbian.sharedProps} />
  ),
  Logotype: (props: DynamicLogoProps) => (
    <LogotypeFlag {...props} {...Lesbian.sharedProps} />
  ),
};

export const Ace: Variant = {
  // Oct 24-30
  name: 'Ace Week',
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Oct-24'), new Date('2021-Oct-31'), currentDate),
  sharedProps: {
    circleFill: '#333',
    circleOuterFill: palette.taupe200,
    typeFill: '#CCC',
    stripes: ['#84067C', palette.grey600, '#CCCCCC', palette.grey100],
  },
  tooltip: "Sexualn't",
  Logomark: (props: DynamicLogoProps) => <LogomarkFlag {...props} {...Ace.sharedProps} />,
  Logotype: (props: DynamicLogoProps) => <LogotypeFlag {...props} {...Ace.sharedProps} />,
};

export const Birthday: Variant = {
  // Jan 15
  name: "Roleypoly's Birthday",
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Jan-15'), new Date('2021-Jan-16'), currentDate),
  sharedProps: {
    circleFill: 'none',
    circleOuterFill: palette.taupe300,
    typeFill: palette.taupe500,
  },
  tooltip: '🎉 HAPPY BIRTHDAY ROLEYPOLY 🎉',
  Logomark: (props: DynamicLogoProps) => (
    <svg
      style={props.style}
      className={props.className}
      width={props.width}
      height={props.height}
      data-for={props['data-for']}
      data-tip={props['data-tip']}
      viewBox="30 10 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M104.737 85.406V86H94.243L75.73 60.953H66.226V86H57.118V21.848H78.007C83.023 21.848 87.247 22.64 90.679 24.224C94.177 25.808 96.784 28.019 98.5 30.857C100.282 33.695 101.173 36.995 101.173 40.757C101.173 43.793 100.579 46.598 99.391 49.172C98.269 51.746 96.553 53.99 94.243 55.904C91.933 57.752 89.062 59.105 85.63 59.963L104.737 85.406ZM66.226 53.429H76.621C81.571 53.429 85.3 52.373 87.808 50.261C90.382 48.083 91.669 45.047 91.669 41.153C91.669 37.391 90.481 34.52 88.105 32.54C85.795 30.56 82.363 29.57 77.809 29.57H66.226V53.429Z"
          fill={props.typeFill || Birthday.sharedProps?.typeFill}
        />

        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="45"
          y="25"
          width="142"
          height="142"
        >
          <path
            d="M115.711 25L186.421 95.7107L115.711 166.421L45 95.7107L115.711 25Z"
            fill={props.circleOuterFill || Birthday.sharedProps?.circleOuterFill}
          />
        </mask>
        <g mask="url(#mask0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M79.9998 102C103.196 102 122 83.196 122 60C122 36.804 103.196 18 79.9998 18C56.8039 18 37.9998 36.804 37.9998 60C37.9998 83.196 56.8039 102 79.9998 102ZM79.9998 110C107.614 110 130 87.6142 130 60C130 32.3858 107.614 10 79.9998 10C52.3856 10 29.9998 32.3858 29.9998 60C29.9998 87.6142 52.3856 110 79.9998 110Z"
            fill={props.circleOuterFill || Birthday.sharedProps?.circleOuterFill}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="130" height="110" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  Logotype: (props: DynamicLogoProps) => (
    <div style={{ display: 'inline-block', maxWidth: props.width }}>
      <SparkleOverlay strokeColor={palette.discord400}>
        <Logotype {...props} {...Birthday.sharedProps} />
      </SparkleOverlay>
    </div>
  ),
};

export const DevilsLettuce: Variant = {
  name: 'Meme #1',
  // Apr 20
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Apr-20'), new Date('2021-Apr-21'), currentDate),
  sharedProps: {
    circleFill: palette.green400,
    circleOuterFill: palette.green200,
    typeFill: palette.green400,
  },
  tooltip: 'Legalize it.',
  Logomark: (props: DynamicLogoProps) => (
    <Logomark {...props} {...DevilsLettuce.sharedProps} />
  ),
  Logotype: (props: DynamicLogoProps) => (
    <Logotype {...props} {...DevilsLettuce.sharedProps} />
  ),
};

export const BicycleDay: Variant = {
  name: 'Meme #2',
  // Apr 19
  // TODO: hexagon is bestagon
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Apr-19'), new Date('2021-Apr-20'), currentDate),
  sharedProps: {
    circleFill: palette.gold400,
    circleOuterFill: palette.taupe200,
    typeFill: palette.discord400,
    stripes: Object.values(palette),
  },
  tooltip: 'It increases brain complexity.',
  Logomark: (props: DynamicLogoProps) => (
    <LogomarkFlag {...props} {...BicycleDay.sharedProps} />
  ),
  Logotype: (props: DynamicLogoProps) => (
    <LogotypeFlag {...props} {...BicycleDay.sharedProps} />
  ),
};

export const Christmas: Variant = {
  name: 'Christmas!',
  // Dec 20-27
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Dec-20'), new Date('2021-Dec-28'), currentDate),
  sharedProps: {
    circleFill: palette.green200,
    circleOuterFill: palette.red200,
    typeFill: palette.green400,
    stripes: [
      palette.grey600,
      palette.red400,
      palette.grey600,
      palette.green400,
      palette.grey600,
      palette.red400,
      palette.grey600,
      palette.green400,
      palette.grey600,
      palette.red400,
      palette.grey600,
    ],
  },
  tooltip: 'Have yourself a merry little Christmas~',
  Logomark: (props: DynamicLogoProps) => (
    <SparkleOverlay strokeColor={'white'}>
      <LogomarkFlag {...props} {...Christmas.sharedProps} />
    </SparkleOverlay>
  ),
  Logotype: (props: DynamicLogoProps) => (
    <SparkleOverlay strokeColor={'white'}>
      <LogotypeFlag {...props} {...Christmas.sharedProps} />
    </SparkleOverlay>
  ),
};

export const NewYear: Variant = {
  name: "New Year's Day",
  // Dec 30 - Jan 2
  // TODO: sparkle
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Dec-30'), new Date('2021-Jan-3'), currentDate),
  sharedProps: {
    circleFill: '#222',
    circleOuterFill: palette.red400,
    typeFill: '#aaa',
  },
  tooltip: 'Fuck 2020. 🎆🎇🎆🎇',
  Logomark: (props: DynamicLogoProps) => <Logomark {...props} {...NewYear.sharedProps} />,
  Logotype: (props: DynamicLogoProps) => (
    <div style={{ display: 'inline-block', maxWidth: props.width }}>
      <SparkleOverlay>
        <Logotype {...props} {...NewYear.sharedProps} />
      </SparkleOverlay>
    </div>
  ),
};

export const LunarNewYear: Variant = {
  name: 'Lunar New Year',
  // Feb 12, 2021
  // Feb 1, 2022
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Feb-10'), new Date('2021-Feb-13'), currentDate, true) ||
    matchDay(new Date('2022-Jan-30'), new Date('2022-Feb-3'), currentDate, true),
  sharedProps: {
    circleFill: palette.red200,
    circleOuterFill: palette.gold400,
    typeFill: palette.taupe300,
  },
  tooltip: '恭喜发财! 🎊🎆🎇',
  Logomark: (props: DynamicLogoProps) => (
    <Logomark {...props} {...LunarNewYear.sharedProps} />
  ),
  Logotype: (props: DynamicLogoProps) => (
    <div style={{ display: 'inline-block', maxWidth: props.width }}>
      <SparkleOverlay>
        <Logotype {...props} {...LunarNewYear.sharedProps} />
      </SparkleOverlay>
    </div>
  ),
};

export const Pride: Variant = {
  name: 'LGBTQPOC Pride Month',
  // June
  activeIf: (currentDate?: Date) =>
    matchDay(new Date('2021-Jun-1'), new Date('2021-Jul-1'), currentDate),
  sharedProps: {
    circleOuterFill: palette.taupe200,
    typeFill: palette.grey500,
    stripes: [
      '#593BB5',
      '#26B186',
      '#FFC468',
      '#F97C21',
      '#F62C8B',
      '#8B5950',
      '#2D3234',
    ],
  },
  tooltip: 'LOVE WINS. 💖🌈🌟',
  Logomark: (props: DynamicLogoProps) => (
    <LogomarkFlag {...props} {...Pride.sharedProps} />
  ),
  Logotype: (props: DynamicLogoProps) => (
    <LogotypeFlag {...props} {...Pride.sharedProps} />
  ),
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
