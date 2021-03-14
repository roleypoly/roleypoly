import * as React from 'react';

type RecentGuildsT = {
    recentGuilds: string[];
    pushRecentGuild: (id: string) => void;
};

export const RecentGuilds = React.createContext<RecentGuildsT>({
    recentGuilds: [],
    pushRecentGuild: () => {},
});

export const useRecentGuilds = () => React.useContext(RecentGuilds);

const saveState = (state: string[]) => {
    localStorage.setItem('rp_recent_guilds', JSON.stringify(state));
};

const pullState = (): string[] => {
    const rawState = localStorage.getItem('rp_recent_guilds');
    if (!rawState) {
        return [];
    }

    try {
        return JSON.parse(rawState);
    } catch (e) {
        console.warn('RecentGuilds failed to re-hydrate saved state', e);
        return [];
    }
};

export const RecentGuildsProvider = (props: { children: React.ReactNode }) => {
    const [recentGuilds, setRecentGuilds] = React.useState<string[]>(pullState());

    const recentGuildsData: RecentGuildsT = {
        recentGuilds,
        pushRecentGuild: (id: string) => {
            const nextState = [
                id,
                ...recentGuilds.slice(0, 19).filter((guild) => guild !== id),
            ];

            if (recentGuilds[0] !== id) {
                setRecentGuilds(nextState);
            }
        },
    };

    React.useEffect(() => {
        saveState(recentGuilds);
    }, [recentGuilds]);

    return (
        <RecentGuilds.Provider value={recentGuildsData}>
            {props.children}
        </RecentGuilds.Provider>
    );
};
