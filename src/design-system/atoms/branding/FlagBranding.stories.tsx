import { LogoFlagProps, LogomarkFlag, LogotypeFlag } from './FlagBranding';

export default {
    title: 'Atoms/Branding/Flags',
    component: LogomarkFlag,
    args: {
        stripes: ['#F9238B', '#FB7B04', '#FFCA66', '#00B289', '#5A38B5', '#B413F5'],
        height: 50,
    },
};

export const logomarkFlag = (args: LogoFlagProps) => <LogomarkFlag {...args} />;
export const logotypeFlag = (args: LogoFlagProps) => <LogotypeFlag {...args} />;
