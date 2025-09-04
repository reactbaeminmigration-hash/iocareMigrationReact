export type MenuKey = 'home' | 'experience' | 'setting' | 'extend' | 'notice';

export interface GnbMenuListProps {
    onClickNavigateMenu: (key: MenuKey) => void;
};