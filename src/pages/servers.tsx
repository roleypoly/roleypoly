import { AppShell } from 'roleypoly/design-system/organisms/app-shell';
import { useAppShellProps } from 'roleypoly/providers/appShellData';

export default () => {
    const { appShellProps } = useAppShellProps();
    return (
        <AppShell {...appShellProps}>
            <div></div>
        </AppShell>
    );
};
