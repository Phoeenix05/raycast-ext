import { Icon, MenuBarExtra, open } from '@raycast/api';
import { getFavicon } from '@raycast/utils';
import { useEffect, useState } from 'react';

type Bookmark = { name: string; url: string };
type useStateTypes = { unseen: Bookmark[]; seen: Bookmark[]; isLoading: boolean };

const bookmarkState = {
    unseen: [{ name: 'Raycast Teams', url: 'https://raycast.com/teams' }],
    seen: [
        { name: 'Raycast Store', url: 'https://raycast.com/store' },
        { name: 'Twitter', url: 'https://twitter.com' },
    ],
    isLoading: false,
};

const useBookmarks = () => {
    const [state, setState] = useState<useStateTypes>({
        unseen: [],
        seen: [],
        isLoading: true,
    });
    useEffect(() => {
        (async () => {
            setState(bookmarkState);
        })();
    }, []);
    return state;
};

export default function Command() {
    const { unseen: unseenBookmarks, seen: seenBookmarks, isLoading } = useBookmarks();

    return (
        <MenuBarExtra icon={Icon.AppWindow} isLoading={isLoading}>
            <MenuBarExtra.Item title="New" />
            {unseenBookmarks.map((bookmark) => (
                <MenuBarExtra.Item
                    key={bookmark.url}
                    icon={getFavicon(bookmark.url)}
                    title={bookmark.name}
                    onAction={() => open(bookmark.url)}
                />
            ))}
            <MenuBarExtra.Separator />
            <MenuBarExtra.Item title="Seen" />
            {seenBookmarks.map((bookmark) => (
                <MenuBarExtra.Item
                    key={bookmark.url}
                    icon={getFavicon(bookmark.url)}
                    title={bookmark.name}
                    onAction={() => open(bookmark.url)}
                />
            ))}
        </MenuBarExtra>
    );
}
